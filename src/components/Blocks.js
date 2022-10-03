import { Card, Table } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import {WordEllipse} from '../utils/helper'
import { GeneralContext } from '../Context';

const Blocks = () => {

    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [pageData, setpageData] = useState([])

    const {
        blocks,
        getBlocksInfo
    } = useContext(GeneralContext)

    useEffect(() => {
        const d = new Date();
        let time = d.getTime();
       
        if (blocks.length > 0){
            setPaginatedData()
        }
        else{
            getBlocksInfo(time)
        }
    }, [offset,blocks])

    const setPaginatedData =() =>{
        const slice = blocks.slice(offset, offset + perPage)
        const postData = slice.map((block, index) => 
           
                                    <tr key={index}>
                                        <td >{WordEllipse(block.hash,20, 20)}</td>
                                        <td>{new Date(block.time).toDateString()}</td>
                                        <td>{block.block_index}</td>
                                        <td>{block.height}</td>
                                    </tr>)
                                
       
                                setpageData(postData)
        setPageCount(Math.ceil(blocks.length / perPage))

    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    return (
        <Card style={{ width: '100%', aLignItem: 'flex-start' }}>
            <Card.Header data-testid="block-header" style={{ color: 'black' }}>Blocks</Card.Header>
            <Card.Body  style={{backgroundColor: 'gray'}}>
                <Table striped="columns" bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>Transaction Hash</th>
                            <th>Time</th>
                            <th>block index</th>
                            <th>Hieght</th>
                        </tr>
                    </thead>
                    {blocks.length > 0 ?
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
    )

}

export default Blocks