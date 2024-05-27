"use client";

import { useState } from "react";
import { NextPage } from "next";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const [address, setAddress] = useState("");
  const { data: actualOwner } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "owner",
  });

  const { writeContractAsync: setNewOwner } = useScaffoldWriteContract("YourContract");

  const setNewOwnerHandler = async () => {
    await setNewOwner({
      functionName: "setNewOwner",
      args: [address],
    });
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="card w-[30rem] bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Set New Owner</h2>
            <label htmlFor="">Actual Owner</label>
            <AddressInput
              value={actualOwner || ""}
              disabled={true}
              placeholder="Current Owner"
              onChange={e => {
                console.log("Disabled input changed:", e);
              }}
            />
            <label htmlFor="">New Owner</label>
            <AddressInput onChange={setAddress} value={address} placeholder="Input your address" />
            <div className="card-actions justify-end mt-2">
              <button className="btn btn-primary w-full" onClick={() => setNewOwnerHandler()}>
                Set New Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
