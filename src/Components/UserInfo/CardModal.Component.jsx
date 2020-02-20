import React from 'react';
import {Modal, Form, Button, Col, Row} from 'react-bootstrap';

export default class CardModal extends React.Component {
    constructor(props) {
        super(props);
    }

render(){
    return(
        <Modal {...this.props} size="lg" aria-labelledby="addrModal" centered>
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
                        <Form.Control name="Number" onChange={this.setValue} type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="Street">
                        <Form.Label column sm="2">Exp Date:</Form.Label>
                        <Col>
                        <Form.Control name="Street" onChange={this.setValue} type="date" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="CVV">
                        <Form.Label column sm="2">cvv:</Form.Label>
                        <Col>
                        <Form.Control name="CVV" onChange={this.setValue} type="password" />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info">Update!</Button>
            </Modal.Footer>
        </Modal>
    )
}
} 
