import React from 'react';
import ItemDisplayContainer from '../../Components/ItemDisplayContainer/itemDisplayContainer.component';
import { Navbar, Nav , Button} from 'react-bootstrap';


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch('/api/items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
        .then((result) => {
            if (result.success == true) {
                localStorage.setItem('items', JSON.stringify(result.items));
            }
        },
        (err) => {
            console.log(err)
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
                <ItemDisplayContainer/>
                
            </div>
        )
    }
}