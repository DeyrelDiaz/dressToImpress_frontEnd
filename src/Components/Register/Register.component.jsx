import React from 'react';

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
            dob: ''
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
            dob: this.state.dob
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
                    this.props.history.push('/home');
                }
                else {
                    alert('User already exists! Please login.')
                }
            })
        }

    

    render() {
        return(
            <div>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control name="username" onChange={this.setValue} type="text" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control name="password" onChange={this.setValue} type="password" placeholder="must be atleast 8 characters long" />
                        </Form.Group>
                        <Form.Group controlId="fname">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control name="fname" onChange={this.setValue} type="text" />
                        </Form.Group>
                        <Form.Group controlId="lname">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control name="lname" onChange={this.setValue} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>Date Of Birth:</Form.Label>
                            <Form.Control name="dob" onChange={this.setValue} type="date" />
                        </Form.Group>
                        <Button variant="info" type="submit" >Register</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}