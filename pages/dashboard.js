import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../firebase/AuthUserProvider";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import Link from "next/link";

const LoggedIn = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

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
      <header class="min-h-screen bg-gray-100">
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8"></div>
      </div>
    </div>
  );
};

export default LoggedIn;
