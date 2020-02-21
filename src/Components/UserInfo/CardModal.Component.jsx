import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {Col, Row} from 'react-bootstrap';

export default class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Number: '',
            Date: '',
            CVV: ''
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
        const changedCard = {
            username: JSON.parse(localStorage.getItem('user')),
            Number: this.state.Number,
            Date: this.state.Date,
            CVV: this.state.CVV,
            }
        console.log(changedCard);
        fetch('/api/user/profile/cardModal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changedCard)
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    alert('Card details Updated Successfully')
                    window.location.reload();
                }
                else {
                    alert('Card details were unable to be updated')
                }
            })
        }

render(){
    return(
        <Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="cardModal" centered>
            <Modal.Header closeButton>
                <Modal.Title show={true} onHide={this.closeEditAddrModal}>
                Edit Address 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group as={Row} controlId="Number">
                        <Form.Label column sm="2">Card Number:</Form.Label>
                        <Col>
                        <Form.Control name="Number" onChange={this.setValue} type="number" placeholder="xxxxxxxxxxxxxxxx " />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="Date">
                        <Form.Label column sm="2">Expiration Date:</Form.Label>
                        <Col>
                        <Form.Control name="Date" onChange={this.setValue} type="date" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="CVV">
                        <Form.Label column sm="2">CVV:</Form.Label>
                        <Col>
                        <Form.Control name="CVV" onChange={this.setValue} type="number" placeholder="xxx" />
                        </Col>
                    </Form.Group>
                    <Button variant="info" type="submit">Update!</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
} 
