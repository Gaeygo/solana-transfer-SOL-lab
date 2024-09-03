import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWallet } from "@solana/wallet-adapter-react";

export const CustomAvatar: FC = () => {
  const { publicKey } = useWallet();
  return (
    <div>
      {publicKey ? (
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>SOL</AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  );
};
