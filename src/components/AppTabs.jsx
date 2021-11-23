import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = () => (
  <>
    <Navbar bg="light">
      <Container fluid>
        <Nav className="me-auto" variant="tabs" defaultActiveKey="hot_market">
          <Nav.Item>
            <Nav.Link eventKey="hot_market">Hot Market</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="inventory_age">Invetory Age</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="avg_wealth">Average Wealth</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="unemployment">Unemployment</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Cost of Living">Cost of Living</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  </>
);

export default Header;
