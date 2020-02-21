import React from 'react';

import { Tabs, Tab, Container, Navbar, Nav, Table, Button, Card} from 'react-bootstrap';
import ModalAddr from './AddrModal.Component';
import ModalCard from './CardModal.Component';

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.username = JSON.parse(localStorage.getItem('user'));

        this.state = {
            userinfo: {},
            cardend: -1,
            orders: []
        }

            console.log('user info', this.username);

            this.showEditAddrModal = this.showEditAddrModal.bind(this);
            this.showEditCardModal = this.showEditCardModal.bind(this);
            this.closeEditAddrModal = this.closeEditAddrModal.bind(this);
            this.closeEditCardModal = this.closeEditCardModal.bind(this);
            this.setValue = this.setValue.bind(this);
            // this.componentDidMount = this.componentDidMount.bind(this);
            this.displayOrder = this.displayOrder.bind(this);

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
            username: JSON.parse(localStorage.getItem('user'))
        }

        const url = '/api/user/profile';
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
                console.log('res',result.orders)
                //console.log(this.state)

                this.setState({
                    userinfo: result.items[0],
                    cardend: result.cardend,
                    orders: result.orders
                })
                console.log("yeah?")
                console.log('im the state after',this.state.userinfo)
            }
        },
        (err) => {
            console.log(err)
        })
    }

    displayOrder(order, index){
        console.log('mapping orders', order)
        return(
            <tr>
                                <td>{order.Date}</td>
                                <td align= "center"><Card style={{ width: '15rem' ,height: '20rem' }}>
                                <Card.Body>
                                    <Card.Img style={{ width: '8rem' ,height: '10rem'}}src={order.Display} />
                                    {/* <Card.Title>{this.props.title}</Card.Title> */}
                                    <Card.Text>{order.Name}</Card.Text>
                                    <Card.Footer>${order.Cost}</Card.Footer>
                                </Card.Body>
                            </Card></td>
                                </tr>
        )
    }

    clearStorage(event)
    {
        console.log('localStorage.user :', localStorage.user);
        localStorage.removeItem('user')
        console.log('localStorage.user :', localStorage.user);

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
                        <Button href="/" onClick={this.clearStorage} variant='info'>Logout</Button>

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
                                <td>{this.state.userinfo.Number}</td>
                                <td>{this.state.userinfo.Street}</td>
                                <td>{this.state.userinfo.City}</td>
                                <td>{this.state.userinfo.AddrState}</td>
                                <td>{this.state.userinfo.Zipcode}</td>
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
                                <td>{this.state.cardend}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <br></br>
                        <Button variant="info" onClick={this.showEditCardModal}>Edit Card Information</Button>
                    </Tab>
                    <Tab eventKey="orders" title="Orders" variant="dark">
                        <div>
                        <Table borderless hover> 
                            <thead>
                                <tr>
                                <th>Date</th>
                                <th>Item</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.orders == [] ? <tr></tr> : this.state.orders.map(this.displayOrder)}
                            </tbody>
                        </Table>
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