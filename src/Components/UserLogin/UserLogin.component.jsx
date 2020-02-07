import React from 'react';

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
// console.log("im in here (top)")


export default class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            Username: '',
            Password: '',
        };

        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.render()
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
        // console.log(UserLogin);
        fetch(`api/user?username=${this.state.Username}&password=${this.state.Password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
        .then((result) => {
            if (result.success == true)
            {
                localStorage.setItem('user', JSON.stringify(result.user)); 
                alert('Login Successful! Welcome '+ newItem.Username +'!')
    
                this.props.history.push('/home')

            }
            else{
                console.log('User login failed.')
                alert('Your login information is not correct! Please try again.')
            }
            
        },
        (err) => {
            console.log(err);
        })
        }


    render() {
        // console.log("im in here (bottom)")
        return(
            <div>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="Username">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control name="Username" onChange={this.setValue} type="text" placeholder="Enter Username" />
                        </Form.Group>
                        <Form.Group controlId="Password">
                            <Form.Label>Item Type:</Form.Label>
                            <Form.Control name="Password" onChange={this.setValue} type="password" placeholder="Enter Password" />
                        </Form.Group>                
                        <Button variant="info" type="submit" >Login!</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}