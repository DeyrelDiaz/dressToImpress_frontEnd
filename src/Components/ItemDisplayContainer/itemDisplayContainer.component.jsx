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
                <ItemDisplay title={item.name} text={item.Description} imgUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACCCAMAAACXSEZJAAAAMFBMVEWEk6iRn7OntMWBkKauusuJl6yZprmir8GcqbyUorWOnLCqt8ixvc2frL60wNB+jaMnnyP2AAADz0lEQVR4nO2Y65KcIBCFuclVMu//tukLqDuZ2Wgqu1Ztne/HjCggHLqbRmMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAn8yy/byvUmudNZbJyerH+8dmH/qR/8/H8LU4a0wNdpRqG1exzUHZ5JguD6wb9PnY9/SQ/+K81Oj8uLnChZL2F3VtmKK0nP3wa/LxwS0E60391Ucpr0Uv0lr1wrZuaWltZ3m8DcUKdbb3aYgQG4uwhKTVQ/Es5fYe7xK3K7mJMC1rPyxt0icu3aaCiLC68X43bGJxLY472dBsvDeJ6pAIXtnafxSBSlyXKkRnnkTI2rA21rmVvaMU5YqscO/2e1ERxtxrGBclRbXu6qqOzNsmIjy3f7KE6U5kEtTwSQS96NxzK3sXKY4H+X9O7AoigkvJyzCS+rLpver4y7QRWsH6dxHqusWKFt+IUNprEUzu5iZEhFZktDRwFYFnoGu6i7CUE5ZQ13n/wZN+KUIN70S4LSioCItjf6xhGZZA7pk6D3oXgTkhwnTrtyIYu74RIR72ku9liJDJH8gbjIpg2/TxiyLYUyIYCYzbo12Emy1h4Q07VBXhwSFiEfceIoxATiJUZWvP+4FwwRIMb5HaD/e+u8OXzvQThggPWhra/9QdfKCg5mWnVxFqYTgmtJHybGvmUxhpj7sighsdSZ4wREg3B8bF0zJQFFAR6krbm3d9EyHyeFfZHepT1uyTsyJRv2YJcU+bKU/gCsvRRb6XKUJ1lpZFRPCFPd9nTndObZHiLBfd4RgTOueYpbl7M0YOCHREMEMEzRoqhYhdBFqoE3nChcC4PVl6aC0EF79kfqfYRChrHCKYFvUYUD7kCeeSpesimJR5P6p3+YI5iCAHSBGhttSJFPI/iDDvX80T0m1bgzmIYOyiItB0suASn52nO1xMmx/ubdr8KmPkkHufKewiMGIJfSwKmSgdK6YIJw9QM4PwHPpeihBfHqB83+t+O3+KMFNncgDeLiQ+GD5Kn8gYOc3SuUqfcp4e9YYIXvPxFxljy7eZwh8iiN1rgSNW1B295qAfVczT57Wn7wk1ZMkkCudbLMKszSJIR11e1qI55Amjg2pu4kkEMtOylThTWDhR4i9skkqWNRFU3s0+uSFCkJSnjOpZ7q1coAa0yK7JlSaJprWkn+1IDJfHu2+LjYXDod2KFB2XbUH0/kIZoR2fThfNDiWHHsxzxNYJ59iz+qxdZ+o9O7LHJ6OHug8DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+JH8BoraIwR94hJVAAAAAElFTkSuQmCC" />
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