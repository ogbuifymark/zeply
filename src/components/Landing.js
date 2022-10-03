
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
<header>
<h1 data-testid="heading" className="header">Welcome To Bitcoin Information Dashboard</h1>

</header>
            <br />
            <SearchPage  />
            <AddressOverview data-testid="addressoverview" />
            <Row>
              <Col><Transactions/></Col>
              <Col><Blocks/></Col>
            </Row>


          </Container>
    )}
    export default Landing