
import { Container, Card,Row, Col } from 'react-bootstrap';
import SearchPage from './SearchPage';
import AddressOverview from './AddressOverview'
import Transactions from './Transactions';
import Blocks from './Blocks';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';




function Landing() {
  
    return (
<Container >
<Link style={{display: 'flex', justify: 'flex-start'}} to='/subscriptions'>subscriptions</Link>

            <h1 className="header">Welcome To Bitcoin Information Dashboard</h1>
            <br />
            <SearchPage />
            <AddressOverview />
            <Row>
              <Col><Transactions/></Col>
              <Col><Blocks/></Col>
            </Row>


          </Container>
    )}
    export default Landing