import React, { useContext, useState } from "react";
import {Button} from 'react-bootstrap';
import { GeneralContext } from "../Context";
import { validate } from 'bitcoin-address-validation';
import { useNavigate } from "react-router-dom";



const SearchPage = () => {
    const [searchInput, setSearchInput] = useState('')
    const {
        getWalletAddressInfo,
        getTransactionInfo
    } = useContext(GeneralContext)
    const navigate = useNavigate()

    const handleAddressGeneration =(e) =>{
        e.preventDefault()
        if (searchInput !== ''){
            if (validate(searchInput)){
                getWalletAddressInfo(searchInput)
            }else{
                getTransactionInfo(searchInput)
                navigate('/transaction')
            }
        }
    }
  return (
    <>
    <div className="row">
    <div className="col-md-8">
    <div className="input-group mb-3">
        <input type="text" onChange={(e) => setSearchInput(e.target.value)} className="form-control form-control-lg" placeholder="Search transactionHash/wallet address "/>
        <button type="submit" onClick={(e) => handleAddressGeneration(e)} className="input-group-text btn-success"><i className="bi bi-search me-2"></i> Search</button>
    </div>
    </div>
    
    </div>
   
   
    </>
  );
};

export default SearchPage;