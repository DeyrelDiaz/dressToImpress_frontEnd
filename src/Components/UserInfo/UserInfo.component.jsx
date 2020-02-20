import React from 'react';

import { Tabs, Tab, Container, Navbar, Nav, Table, Button, Card} from 'react-bootstrap';
import ModalAddr from './AddrModal.Component';
import ModalCard from './CardModal.Component';

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.username = JSON.parse(localStorage.getItem('user'));

        this.state = {
            userinfo: []
        }

            console.log('user info', this.username);

            this.showEditAddrModal = this.showEditAddrModal.bind(this);
            this.showEditCardModal = this.showEditCardModal.bind(this);
            this.closeEditAddrModal = this.closeEditAddrModal.bind(this);
            this.closeEditCardModal = this.closeEditCardModal.bind(this);
            this.setValue = this.setValue.bind(this);
            this.componentDidMount = this.componentDidMount.bind(this);

    }

    showEditAddrModal(){
        console.log('trying to open modal');
        this.setState({showEditAddrModal: true});
    }
    
    closeEditAddrModal(){
        this.setState({showEditAddrModal: false});
    }

    showEditCardModal(){
        this.setState({showEditCardModal: true});
    }

    closeEditCardModal(){
        this.setState({showEditCardModal: false});
    }

    setValue(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        const params = {
            username: 'tester'
        }

        const url = '/api/cart';
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');

        var request = new Request(url + "?" + query, {
            method: 'GET'
        })

        fetch(request, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
        .then((result) => {
            if (result.success) {
                this.setState({
                    userinfo: result.items
                })
            }
        },
        (err) => {
            console.log(err)
        })
    }

    displayAddr(item) {
        return (
            <tr>
            <td>{this.state.Number}</td>
            <td>{this.state.Street}</td>
            <td>{this.state.City}</td>
            <td>{this.state.AddrState}</td>
            <td>{this.state.ZipCode}</td>
            </tr>
        )
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
                   <br></br>
                    <h5 align="left">Address:</h5>
                        <Table borderless hover> 
                            <thead>
                                <tr>
                                <th>Number</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                {/* <td>32</td>
                                <td>the Bird</td>
                                <td>witter</td>
                                <td>witter</td>
                                <td>witter</td> */}
                                <td>{this.state.Number}</td>
                                <td>{this.state.Street}</td>
                                <td>{this.state.City}</td>
                                <td>{this.state.AddrState}</td>
                                <td>{this.state.ZipCode}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <br></br>
                        <Button variant="info" onClick={this.showEditAddrModal}>Edit Address Information</Button>
                        <br></br>
                        <br></br>
                    <h5 align="left">Card Information:</h5>
                        <Table borderless hover> 
                            <thead>
                                <tr>
                                <th>endsWith</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>2703</td>
                                </tr>
                            </tbody>
                        </Table>
                        <br></br>
                        <Button variant="info" onClick={this.showEditCardModal}>Edit Card Information</Button>
                    </Tab>
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
                <ModalAddr show={this.state.showEditAddrModal} onHide={this.closeEditAddrModal}/>
                <ModalCard show={this.state.showEditCardModal} onHide={this.closeEditCardModal}/>
            </div>
        )
    }
}