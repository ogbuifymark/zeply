import { Card,Table } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from "react";

import { GeneralContext } from '../Context';

const AddressOverview = () => {
    const {
        addressInfo
    } = useContext(GeneralContext)

    useEffect(() =>{
    }, [])
    return(
<Card style={{ width: '100%', aLignItem: 'flex-start' }}>
              <Card.Header data-testid="address-header" style={{ color: 'black' }}>Overview</Card.Header>
              <Card.Body >
              {addressInfo !== null && addressInfo !== undefined?
                <Table data-testid="address-table" striped="columns" bordered hover size="sm">
                    <tbody >
                    <tr>
                      <td>address</td>
                      <td>{addressInfo.address}</td>
                    </tr>
                    <tr>
                      <td>hash160</td>
                      <td>{addressInfo.hash160}</td>
                    </tr> 
                    <tr>
                      <td>total received</td>
                      <td>{addressInfo.total_received}</td>
                    </tr> 
                    <tr>
                      <td>total sent</td>
                      <td>{addressInfo.total_sent}</td>
                    </tr> 
                    <tr>
                      <td>balance</td>
                      <td>{addressInfo.final_balance}</td>
                    </tr> 
                    <tr>
                      <td>number of transaction</td>
                      <td>{addressInfo.n_tx}</td>
                    </tr>
                  </tbody>
    </Table>
    : null
}
              </Card.Body>

            </Card>
    )

}

export default AddressOverview