import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { selectUser } from "../../Redux/Slices/userSlice";
import NavList from "../NavList/NavList"
import "./navbar.css";
import { useSelector } from "react-redux";

export default function NavBar() {

    const [show, setShow] = useState(false);
    const user = useSelector(selectUser)

  return (
    <div id="nav">
      <Navbar  >
        <Container fluid="lg" className="navSubCont">
      {show && <NavList />}
          <Navbar.Brand className="brand">
            <NavLink exact to="/">
            <img
                src="https://static.vecteezy.com/system/resources/previews/000/348/244/original/sharing-vector-icon.jpg"
                alt="logo"
                style={{ width: "60px", marginRight: "1rem", borderRadius : "10px" }}
              />
            </NavLink>
          </Navbar.Brand>

          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
            <Nav className="linkContainer">
              <NavLink exact activeClassName="activeNavLinks" to="/">
                HOME
              </NavLink>
              <NavLink exact activeClassName="activeNavLinks" to="/myPosts">
                MY POSTS
              </NavLink>
                <section className="userInfo" onClick={()=>setShow((prev)=>!prev)}>
                    <Avatar
                      src={user?.profileImg}
                    />
                </section>
            </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>

    </div>
  );
}