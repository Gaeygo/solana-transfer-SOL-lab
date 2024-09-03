import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FC } from "react";
import { Button } from "./ui/button";

export const CustomHover: FC = () => {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>Perform Transactions</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          Connect your wallet to perform transactions.
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
