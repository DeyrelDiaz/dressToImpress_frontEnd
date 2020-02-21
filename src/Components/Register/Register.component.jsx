import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            fname: '',
            lname: '',
            dob: '',
            number: '',
            street: '',
            state: '',
            zip: '',
            cardnumber: '',
            expirydate: '',
            cvv: ''
        };

        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    setValue(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        console.log("on submit works")
        event.preventDefault();
        const newCust = {
            username: this.state.username,
            password: this.state.password,
            fname: this.state.fname,
            lname: this.state.lname,
            dob: this.state.dob,
            number: this.state.number,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            cardnumber: this.state.cardnumber,
            expirydate: this.state.expirydate,
            cvv: this.state.cvv
        }
        console.log(newCust);
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCust)
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    alert('User already exists! Please login.')
                    this.props.history.push('/');
                }
                else if (result.number == 1){
                    alert('User already exists! Please login.')
                }
                else if (result.number == 2)
                {
                    alert('One or more text fields are empty. Please fill them out and try again.')
                }
            })
        }

    

    render() {
        return(
            <div><Navbar bg="info" variant="dark">
            <Navbar.Brand>Dress To Impress</Navbar.Brand>
            <Nav>
                <Nav.Link href="/">User Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/home"></Nav.Link>
                <Nav.Link href="/newItem"></Nav.Link>
            </Nav>
        </Navbar>    
                <Container>
                    <Form onSubmit={this.onSubmit} style={{ marginTop: '1rem', marginBottom : '2rem' }} >
                        <Form.Group controlId="username"> 
                            <Form.Label>Username:</Form.Label>
                            <Form.Control name="username" onChange={this.setValue} type="text" placeholder="Enter username." />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control name="password" onChange={this.setValue} type="password" placeholder="Must be at least eight characters long." />
                        </Form.Group>
                        <Form.Group controlId="fname">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control name="fname" onChange={this.setValue} type="text" placeholder="Enter First Name."/>
                        </Form.Group>
                        <Form.Group controlId="lname">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control name="lname" onChange={this.setValue} type="text"  placeholder="Enter Last Name."/>
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>Date Of Birth:</Form.Label>
                            <Form.Control name="dob" onChange={this.setValue} type="date" placeholder="Enter birthdate." />
                        </Form.Group>
                        <Form.Group controlId="number">
                            <Form.Label>Number:</Form.Label>
                            <Form.Control name="number" onChange={this.setValue} type="number" placeholder="Enter Street Number."/>
                        </Form.Group>
                        <Form.Group controlId="street">
                            <Form.Label>Street:</Form.Label>
                            <Form.Control name="street" onChange={this.setValue} type="text" />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City:</Form.Label>
                            <Form.Control name="city" onChange={this.setValue} type="text" />
                        </Form.Group>
                        <Form.Group controlId="state">
                            <Form.Label>State:</Form.Label>
                            <Form.Control name="state" onChange={this.setValue} type="text" />
                        </Form.Group>
                        <Form.Group controlId="zip">
                            <Form.Label>Zip Code:</Form.Label>
                            <Form.Control name="zip" onChange={this.setValue} type="text" />
                        </Form.Group>
                        <Form.Group controlId="cardnumber">
                            <Form.Label>Credit Card Number:</Form.Label>
                            <Form.Control name="cardnumber" onChange={this.setValue} type="number" />
                        </Form.Group>
                        <Form.Group controlId="expirydate">
                            <Form.Label>Credit Card Expiry Date:</Form.Label>
                            <Form.Control name="expirydate" onChange={this.setValue} type="date" />
                        </Form.Group>
                        <Form.Group controlId="cvv">
                            <Form.Label>CVV:</Form.Label>
                            <Form.Control name="cvv" onChange={this.setValue} type="password" />
                        </Form.Group>
                        <Button variant="info" type="submit" style={{ marginTop: '1rem', marginBottom : '2rem' }} >Register</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}