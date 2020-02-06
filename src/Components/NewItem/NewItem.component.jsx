import React from 'react';

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

export default class NewItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            Color: '',
            ItemType: '',
            Name: '',
            Category: '',
            cost: '',
            Description: '',
            Display: ''
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
            Color: this.state.Color,
            ItemType: this.state.ItemType,
            Name: this.state.Name,
            Category: this.state.Category,
            dob: this.state.cost,
            Description: this.state.Description,
            Display: this.state.Display
        }
        console.log(newItem);
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    this.props.history.push('/');
                }
                else {
                    alert('something went wrong')
                }
            })
        }

    render() {
        return(
            <div>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="Color">
                            <Form.Label>Color:</Form.Label>
                            <Form.Control name="Color" onChange={this.setValue} type="text" placeholder="Enter Color" />
                        </Form.Group>
                        <Form.Group controlId="itemType">
                            <Form.Label>Item Type:</Form.Label>
                            <Form.Control name="itemType" onChange={this.setValue} type="text" placeholder="must be atleast 8 characters long" />
                        </Form.Group>
                        <Form.Group controlId="Name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control name="Name" onChange={this.setValue} type="text" />
                        </Form.Group>
                        <Form.Group controlId="Category">
                            <Form.Label>Category:</Form.Label>
                            <Form.Control name="Category" onChange={this.setValue} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>Date Of Birth:</Form.Label>
                            <Form.Control name="dob" onChange={this.setValue} type="date" />
                        </Form.Group>
                        <Button variant="info" type="submit" >Add Item</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}