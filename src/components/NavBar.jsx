import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useAuth } from "../context/auth";
import {
    Link,
    useLocation
} from "react-router-dom";

const AppLoginButton = ({ user }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (user && isHomePage) {
    return (
      <Link to="/app">
        <Button>Enter App</Button>
      </Link>
    );
  } else if (user) {
    return (
      <Navbar.Text>
        Signed in as: <Link to="/app">{user.email}</Link>
      </Navbar.Text>
    );
  }

  return (
    <Link to="/login">
      <Button>Login</Button>
    </Link>
  );
};


const NavBar = () => {
    const auth = useAuth();
    const { user } = auth;

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to="/"><Navbar.Brand>RCI Watch</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Nav>
                        <AppLoginButton user={user} />
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
};

export default NavBar;
