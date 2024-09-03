import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "@/store/UserDetailsStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ErrorMessage } from "@hookform/error-message";
import { CustomHover } from "./custom-hover-card";

const formSchema = z.object({
  publicKey: z.string(),
  amount: z.number().min(0.001),
});

export const BalanceDisplay: FC = () => {
  const [error, setError] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction, disconnecting, disconnect, } = useWallet();

  const userInfo = useStore((state) => state);

  const setInfo = useStore((state) => state.setData);
  const onDisconnect = useStore((state) => state.onDisconnect);

  //add loaders and get when transaction becomes success

  useEffect(() => {
    if (!connection || !publicKey) {
      onDisconnect();
      return;
    }

    console.log(connection)
    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        // setBalance(updatedAccountInfo.lamports / web3.LAMPORTS_PER_SOL);
        setInfo(publicKey.toString(), updatedAccountInfo.lamports);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (!info) return;
      // setBalance(info?.lamports / web3.LAMPORTS_PER_SOL);
      setInfo(publicKey.toString(), info.lamports);
    });
  }, [connection, publicKey, setInfo, onDisconnect]);

  //retype event
  const sendSol = async (info: z.infer<typeof formSchema>) => {
    //if error return
    // alert("error");
    // if (form.formState.errors) return;

    //event: SyntheticEvent
    // event.preventDefault();
    // const target = event.target as HTMLInputElement;

    const isValidKey = isValidSolanaAddress(info.publicKey);

    if (!isValidKey) {
      setError("Invalid Recipient wallet address");
      return;
      // alert("invalid key");
    }

    const transaction = new web3.Transaction();
    const recipientPubKey = new web3.PublicKey(info.publicKey);

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey!,
      toPubkey: recipientPubKey,
      lamports: info.amount * web3.LAMPORTS_PER_SOL,
    });

    transaction.add(sendSolInstruction);
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.feePayer = publicKey!;
    transaction.recentBlockhash = latestBlockhash.blockhash;

    const signature = sendTransaction(transaction, connection);
    console.log(signature);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      publicKey: "",
      amount: 0.001,
    },
  });

  //check if publickey or no interactivity
  //
  return (
    <>
      <div className="w-full ">
        {publicKey ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(sendSol)} className="space-y-4">
              <FormField
                control={form.control}
                name="publicKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <Input placeholder="Wallet Address" {...field} />
                    </FormControl>

                    <FormDescription>
                      The Wallet address of recipient.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Amount of SOL" {...field} />
                    </FormControl>
                    <FormDescription>
                      The amount of SOL to be transferred.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-red-600">{error}</p>

              <Button type="submit">Transfer</Button>
            </form>
          </Form>
        ) : (
          <div className="w-full flex justify-center">
            <CustomHover />
          </div>
        )}
      </div>
    </>
  );
};

const isValidSolanaAddress = (address: string): boolean => {
  try {
    new web3.PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};
