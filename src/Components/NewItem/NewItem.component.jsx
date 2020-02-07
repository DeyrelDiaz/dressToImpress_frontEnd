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
            Cost: '',
            Description: '',
            Display: '',
            Quantity: ''
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
            Cost: this.state.Cost,
            Description: this.state.Description,
            Display: this.state.Display,
            Quantity: this.state.Quantity
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

        

    render() {
        return(
            <div>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="Color">
                            <Form.Label>Color:</Form.Label>
                            <Form.Control name="Color" onChange={this.setValue} type="text" placeholder="Enter Color" />
                        </Form.Group>
                        <Form.Group controlId="ItemType">
                            <Form.Label>Item Type:</Form.Label>
                            <Form.Control name="ItemType" onChange={this.setValue} type="text" placeholder="must be atleast 8 characters long" />
                        </Form.Group>
                        <Form.Group controlId="Name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control name="Name" onChange={this.setValue} type="text" />
                        </Form.Group>
                        <Form.Group controlId="Category">
                            <Form.Label>Category:</Form.Label>
                            <Form.Control name="Category" onChange={this.setValue} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="Cost">
                            <Form.Label>Cost:</Form.Label>
                            <Form.Control name="Cost" onChange={this.setValue} type="text" placeholder="$$$" />
                        </Form.Group>
                        <Form.Group controlId="Description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control name="Description" onChange={this.setValue} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="Display">
                            <Form.Label>Image To Display:</Form.Label>
                            <Form.Control name="Display" onChange={this.setValue} type="text"  placeholder="Please enter URL or path"/>
                        </Form.Group>
                        <Form.Group controlId="Quantity">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control name="Quantity" onChange={this.setValue} type="text" />
                        </Form.Group>
                        <Button variant="info" type="submit" >Add Item</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}