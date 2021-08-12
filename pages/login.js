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
    <div className="min-h-screen">
      <Head>
        <title>Masuk Gan!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <form
          className="p-8 bg-white rounded flex justify-center items-center flex-col shadow-md"
          onSubmit={onSubmit}
        >
          {error && (
            <div className="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300">
              {error}
            </div>
          )}
          <div className="">
            <input
              name="email"
              placeholder="Email"
              value={email}
              type="email"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mb-3 p-3 appearance-none rounded relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              className="mb-3 p-3 appearance-none rounded relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            ></input>
          </div>
          <button className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
