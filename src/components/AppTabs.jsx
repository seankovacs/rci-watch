import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname.slice(1));

  const handleSelect = (key) => {
    setKey(key);
  };

  return (
    <>
      <Navbar bg="light">
        <Container fluid>
          <Nav
            className="me-auto"
            variant="tabs"
            activeKey={key}
            onSelect={handleSelect}
          >
            <Nav.Item>
              <Link to="/hot-market">
                <Nav.Link as="div" eventKey="hot-market">
                  Hot Market
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/inventory-age">
                <Nav.Link as="div" eventKey="inventory-age">
                  Inventory Age
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/avg-wealth">
                <Nav.Link as="div" eventKey="avg-wealth">
                  Average Wealth
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/unemployment">
                <Nav.Link as="div" eventKey="unemployment">
                  Unemployment
                </Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
