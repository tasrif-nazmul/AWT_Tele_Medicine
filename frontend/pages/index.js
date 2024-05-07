import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hello I am Nazmul Hasan</h1>
      <Image src="/NH.png" alt="Picture of the author" width={180} height={200}/>
      <Link href="login">Login</Link>
    </>
  );
}
