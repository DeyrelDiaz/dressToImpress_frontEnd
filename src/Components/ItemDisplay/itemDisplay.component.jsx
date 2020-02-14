import React from 'react';

import { Button, Card } from 'react-bootstrap';

export default class ItemDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Card>
                    <Card.Body>
                        <Card.Img src={this.props.imgUrl} />
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>{this.props.text}</Card.Text>
                        <Button variant="info">Buy Now!</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
