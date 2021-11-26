import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "../components/NavBar";
import AppTabs from "../components/AppTabs";

function AppLayout() {
  return (
    <>
      <NavBar />
      <AppTabs />
      <Container className="d-flex flex-column align-items-center p-1" fluid>
        <Outlet />
      </Container>
    </>
  );
}

export default AppLayout;
