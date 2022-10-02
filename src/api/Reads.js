

import axiosInstance from "./request";

export const getwalletAddressInfoApi = async (param) => {
    const { data } = await axiosInstance.get(`/rawaddr/${param}`);
    return data;
  };

  export const getTransactionInfoApi = async (param) => {
    const { data } = await axiosInstance.get(`/rawtx/${param}`);
    return data;
  };
  export const getBlockInfoApi = async (param) => {
    const { data } = await axiosInstance.get(`/blocks/${param}?format=json`);
    return data;
  };