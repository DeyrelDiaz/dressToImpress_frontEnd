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
        const newOrder = {
            date: new Date(),
            id: event.target.value,
            username: 'tester'
        }
        console.log('new Order', newOrder);
        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    alert('You successfully bought the item! Enjoy your new purchase!')
                    // this.props.history.push('/home');
                }
                else if (result.number == 2) 
                {
                    alert('There was an error when trying to buy item! Please enter a shipping address and try again.')
                }
                else if (result.number == 1) 
                {
                    alert('There was an error when trying to buy item! Please enter a credit card and try again.')
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
                    </Card.Body>
                </Card>
                <Button value={this.props.id} variant='info' type='submit' onClick = {this.onSubmit}>Buy Cart Items</Button>
            </div>
        )
    }
}
