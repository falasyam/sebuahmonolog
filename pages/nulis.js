import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../firebase/AuthUserProvider";
import Head from "next/head";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { Firebase, firestore, serverTimestamp, auth } from "../firebase/config";

const Nulis = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  const [isi, setIsi] = useState("");
  const isValid = isi.length > 3;

  const slug = encodeURI(isi);

  const createPost = async (e) => {
    e.preventDefault();
    const ref = firestore.collection("posts").doc(slug);

    const data = {
      slug,
      isi,
      published: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await ref.set(data);

    alert("Sukses Gan");

    // Imprerative navigation after doc is set
    router.push(`/nulis`);
  };

  // Listen for changes on loading and authUser, redirect if needed
  //useEffect(() => {
  //  if (!loading && !authUser) router.push("/login");
  //}, [authUser, loading]);

  return (
    <div>
      <Head>
        <title>Dashboard Gan!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header class=" bg-gray-100">
        <nav class="flex items-center justify-between p-6 h-20 bg-white shadow-sm">
          <div class="py-5 px-3 rounded-full bg-gradient-to-r from-indigo-700 to-blue-500 text-sm text-white font-semibold shadow-lg hover:cursor-pointer hover:shadow-lg">
            LOGO
          </div>
          <ul>
            <li class="space-x-5 text-xl">
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
            <div class="sm:hidden space-y-1 hover:cursor-pointer">
              <span class="w-10 h-1 bg-gray-600 rounded-full block"></span>
              <span class="w-10 h-1 bg-gray-600 rounded-full block"></span>
              <span class="w-10 h-1 bg-gray-600 rounded-full block"></span>
            </div>
          </ul>
        </nav>
      </header>
      <div className="w-full flex justify-center bg-gray-200 h-screen items-center">
        <div className="rounded-xl bg-white w-full md:w-2/3 lg:w-1/3">
          <form className="mt-8 space-y-6" onSubmit={createPost}>
            <div class="">
              <div class="">
                <div class="flex p-4">
                  <div>
                    <img
                      class="rounded-full w-14"
                      src="https://pbs.twimg.com/profile_images/1367267802940375042/H4JDd6aC_400x400.jpg"
                    />
                  </div>

                  <div class="ml-3 flex flex-col w-full">
                    <textarea
                      placeholder="What's happening?"
                      onChange={(event) => setIsi(event.target.value)}
                      class="w-full text-xl resize-none outline-none h-32"
                    ></textarea>
                  </div>
                </div>

                <div class="flex items-center text-blue-400 justify-center py-6 px-4 border-t">
                  <div>
                    <button
                      disabled={!isValid}
                      class="inline px-4 py-3 rounded-full font-bold text-white bg-blue-400 hover:bg-blue-600 cursor-pointer"
                    >
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Nulis;
