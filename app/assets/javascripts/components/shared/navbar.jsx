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
            {(() => {
              if(this.props.user_signed_in) {
                return (
                  <Navbar.Text>
                    <span>Signed In as, {this.props.user.name}</span>
                  </Navbar.Text>                  
                );
              }
            })()}
          </Nav>
          {(() => {
            if(this.props.user_signed_in) {
              return (
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
                    <MenuItem eventKey={3.3} href="/operation_bulletins">
                      <span className="glyphicon glyphicon-blackboard"></span> &nbsp;Operation Bulletins
                    </MenuItem>
                  </NavDropdown>
                  <NavItem eventKey={1} href="/users/sign_out" method="delete" className="text-muted">
                    <span><span className="glyphicon glyphicon-log-out"></span> Logout</span>
                  </NavItem>
                </Nav>
              );
            } else {
              return (
                <Nav pullRight>
                  <Navbar.Text>
                    <span>Sign In</span>
                  </Navbar.Text>
                </Nav>
              );
            }
          })()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
});