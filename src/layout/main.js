import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "../components/NavBar";

function Layout() {
  return (
    <>
      <NavBar />
      <Container className="d-flex flex-column align-items-center p-4">
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
