"use client";
import { NextPage } from "next";
import { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";

// wallet button ssr fix
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
import * as web3 from "@solana/web3.js";
import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import { BalanceDisplay } from "@/components/access-account-info";
import UserInfo from "@/components/user-info";
import { CustomAvatar } from "@/components/custom-avatar";
import { Navbar } from "@/components/navbar";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = (props) => {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(
    () => [
      new walletAdapterWallets.PhantomWalletAdapter({
        network: WalletAdapterNetwork.Devnet,
      }),
    ],
    []
  );

  //public key
  //receiver input
  //send sol

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div>
            {/* <div className="w-full flex justify-around ">
              <div className="my-auto flex ">
                <CustomAvatar />
                <div className="  my-auto ">
                  <UserInfo />
                </div>
              </div>

              
            </div> */}
            <Navbar />
            <div className="w-full py-8  m-auto flex justify-center">
              <WalletMultiButtonDynamic />
            </div>
            <div className=" mt-16 mx-auto w-[50%] max-w-[400px]  flex justify-center">
              <BalanceDisplay />
            </div>
          </div>

          {/* <p>Put the rest of your app here</p> */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Home;
