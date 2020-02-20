import React from 'react';

import { Tabs, Tab, Container, Navbar, Nav, Table, Button} from 'react-bootstrap';
import ModalAddr from './AddrModal.Component';
import ModalCard from './CardModal.Component';
export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Username: 'tester',
            Address: '',
            CardNumber: '',
            showEditCardModal: false,
            showEditAddrModal: false
            };

            this.showEditAddrModal = this.showEditAddrModal.bind(this);
            this.showEditCardModal = this.showEditCardModal.bind(this);
            this.closeEditAddrModal = this.closeEditAddrModal.bind(this);
            this.closeEditCardModal = this.closeEditCardModal.bind(this);
            this.setValue = this.setValue.bind(this);
            this.onSubmit = this.onSubmit.bind(this);

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

    onSubmit(event) {
        console.log("on submit works")
        event.preventDefault();
        const newItem = {
            Color: this.state.Color,
            ItemType: this.state.ItemType,
            Name: this.state.Name,
            Cost: this.state.Cost,
            Description: this.state.Description,
            Display: this.state.Display
                }
        console.log(newItem);
        fetch('/api/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    alert('Item Added')
                  //  this.props.history.push('/home');
                }
                else {
                    alert('Item was not added')
                }
            })
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
                                <td>32</td>
                                <td>the Bird</td>
                                <td>witter</td>
                                <td>witter</td>
                                <td>witter</td>
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
                    </Tab>
                </Tabs>
                </Container>
                <ModalAddr show={this.state.showEditAddrModal} onHide={this.closeEditAddrModal}/>
                <ModalCard show={this.state.showEditCardModal} onHide={this.closeEditCardModal}/>
            </div>
        )
    }
}