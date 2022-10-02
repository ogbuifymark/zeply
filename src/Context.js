import React, { createContext, useState } from "react";
import {
    getwalletAddressInfoApi
    ,getTransactionInfoApi,
    getBlockInfoApi
} from "./api/Reads";
import { 
} from "./api/Writes";

export const GeneralContext = createContext();
export const GeneralProvider = ({ children }) => {
  const [wallet, setWallet] = useState();
  const [addressInfo, setAddressInfo] = useState();
  const [transactionInfo, setTransactionInfo] = useState();
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState([]);
 

 

  //  Wallet address info
  const getWalletAddressInfo = async (param) => {
    let response = await getwalletAddressInfoApi(param);
    setAddressInfo(response);
    console.log(response.txs)
    setTransactions(response.txs)
  };

   //  transaction info
   const getTransactionInfo = async (param) => {
    let response = await getTransactionInfoApi(param);
    setTransactionInfo(response);
  };

   //  transaction info
   const getBlocksInfo = async (param) => {
    let response = await getBlockInfoApi(param);
    console.log(response)
    setBlocks(response);
  };


  return (
    <GeneralContext.Provider
      value={{
        getWalletAddressInfo,
        addressInfo, setAddressInfo,
        transactionInfo, setTransactionInfo,
        getTransactionInfo,
        transactions,setTransactions,
        getBlocksInfo,
        blocks, setBlocks,
        wallet
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;
