import React from 'react';

import { Tabs, Tab, Container, Navbar, Nav, Table, Card} from 'react-bootstrap';

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Navbar bg="info" variant="dark">
                    <Navbar.Brand>Dress To Impress</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/newItem">Add Item</Nav.Link>
                        <Nav.Link href="/cart">Cart</Nav.Link>
                        <Nav.Link href="/user/profile">User Profile</Nav.Link>

                    </Nav>
                </Navbar>
                <Container>
                <Tabs id="controlled-tab-example" variant="tabs" >
                    <Tab eventKey="info" title="User Profile" variant="dark">
                    <Table striped bordered hover variant="info">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>                    </Tab>
                    <Tab eventKey="orders" title="Orders" variant="dark">
                        <div>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Img src={this.props.imgUrl} />
                                    <Card.Title>{this.props.title}</Card.Title>
                                    <Card.Text>{this.props.text}</Card.Text>
                                    <Card.Footer>${this.props.cost}</Card.Footer>
                                </Card.Body>
                            </Card>
                        </div>
                    </Tab>
                </Tabs>
                </Container>
            </div>
        )
    }
}