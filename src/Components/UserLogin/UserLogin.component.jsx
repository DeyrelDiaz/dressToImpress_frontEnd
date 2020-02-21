import React from 'react';

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';


export default class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            Username: '',
            Password: '',
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
        const newItem = {
            Username: this.state.Username,
            Password: this.state.Password,

        }
        fetch(`api/user?username=${this.state.Username}&password=${this.state.Password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
        .then((result) => {
            console.log('front end result.success :', result.success);
            if (result.success == true)
            {
                console.log(result);
                localStorage.setItem('user', JSON.stringify(result.user)); 
                console.log('loc storage', localStorage);
                this.props.history.push('/home')

            }
            else if (result.success == false )
            {
                console.log('User login failed.')
                alert('Your username/password is not correct! If you do not already have an account, please register.')
            }

            
        },
        (err) => {
            console.log(err);
        })
        }


    render() {
        return(
            // <head>
            //     <link href='https://fonts.googleapis.com/css?family=Allan' rel='stylesheet'></link>
            // </head>
            // <body>
                <div> 
                    <Navbar bg="info" variant="dark">
                        <Navbar.Brand>Dress To Impress</Navbar.Brand>
                        <Nav>
                            <Nav.Link href="/">User Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                            {/* <Nav.Link href="/home">.</Nav.Link>
                            <Nav.Link href="/newItem">.</Nav.Link> */}
                        </Nav>
                    </Navbar>    
                    <Container>
                        <Form onSubmit={this.onSubmit} style={{ marginTop: '1rem', marginBottom : '2rem'}} >
                            <Form.Group controlId="Username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control name="Username" onChange={this.setValue} type="text" placeholder="Enter Username" />
                            </Form.Group>
                            <Form.Group controlId="Password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name="Password" onChange={this.setValue} type="password" placeholder="Enter Password" />
                            </Form.Group>                
                            <Button variant="info" type="submit" >Login!</Button>
                        </Form>
                    </Container>
                </div>
            // </body>
        )
    }
}