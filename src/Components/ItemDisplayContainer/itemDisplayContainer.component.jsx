import React from 'react';
import ItemDisplay from '../ItemDisplay/itemDisplay.component';
import { Container, Row, Col, Button, ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';

export default class ItemDisplayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Color: '',
            Price: '',
            Type: ''
        };    
    
        this.displayItems = this.displayItems.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setColorValue = this.setColorValue.bind(this);
        this.setTypeValue = this.setTypeValue.bind(this);
        this.setPriceValue = this.setPriceValue.bind(this);
    }

    displayItems(item) {
        console.log('items being mapped', item);

        return (
            <Col>
                <ItemDisplay id={item.ID} title={item.Name} text={item.Description} imgUrl={item.Display} cost={item.Cost} />
            </Col>
        )    }

    setColorValue = event => {
        this.setState({Color : event.target.innerText});
        console.log('this.state :', this.state);
    }

    setTypeValue = event => {
        this.setState({Type : event.target.innerText});
        console.log('this.state :', this.state);
    }

    setPriceValue = event => {
        this.setState({Price : event.target.innerText});
        console.log('this.state :', this.state);
    }

    onSubmit(event) {
        console.log("on submit works")
        event.preventDefault();

        const params = {
            Color: this.state.Color,
            Price: this.state.Price,
            Type: this.state.Type
        }

        const url = '/api/item/sorted';
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');

        var request = new Request(url + "?" + query, {
            method: 'GET'
        })

        fetch(request, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
        .then((result) => {
            console.log('res in sorted', result);
            if (result.success == true)
            {
                localStorage.removeItem('items');
                localStorage.setItem('items', JSON.stringify(result.items));
                window.location.reload();
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
                    <Dropdown.Item eventKey="Red" onClick={this.setColorValue} >Red</Dropdown.Item>
                    <Dropdown.Item eventKey="Orange" onClick={this.setColorValue} >Orange</Dropdown.Item>
                    <Dropdown.Item eventKey="Yellow" onClick={this.setColorValue} >Yellow</Dropdown.Item>
                    <Dropdown.Item eventKey="Green" onClick={this.setColorValue} >Green</Dropdown.Item>
                    <Dropdown.Item eventKey="Blue" onClick={this.setColorValue} >Blue</Dropdown.Item>
                    <Dropdown.Item eventKey="Pink" onClick={this.setColorValue} >Pink</Dropdown.Item>
                    <Dropdown.Item eventKey="Violet" onClick={this.setColorValue} >Violet</Dropdown.Item>
                    <Dropdown.Item eventKey="White" onClick={this.setColorValue} >White</Dropdown.Item>
                    <Dropdown.Item eventKey="Black" onClick={this.setColorValue} >Black</Dropdown.Item>
                </DropdownButton>
                {/* <DropdownButton as={ButtonGroup} title="Sort by Price" id="bg-vertical-dropdown-2" variant = "" >
                    <Dropdown.Item eventKey="ASC" onClick={this.setPriceValue}>Low to High</Dropdown.Item>
                    <Dropdown.Item eventKey="DESC" onClick={this.setPriceValue}>High to Low</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Sort by Type" id="bg-vertical-dropdown-3" variant = "" >
                    <Dropdown.Item eventKey="Dress" onClick={this.setTypeValue}>Dress</Dropdown.Item>
                    <Dropdown.Item eventKey="Skirt" onClick={this.setTypeValue}>Skirt</Dropdown.Item>
                    <Dropdown.Item eventKey="Pant" onClick={this.setTypeValue}>Pant</Dropdown.Item>
                    <Dropdown.Item eventKey="Shirt" onClick={this.setTypeValue}>Shirt</Dropdown.Item>
                </DropdownButton> */}
                <Button variant="info" type="button" onClick={this.onSubmit}>Sort!</Button>
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
