import Head from "next/head";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import { firestore, postToJSON } from "../firebase/config";
import PostFeed from "../components/PostFeed";

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
  const [posts] = useState(props.posts);

  return (
    <div className="">
      <Head>
        <title>Sebuah Monolog</title>
        <description>seni berbicara dengan diri sendiri.</description>
        <link rel="icon" href="/favicon.ico" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 flex-col justify-between mx-auto">
                <PostFeed posts={posts} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="footer bg-white relative pt-1">
        <div class="container mx-auto px-6">
          <div class="mt-4 border-t-2 border-gray-300 flex flex-col items-center">
            <div class="sm:w-2/3 text-center py-6">
              <p class="text-sm text-blue-700 font-bold mb-2">
                <a href="https://twitter.com/falasyam">Fala Syam</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
