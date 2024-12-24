"use client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NotAdmin() {
  return (
    <div className="flex flex-col gap-3">
      <p>You Are Not An Admin, Sign In With An Admin ID To Add Products ...</p>
      <Link href="/" className="btn btn-primary normal-case">
        Click Here To Head Back Home
      </Link>
    </div>
  );
}
