import { Card,Table,Container } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from "react";

import { GeneralContext } from '../Context';
import { Link } from 'react-router-dom';

const Transaction = () => {
    const [status, setStatus] = useState('')
    const {
        transactionInfo
    } = useContext(GeneralContext)

    useEffect(() =>{
        if (transactionInfo != null){
            let spent_input = transactionInfo.inputs.filter(p => p.prev_out.spent == false)
            let spent_output = transactionInfo.out.filter(p => p.spent == false)

            if (spent_input.some(p=>p === false) &&  spent_output.some(p=>p === false)){
                setStatus('Unconfirmed')
            }else{
                setStatus('Confirmed')
            }
        }
    }, [transactionInfo])
    return(
        <Container >
            <Link style={{display: 'flex', justify: 'flex-start'}} to='/'>back</Link>
<Card style={{ width: '100%', aLignItem: 'flex-start' }}>
              <Card.Header style={{ color: 'black' }}>Transaction Overview</Card.Header>
              
              <Card.Body >
              {transactionInfo !== null && transactionInfo !== undefined?
                <Table striped="columns" bordered hover size="sm">
                    <tbody >
                    <tr>
                      <td>hash</td>
                      <td>{transactionInfo.hash}</td>
                    </tr>
                    <tr>
                      <td>fee</td>
                      <td>{transactionInfo.fee}</td>
                    </tr> 
                    <tr>
                      <td>weight</td>
                      <td>{transactionInfo.weight}</td>
                    </tr> 
                    <tr>
                      <td>size</td>
                      <td>{transactionInfo.size}</td>
                    </tr> 
                    <tr>
                      <td>tx_index</td>
                      <td>{transactionInfo.tx_index}</td>
                    </tr> 
                    <tr>
                      <td>time</td>
                      <td>{transactionInfo.time}</td>
                    </tr> 
                    <tr>
                      <td>block index</td>
                      <td>{transactionInfo.block_index}</td>
                    </tr> 
                    <tr>
                      <td>Status</td>
                      <td>{status}</td>
                    </tr> 
                  </tbody>
    </Table>
    : null
}
              </Card.Body>

            </Card>
        </Container>

    )

}

export default Transaction 