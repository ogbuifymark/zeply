
import { Container, Card,Row, Col } from 'react-bootstrap';
import SearchPage from './SearchPage';
import AddressOverview from './AddressOverview'
import Transactions from './Transactions';
import Blocks from './Blocks';
import Transaction from './Transaction';



function Landing() {
  
    return (
<Container >
            <h1 className="header">Welcome To React-Bootstrap</h1>
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