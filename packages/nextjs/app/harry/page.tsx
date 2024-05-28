"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../public/iconoshit.png";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth";
import { IntegerInput } from "~~/components/scaffold-eth";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Harry: NextPage = () => {
  const account = useAccount();
  const [amountToMint, setAmountToMint] = useState<string | bigint>("");
  const [address, setAddress] = useState("");

  const { data: tokenBalance } = useScaffoldReadContract({
    contractName: "HarryToken",
    functionName: "balanceOf",
    args: [account?.address ?? ""],
  });
  const { writeContractAsync: mintTokens } = useScaffoldWriteContract("HarryToken");

  const handleMint = async () => {
    try {
      await mintTokens({
        functionName: "mint",
        args: [address, BigInt(amountToMint)],
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start mt-8 p-10">
        <div className="card w-[36rem] bg-base-100 shadow-xl">
          <div className="py-6 px-8 flex flex-col gap-4">
            <div className="w-full flex justify-center items-center gap-3">
              <h2 className="card-title">Buy HRY</h2>
              <div className="w-12 h-10">
                <Image alt="SE2 logo" src={logo} />
              </div>
            </div>
            <p className="p-0 m-0">Current Quantity</p>
            <InputBase
              disabled
              name="actualAmount"
              placeholder="Actual Amount"
              value={formatEther(tokenBalance || BigInt(0))}
              onChange={e => e}
            />
            <p className="p-0 m-0">Quantity to Purchase</p>
            <IntegerInput
              value={amountToMint}
              onChange={updatedAmount => {
                setAmountToMint(updatedAmount);
              }}
              placeholder="value (wei)"
            />
            <p className="p-0 m-0">To</p>
            <AddressInput onChange={setAddress} value={address} placeholder="Input your address" />
            <div className="card-actions justify-end" onClick={() => handleMint()}>
              <button className="btn btn-primary w-full">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Harry;
