
import { Container, Card,Table, Col, Button } from 'react-bootstrap';
import React, { useContext, useState, useEffect,useCallback } from "react";
import ReactPaginate from 'react-paginate';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { GeneralContext } from '../../Context';
import {WordEllipse} from '../../utils/helper'
import { useNavigate } from 'react-router-dom';



function SubBlocks() {
    const [socketUrl, setSocketUrl] = useState('wss://ws.blockchain.info/inv');
    const [messageHistory, setMessageHistory] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [pageData, setpageData] = useState([])
    const {
        subBlocks, setSubBlocks
    } = useContext(GeneralContext)
  
    const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(socketUrl,{
        onOpen: (() => {
            subscribe()
        }),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
      });

    useEffect(() => {
        if (lastJsonMessage !== null) {
            let trans = subBlocks.filter(p=>p.hash == lastJsonMessage.x.hash)
            if (trans.length == 0){
                setSubBlocks([...subBlocks, lastJsonMessage.x])
            }
        }
        setPaginatedData()
       
        
      }, [lastJsonMessage]);

      const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    const setPaginatedData =() =>{
        const slice = subBlocks.slice(offset, offset + perPage)
        const postData = slice.map((block, index) => 
           
                                    <tr key={index}>
                                        <td >{WordEllipse(block.hash,20, 20)}</td>
                                        <td>{new Date(block.time).toDateString()}</td>
                                        <td>{block.block_index}</td>
                                        <td>{block.height}</td>
                                    </tr>)
                                
       
                                setpageData(postData)
        setPageCount(Math.ceil(subBlocks.length / perPage))

    }

    const subscribe =useCallback(() => sendJsonMessage({
        "op": "blocks_sub"
      }), []);

  
    return (
<Card style={{ width: '100%', aLignItem: 'flex-start' }}>
              <Card.Header style={{ color: 'black' }}>Transactions</Card.Header>
              <Card.Body >
              <Table striped="columns" bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Transaction Hash</th>
                            <th>Time</th>
                            <th>block index</th>
                            <th>Hieght</th>
                        </tr>
                    </thead>
                    {subBlocks.length > 0 ?
                        <tbody >
                            {pageData}


                        </tbody> : null}


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
    export default SubBlocks