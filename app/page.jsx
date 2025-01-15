"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <>
      <h1>welcome back</h1>
      <Link href="/auth/signin">login</Link>
    </>
  );
};

export default page;
