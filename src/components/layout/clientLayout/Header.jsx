import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import logo from "./../../../assets/logo/white-logo.png";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="" width={120} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="mx-1" to="/dms">
              Home
            </NavLink>
            <NavLink className="mx-1" to="/dms/purchase">
              Purchase
            </NavLink>
          </Nav>
          <Nav className="ms-auto">
            <NavLink className="mx-md-5 mt-1" to="/dms/contact">
              Contact Us
            </NavLink>
          </Nav>

          <div>
            <Link target="_blank" to="https://www.facebook.com/bacbonltd">
              <BsFacebook
                className=" mx-2"
                lassName=""
                color="white"
                size={20}
              />
            </Link>
            <Link
              target="_blank"
              to="https://bd.linkedin.com/company/bacbonltd"
            >
              <BsLinkedin
                className=" mx-2"
                lassName=""
                color="white"
                size={20}
              />
            </Link>
            <Link target="_blank" to="https://bacbonltd.com/">
              <AiOutlineGlobal
                className=" mx-2"
                lassName=""
                color="white"
                size={20}
              />
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
