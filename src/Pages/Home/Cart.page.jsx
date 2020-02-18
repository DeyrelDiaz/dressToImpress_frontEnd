import React from 'react';
import CartDisplayContainer from '../../Components/CartDisplayContainer/CartDisplayContainer.component';
import { Navbar, Nav } from 'react-bootstrap';

export default class CartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartitems: []
        }
    }

    componentDidMount() {
        const params = {
            username: 'tester'
        }

        const url = '/api/cart';
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
            if (result.success) {
                this.setState({
                    cartitems: result.items
                })
            }
        },
        (err) => {
            console.log(err)
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

                    </Nav>
                </Navbar>
                <CartDisplayContainer cartitems={this.state.cartitems}/>
            </div>
        )
    }
}