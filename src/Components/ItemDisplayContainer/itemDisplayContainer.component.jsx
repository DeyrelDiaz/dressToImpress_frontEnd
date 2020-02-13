import React from 'react';
import ItemDisplay from '../ItemDisplay/itemDisplay.componenet';
import { Container, Row, Col, Button, ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';

export default class ItemDisplayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.displayItems = this.displayItems.bind(this);
        this.state = {
            Color: '',
            Price: '',
            Category: ''
        };    }
    
    displayItems(item, index) {
        return (
            <Col>
                <ItemDisplay title={item.name} text={item.Description} imgUrl={item.Display} />
            </Col>
        )
    }

    setValue = event => {
        // if (event.targer.innerText == "")
       // console.log('object :', object);
    }

    onSubmit(event) {
        console.log("on submit works")
        event.preventDefault();
        const sortItems = {
            Color: this.state.Color,
            Price: this.state.Password,
            Category: this.state.Category

        }
        // console.log(UserLogin);
        fetch(`api/sort`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
        .then((result) => {
            if (result.success == true)
            {

            }
            else{
                alert('Cannot sort by these parameters.')
                console.log('Cannot sort by these parameters.')
            }
            
        },
        (err) => {
            console.log(err);
        })
        }


    render() {
        const itemsToDisplay = JSON.parse(localStorage.getItem('items'));
        return (
            <div>
                <ButtonGroup >
                <DropdownButton as={ButtonGroup} title="Sort by Color" id="bg-vertical-dropdown-1" variant = "" >
                    <Dropdown.Item onClick={this.setValue} >Red</Dropdown.Item>
                    <Dropdown.Item onClick={this.setValue} >Orange</Dropdown.Item>
                    <Dropdown.Item  onClick={this.setValue} >Yellow</Dropdown.Item>
                    <Dropdown.Item eventKey="Green" onClick={this.setValue} >Green</Dropdown.Item>
                    <Dropdown.Item eventKey="Blue" onClick={this.setValue} >Blue</Dropdown.Item>
                    <Dropdown.Item eventKey="Indigo" onClick={this.setValue} >Pink</Dropdown.Item>
                    <Dropdown.Item eventKey="Violet" onClick={this.setValue} >Violet</Dropdown.Item>
                    <Dropdown.Item eventKey="White" onClick={this.setValue} >White</Dropdown.Item>
                    <Dropdown.Item eventKey="Black" onClick={this.setValue} >Black</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Sort by Price" id="bg-vertical-dropdown-2" variant = ""  onClick ={e => this.setValue(e)} >
                    <Dropdown.Item eventKey="ASC">Low to High</Dropdown.Item>
                    <Dropdown.Item eventKey="DESC">High to Low</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Sort by Category" id="bg-vertical-dropdown-3" variant = ""  onSelect={this.setValue} >
                    <Dropdown.Item eventKey="Dress">Dress</Dropdown.Item>
                    <Dropdown.Item eventKey="Skirt">Skirt</Dropdown.Item>
                    <Dropdown.Item eventKey="Pant">Pant</Dropdown.Item>
                    <Dropdown.Item eventKey="Shirt">Shirt</Dropdown.Item>
                </DropdownButton>
                <Button variant="info" type="submit">Sort</Button>
                </ButtonGroup>
                <Container>
                    <Row>
                        {itemsToDisplay == null ? <Col> </Col> : itemsToDisplay.map(this.displayItems)}
                    </Row>
                </Container>
            </div>
        )
    }
}
