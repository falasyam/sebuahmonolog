import "tailwindcss/tailwind.css";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { firebaseAuth } from "firebase/firebase-auth";
import { useAuth } from "../firebase/AuthUserProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Head>
        <title>Masuk Gan!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {error && (
            <div className="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300">
              {error}
            </div>
          )}
          <div>
            <input
              name="email"
              placeholder="Email"
              value={email}
              type="email"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            ></input>
          </div>
          <div className="">
            <input
              name="password"
              placeholder="Password"
              value={password}
              type="password"
              autoComplete="password"
              onChange={(event) => setPassword(event.target.value)}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            ></input>
          </div>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
