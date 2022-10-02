import { Button, Card,Table } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import {WordEllipse} from '../utils/helper'
import { GeneralContext } from '../Context';
import { Link, useNavigate } from 'react-router-dom';

const Transactions = () => {
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [pageData, setpageData] = useState([])
    const {
        transactions,
        getTransactionInfo
    } = useContext(GeneralContext)

    const navigate = useNavigate()

    useEffect(() =>{
        console.log(transactions)
        if (transactions.length > 0){
            setPaginatedData()
        }
    },[offset,transactions])

    const handleRowSelection =(hash )=> {
        getTransactionInfo(hash)
        navigate('/transaction')
    }

    const setPaginatedData =() =>{
        const slice = transactions.slice(offset, offset + perPage)
        const postData = slice.map((trans, index) => 
           
        <tr key={index} onClick={() => handleRowSelection(trans.hash)}>
        <td>{WordEllipse(trans.hash, 15, 0)}</td>
        <td>{new Date(trans.time).toDateString()}</td>
        <td>{trans.size}</td>
        <td>{trans.block_index}</td>
        <td>{trans.inputs[0].prev_out.value}</td>
      </tr>)
                                
       
                                setpageData(postData)
        setPageCount(Math.ceil(transactions.length / perPage))

    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };
    return(
<Card style={{ width: '100%', aLignItem: 'flex-start' }}>
              <Card.Header style={{ color: 'black' }}>Transactions</Card.Header>
              <Card.Body >
                <Table striped="columns" bordered hover size="sm">
                    <thead>
        <tr>
          <th>Transaction Hash</th>
          <th>Received Time</th>
          <th>Size</th>
          <th>block</th>
          <th>Total input</th>
        </tr>
      </thead>
                    <tbody >
                        {pageData}
                    
                  </tbody>
    </Table>
    <ReactPaginate
                    style={{color: 'black'}}
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    
              </Card.Body>

            </Card>
    )

}

export default Transactions