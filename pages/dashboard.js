import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../firebase/AuthUserProvider";
import Head from "next/head";
import "tailwindcss/tailwind.css";

const LoggedIn = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/login");
  }, [authUser, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Head>
        <title>Dashboard Gan!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-md w-full space-y-8">
        <button
          onClick={signOut}
          className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default LoggedIn;
