
import { Container, Card,Row, Col, Button } from 'react-bootstrap';
import SearchPage from '../SearchPage';
import AddressOverview from '../AddressOverview'
import Transactions from '../Transactions';
import Blocks from '../Blocks';
import Transaction from '../Transaction';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import SubTransactions from './NewTransaction';
import SubBlocks from './NewBlocks';
import { Link } from 'react-router-dom';




function Subscription() {
    
    

    return (
<Container >
<Link style={{display: 'flex', justify: 'flex-start'}} to='/'>subscriptions</Link>

            <h1 className="header">Realtime information</h1>
            <br />
            
            <Row>
              <Col><SubTransactions/></Col>
              <Col><SubBlocks/></Col>
            </Row>


          </Container>
    )}
    export default Subscription