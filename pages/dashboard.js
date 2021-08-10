import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../firebase/AuthUserProvider";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { firestore, fromMillis, postToJSON } from "../firebase/config";
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

export default function LoggedIn(props) {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  const [posts] = useState(props.posts);

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/login");
  }, [authUser, loading]);

  return (
    <div className="">
      <Head>
        <title>Dashboard Gan!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className=" bg-gray-100">
        <nav className="flex items-center justify-between p-6 h-20 bg-white shadow-sm">
          <div className="py-5 px-3 rounded-full bg-gradient-to-r from-indigo-700 to-blue-500 text-sm text-white font-semibold shadow-lg hover:cursor-pointer hover:shadow-lg">
            LOGO
          </div>
          <ul>
            <li className="space-x-5 text-xl">
              <Link href="/dashboard">
                <a className="hidden sm:inline-block text-gray-700 hover:text-indigo-700">
                  Home
                </a>
              </Link>
              <Link href="/nulis">
                <a className="hidden sm:inline-block text-gray-700 hover:text-indigo-700">
                  Nulis
                </a>
              </Link>
              <a
                href={signOut}
                className="hidden sm:inline-block text-gray-700 hover:text-indigo-700"
              >
                Keluar
              </a>
            </li>
            <div className="sm:hidden space-y-1 hover:cursor-pointer">
              <span className="w-10 h-1 bg-gray-600 rounded-full block"></span>
              <span className="w-10 h-1 bg-gray-600 rounded-full block"></span>
              <span className="w-10 h-1 bg-gray-600 rounded-full block"></span>
            </div>
          </ul>
        </nav>
      </header>
      <main className="relative">
        <div className="container p-10 items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 flex-col justify-between mx-auto">
            <PostFeed posts={posts} />
          </div>
        </div>
      </main>
    </div>
  );
}
