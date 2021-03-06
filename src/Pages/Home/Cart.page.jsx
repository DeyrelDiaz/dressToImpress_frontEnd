import React from 'react';
import CartDisplayContainer from '../../Components/CartDisplayContainer/CartDisplayContainer.component';
import { Navbar, Nav, Button } from 'react-bootstrap';



export default class CartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartitems: []
        }
    }

    componentDidMount() {
        
        const params = {
            username:  JSON.parse(localStorage.getItem('user'))
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

        console.log('localStorage :', localStorage);

    }

    onSubmit(event) {

        // if(this.state.cartitems.length == 0)
        // {
        //     alert('Your cart is empty! Please put items in your cart before proceeding to buy anything.')
        //     return;
        // }
        event.preventDefault();
        const newOrder = {
            date: new Date(),
            username:  JSON.parse(localStorage.getItem('user'))
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
                    alert('You successfully bought all items! Enjoy your new purchase!')
                    window.location.reload();
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
        clearStorage(event)
        {
            console.log('localStorage.user :', localStorage.user);
            localStorage.removeItem('user')
            console.log('localStorage.user :', localStorage.user);
    
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
                        <Button href="/" onClick={this.clearStorage} variant='info'>Logout</Button>

                    </Nav>
                </Navbar>
                <Button value={this.props.id} variant='info' type='submit' style={{ marginTop: '1rem', marginBottom : '1rem' }} onClick = {this.onSubmit}>Buy All Items</Button>
                <CartDisplayContainer cartitems={this.state.cartitems}/>
            </div>
        )
    }
}