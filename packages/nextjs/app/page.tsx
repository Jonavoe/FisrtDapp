"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../public/iconoshit.png";
import { motion } from "framer-motion";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <motion.div
          initial={{ y: -30, scale: 0, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 2 }}
        >
          <Image src={logo} alt="Logo" />
        </motion.div>
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 2 }}
        >
          <h1 className="text-5xl">Welcome to the New Era of Harry Coin</h1>
        </motion.div>
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 2 }}
        >
          <p className="text-xl">On the next page, you can purchase HRY tokens to explore our innovative features.</p>
        </motion.div>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 2 }}
        >
          <Link href={"/harry"} passHref>
            <button className="btn btn-outline w-36 text-xl">Buy HRY</button>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
