import React from 'react';

import { Button, Card } from 'react-bootstrap';

export default class ItemDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit(event) {

        event.preventDefault();
        const addToCart = {
            id: event.target.value,
            username: 'tester'
        }
        console.log('addToCart :', addToCart);
        fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addToCart)
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    alert('This item has been added to your cart!')
                }
                else {
                    alert('You already have this item in your cart. Please pick another item or go to your cart to buy it.')
                }

            })
        }

        

    render() {
        return(
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        {/* <Card.Img src="noPictures/1.jpg"/> */}
                        <Card.Img src={this.props.imgUrl} />
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>{this.props.text}</Card.Text>
                        <Card.Footer>${this.props.cost}</Card.Footer>
                        <Button value={this.props.id} bsClass='custom-class' variant='info' type='submit' onClick = {this.onSubmit}>Add to Cart!</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
