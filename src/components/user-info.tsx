import { useStore } from "@/store/UserDetailsStore";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC } from "react";

const UserInfo: FC = () => {
  const userInfo = useStore((state) => state);
  return (
    <>
      <div >
        <p >
          {userInfo.publicKey
            ? `Balance: ${userInfo.lamports / LAMPORTS_PER_SOL} SOL`
            : ""}
        </p>
      </div>
    </>
  );
};

export default UserInfo;
