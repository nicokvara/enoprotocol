import React from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
  SystemProgram
} from "@solana/web3.js";

async function Pay(receiver, amount) {
  try {
    // Connect to Solana
    const network = "https://api.mainnet-beta.solana.com/";
    const connection = new Connection(network);

    // A new transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: window.solana.publicKey,
        toPubkey: receiver,
        lamports: amount
      })
    );
    // Fee Payer
    transaction.feePayer = window.solana.publicKey;

    // Blockhash
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    console.assert(transaction.recentBlockhash.length > 0, "Transaction failure: could not gather blockhash for transaction")
    
    
    

    // Signature
    try {
      const signedTransaction = await window.solana.signTransaction(transaction);
    } catch (error) {
      console.assert("Transaction failure: transaction could not be signed")
    }
    try {
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
    } catch (error) {
      console.assert("Transaction failure: transaction could not be confirmed");
    }
  } catch (error) {
    console.log(error);
    if (error) {
      return false;
    } else {
      return true;
    }
  }
}

export default Pay;
