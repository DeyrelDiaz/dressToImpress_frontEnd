import React from 'react';

import { Button, Card } from 'react-bootstrap';

export default class ItemDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            date: '',
        };
    }

    onSubmit(event) {
        console.log("Attempting to buy item...")
        event.preventDefault();
        // const user = JSON.parse(localStorage.getItem('user'));
        const newOrder = {
            username: 'shahnv',
            date: '1/2/2020'
        }
        console.log(newOrder);
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
                    alert('You successfully bought the item!')
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
                        <Button variant="info" type="Button" onClick = {this.onSubmit}>Buy Now!</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
