const NavbarInstance = React.createClass({  
  render: function() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><span className="glyphicon glyphicon-ruble"></span> Poise</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={3} title={<span><span className="glyphicon glyphicon-menu-hamburger"></span> Menu</span>} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/lines">
                <span className="glyphicon glyphicon-tasks"></span> &nbsp;Lines
              </MenuItem>
              <MenuItem eventKey={3.2} href="/operations">
                <span className="glyphicon glyphicon-wrench"></span> &nbsp;Operations
              </MenuItem>
              <MenuItem eventKey={3.3} href="/operators">
                <span className="glyphicon glyphicon-user"></span> &nbsp;Operators
              </MenuItem>
              <MenuItem eventKey={3.3} href="/machines">
                <span className="glyphicon glyphicon-print"></span> &nbsp;Machines
              </MenuItem>
            </NavDropdown>
            <NavItem eventKey={1} href="#">
              <span className="glyphicon glyphicon-log-out"></span> Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});