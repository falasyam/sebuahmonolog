import Head from "next/head";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import { firestore, postToJSON, fromMillis } from "../firebase/config";
import PostFeed from "../components/PostFeed";
import Loader from "../components/Loader";

const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);

  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));

    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <div className="">
      <Head>
        <title>Sebuah Monolog</title>
        <meta
          name="description"
          content="Seni berbicara dengan diri sendiri."
        />
        <meta name="theme-color" content="#84CC16" />

        <meta name="msapplication-navbutton-color" content="#84CC16" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#84CC16" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
        />
      </Head>

      <main>
        <section className="flex justify-center items-center">
          <h1 className="text-center items-center text-3xl md:text-4xl justify-items-center font-bold pt-10">
            <span className="text-green-550">Sebuah </span>
            Monolog
          </h1>
        </section>
        <section>
          <div className="relative items-center justify-center justify-items-center">
            <div className="container p-10 items-center justify-center justify-items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 flex-col justify-between mx-auto">
                <PostFeed posts={posts} />
              </div>
              <div className="flex items-center justify-center justify-items-center pt-8">
                {!loading && !postsEnd && (
                  <button
                    className="bg-green-550 rounded-full px-3 py-1 text-white"
                    onClick={getMorePosts}
                  >
                    Lainnya
                  </button>
                )}
                <Loader show={loading} />

                <div className="">
                  <div className="font-bold text-center">
                    {postsEnd && "Tidak ada yang lain."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer bg-white relative pt-1">
        <div className="container mx-auto px-6">
          <div className="mt-4 border-t-2 border-gray-300 flex flex-col items-center">
            <div className="text-center pt-6 text-sm">
              <span className="">All Right Reserved.</span>
            </div>
            <div className="sm:w-2/3 text-center pb-6">
              <p className="text-lg text-green-550 font-bold mb-2">
                <a href="https://falasyam.my.id">Fala Syam</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
