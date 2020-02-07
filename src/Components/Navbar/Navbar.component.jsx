import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Navbar bg="info" variant="dark">
                    <Navbar.Brand>Dress To Impress</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/">User Login</Nav.Link>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/register">Add User</Nav.Link>
                        <Nav.Link href="/newItem">Add Item</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}