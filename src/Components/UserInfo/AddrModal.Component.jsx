import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {Col, Row} from 'react-bootstrap';

export default class AddrModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Number: '',
            Street: '',
            City: '',
            State: '',
            Zipcode: ''
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
        const changedAddr = {
            username: JSON.parse(localStorage.getItem('user')),
            Number: this.state.Number,
            Street: this.state.Street,
            City: this.state.City,
            State: this.state.State,
            ZipCode: this.state.Zipcode
                }
        console.log(changedAddr);
        fetch('/api/user/profile/addrModal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changedAddr)
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    alert('Address is Updated Successfully')
                    window.location.reload();
                }
                else {
                    alert('Address was unable to be updated')
                }
            })
        }

render(){
    return(
        <Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="addrModal" centered>
            <Modal.Header closeButton>
                <Modal.Title show={true} onHide={this.closeEditAddrModal}>
                Edit Address 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group as={Row} controlId="Number">
                        <Form.Label column sm="2">Number:</Form.Label>
                        <Col>
                        <Form.Control name="Number" onChange={this.setValue} type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="Street">
                        <Form.Label column sm="2">Street:</Form.Label>
                        <Col>
                        <Form.Control name="Street" onChange={this.setValue} type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="City">
                        <Form.Label column sm="2">City:</Form.Label>
                        <Col>
                        <Form.Control name="City" onChange={this.setValue} type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="State">
                        <Form.Label column sm="2">State:</Form.Label>
                        <Col>
                        <Form.Control name="State" onChange={this.setValue} type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="Zipcode">
                        <Form.Label column sm="2">Zip Code:</Form.Label>
                        <Col>
                        <Form.Control name="Zipcode" onChange={this.setValue} type="text" />
                        </Col>
                    </Form.Group>
                    <Button variant="info" type="submit">Update!</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
} 
