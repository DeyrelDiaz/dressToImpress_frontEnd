import React from 'react';

import { Button, Card } from 'react-bootstrap';

// import styles from './styles.css';

export default class ItemDisplay extends React.Component {
    constructor(props) {
        super(props);
        console.log('this.props', this.props);
        console.log("in cart class");

    }


    onSubmit(event) {

        event.preventDefault();
        const deleteCartItem = {
            id: event.target.value,
            username: 'tester'
        }
        console.log('deleteCartItem', deleteCartItem);
        fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteCartItem)
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) 
                {
                    alert('You have successfully deleted the item from your cart.')
                }
                else
                {
                    alert('There was an error when trying to delete the item.')
                }
            })
        }

        

    render() {
        return(
            <div>
                <Card>
                    <Card.Body>
                        <Card.Img src={this.props.imgUrl} />
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>{this.props.text}</Card.Text>
                        <Card.Footer>${this.props.cost}</Card.Footer>
                        <Button value={this.props.id} variant='info' onClick = {this.onSubmit}>Delete from Cart</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}