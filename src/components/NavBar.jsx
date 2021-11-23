import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useAuth } from "../context/auth";
import {
    Link
} from "react-router-dom";

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
                        {!user ? <>
                            <Link to="/login"><Button>Login</Button></Link>
                        </> :
                            <Navbar.Text>
                                Signed in as: <Link to="/app">{user.email}</Link>
                            </Navbar.Text>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
};

export default NavBar;
