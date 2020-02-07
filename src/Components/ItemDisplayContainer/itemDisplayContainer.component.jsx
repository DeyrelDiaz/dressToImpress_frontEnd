import React from 'react';
import ItemDisplay from '../ItemDisplay/itemDisplay.componenet';
import { Container, Row, Col, Button, ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';

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
                <ButtonGroup horizontal >
                <DropdownButton as={ButtonGroup} title="Sort by Color" id="bg-vertical-dropdown-1" variant = "">
                    <Dropdown.Item eventKey="1" onChange={this.setValue}>Red</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Orange</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Yellow</Dropdown.Item>
                    <Dropdown.Item eventKey="4">Green</Dropdown.Item>
                    <Dropdown.Item eventKey="5">Blue</Dropdown.Item>
                    <Dropdown.Item eventKey="6">Indigo</Dropdown.Item>
                    <Dropdown.Item eventKey="7">Violet</Dropdown.Item>
                    <Dropdown.Item eventKey="8">White</Dropdown.Item>
                    <Dropdown.Item eventKey="9">Black</Dropdown.Item>

                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Sort by Price" id="bg-vertical-dropdown-2" variant = "">
                    <Dropdown.Item eventKey="1" >Low to High</Dropdown.Item>
                    <Dropdown.Item eventKey="2">High to Low</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Sort by Type" id="bg-vertical-dropdown-3" variant = "">
                    <Dropdown.Item eventKey="1">Dress</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Skirt</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Pant</Dropdown.Item>
                    <Dropdown.Item eventKey="4">Shirt</Dropdown.Item>
                </DropdownButton>
                </ButtonGroup>
                <br>
                    {/* Break */}
                </br>
                <Container>
                    <Row>
                        {itemsToDisplay == null ? <Col> </Col> : itemsToDisplay.map(this.displayItems)}
                    </Row>
                </Container>
            </div>
        )
    }
}
