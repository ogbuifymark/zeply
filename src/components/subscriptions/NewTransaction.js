
import { Container, Card,Table, Col, Button } from 'react-bootstrap';
import React, { useContext, useState, useEffect,useCallback } from "react";
import ReactPaginate from 'react-paginate';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { GeneralContext } from '../../Context';
import {WordEllipse} from '../../utils/helper'
import { useNavigate } from 'react-router-dom';



function SubTransactions() {
    const [socketUrl, setSocketUrl] = useState('wss://ws.blockchain.info/inv');
    const [messageHistory, setMessageHistory] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [pageData, setpageData] = useState([])
    const {
        subTransactions, setSubTransactions,getTransactionInfo
    } = useContext(GeneralContext)
    const navigate = useNavigate
  
    const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(socketUrl,{
        onOpen: (() => {
            subscribe()
        }),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
      });

    useEffect(() => {
        if (lastJsonMessage !== null) {
            let trans = subTransactions.filter(p=>p.hash == lastJsonMessage.x.hash)
            if (trans.length == 0){
                setSubTransactions([...subTransactions, lastJsonMessage.x])
            }
        }
        setPaginatedData()
       
        
      }, [lastJsonMessage]);

      const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

      const setPaginatedData =() =>{
        const slice = subTransactions.slice(offset, offset + perPage)
        const postData = slice.map((trans, index) => 
           
        <tr key={index} onClick={() => handleRowSelection(trans.hash)}>
        <td>{WordEllipse(trans.hash, 15, 0)}</td>
        <td>{new Date(trans.time).toDateString()}</td>
        <td>{trans.size}</td>
        <td>{trans.block_index}</td>
        <td>{trans.inputs[0].prev_out.value}</td>
      </tr>)
                                
       
                                setpageData(postData)
        setPageCount(Math.ceil(subTransactions.length / perPage))

    }

    const subscribe =useCallback(() => sendJsonMessage({
        "op": "unconfirmed_sub"
      }), []);

    const handleRowSelection =(hash )=> {
        getTransactionInfo(hash)
        navigate('/transaction')
    }


      const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

      
      

    return (
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
    )}
    export default SubTransactions