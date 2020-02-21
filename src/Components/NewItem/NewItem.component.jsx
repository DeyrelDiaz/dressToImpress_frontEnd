import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';


export default class NewItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            Color: '',
            ItemType: '',
            Name: '',
            Cost: '',
            Description: '',
            Display: ''
            };

        this.setValue = this.setValue.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
    }

    setValue(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleFiles(files) {
        var reader = new FileReader();
        reader.onload = function(e) 
        {
            var str = reader.result
            var bool = true;
            while(str.length != 0)
            {
                str = str.replace("\n", ",")

                var color = str.substring(0, str.indexOf(','))
                str = str.substring(str.indexOf(',')+1)
                // this.setState({Color: color})

                var type = str.substring(0, str.indexOf(','))
                str = str.substring(str.indexOf(',')+1)


                var name = str.substring(0, str.indexOf(','))
                str = str.substring(str.indexOf(',') +1)


                var price = str.substring(0, str.indexOf(','))
                str = str.substring(str.indexOf(',')+1)


                var description = str.substring(0, str.indexOf(','))
                str = str.substring(str.indexOf(',') +1)

                var link = str.substring(0, str.indexOf(','))
                str = str.substring(str.indexOf(',')+1)

                const newItem = {
                    Color: color,
                    ItemType: type,
                    Name: name,
                    Cost: price,
                    Description: description,
                    Display: link
                }
                console.log(newItem);
                fetch('/api/item', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newItem)
                }).then((res) => res.json())
                    .then((result) => {
                        console.log(result);
                        if (result.success == true) {
                            bool = true;

                        }
                        else {
                            bool = false;
                        }
                    })

            }
            if(bool)
            {
                alert('Items Added')
            }
            else
            {
                alert('There was an error when adding the items.')
            }

        }
        reader.readAsText(files[0]);
    }

    addItem(event) {
        console.log("on submit works")
        event.preventDefault();
        const newItem = {
            Color: this.state.Color,
            ItemType: this.state.ItemType,
            Name: this.state.Name,
            Cost: this.state.Cost,
            Description: this.state.Description,
            Display: this.state.Display
                }
        console.log(newItem);
        fetch('/api/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    alert('Item Added')
                  //  this.props.history.push('/home');
                }
                else if(result.number == 1)
                {
                    alert('Item was not added. No special characters are allowed.')
                }
                else if(result.number == 2)
                {
                    alert('Item was not added. We do not support those colors or item types. Colors we support are: red, orange, yellow, green, blue, violet, pink, white, black. The item types we support are: dress, skirt, pants, shirt.')
                }
            })
        }

        changeDB(event) {
            fetch('/api/changedb', {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.success == true) {
                        alert('DB Changed')
                    }
                    else (result.number == 1)
                    {
                        alert('DB not changed')
                    }
                })
            }

    render() {
        return(
            <div>
                <Navbar bg="info" variant="dark">
                    <Navbar.Brand>Dress To Impress</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/newItem">Add Item</Nav.Link>
                        <Nav.Link href="/cart">Cart</Nav.Link>
                        <Nav.Link href="/user/profile">User Profile</Nav.Link>
                    </Nav>
                </Navbar>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="Color">
                            <Form.Label>Color:</Form.Label>
                            <Form.Control name="Color" onChange={this.setValue} type="text" placeholder="ex. Pink, Blue, White, etc." />
                        </Form.Group>
                        <Form.Group controlId="ItemType">
                            <Form.Label>Item Type:</Form.Label>
                            <Form.Control name="ItemType" onChange={this.setValue} type="text" placeholder="ex. Pants, Shirt, Skirt, etc." />
                        </Form.Group>
                        <Form.Group controlId="Name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control name="Name" onChange={this.setValue} type="text" placeholder="ex. Red Shirt"/>
                        </Form.Group>
                        <Form.Group controlId="Cost">
                            <Form.Label>Cost:</Form.Label>
                            <Form.Control name="Cost" onChange={this.setValue} type="number" placeholder="$$$" placeholder="ex. 5.50"/>
                        </Form.Group>
                        <Form.Group controlId="Description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control name="Description" onChange={this.setValue} type="text" placeholder="ex. A soft red shirt from American Eagle."/>
                        </Form.Group>
                        <Form.Group controlId="Display">
                            <Form.Label>Image To Display:</Form.Label>
                            <Form.Control name="Display" onChange={this.setValue} type="text"  placeholder="Please enter URL or path"/>
                        </Form.Group>
                        <Button variant="info" onClick = {this.addItem} >Add Item</Button>
                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                            <Button variant="info" style={{ marginTop: '.5rem' }} onClick = {this.importItems}>Import</Button>
                        </ReactFileReader>
                        <Button variant="info" style={{ marginTop: '.5rem' }} onClick = {this.changeDB} >Change DB</Button>

                    </Form>
                </Container>
            </div>
        )
    }
}