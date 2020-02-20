import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

export default class AddrModal extends React.Component {
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
                <Form>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info">Update!</Button>
            </Modal.Footer>
        </Modal>
    )
}
} 
