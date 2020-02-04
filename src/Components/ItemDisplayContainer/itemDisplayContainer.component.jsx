import React from 'react';
import ItemDisplay from '../ItemDisplay/itemDisplay.componenet';
import { Container, Row, Col } from 'react-bootstrap';

export default class ItemDisplayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.displayItems = this.displayItems.bind(this);
    }
    
    displayItems(item, index) {
        return (
            <Col>
                <ItemDisplay title={item.name} text={item.Description} imgUrl={item.Display} />
            </Col>
        )
    }
    
    render() {
        const itemsToDisplay = JSON.parse(localStorage.getItem('items'));

        return (
            <div>
                <Container>
                    <Row>
                       {itemsToDisplay.map(this.displayItems)}
                    </Row>
                </Container>
            </div>
        )
    }
}