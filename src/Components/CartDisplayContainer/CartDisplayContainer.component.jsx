import React from 'react';
import Cart from '../Cart/Cart.component';
import { Container, Row, Col, Button} from 'react-bootstrap';

export default class CartDisplayContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log('cart display container', this.props);
        this.displayItems = this.displayItems.bind(this);
        console.log("in cart display class");
    }

    displayItems(item) {
        return (
            <Col>
                <Cart id={item.ID} title={item.Name} text={item.Description} imgUrl={item.Display} cost={item.Cost} />
            </Col>
        )
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        {this.props.cartitems == null ? <Col> </Col> : this.props.cartitems.map(this.displayItems)}
                    </Row>
                </Container>
            </div>
        )
    }
}
