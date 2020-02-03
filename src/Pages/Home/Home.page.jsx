import React from 'react';
import ItemDisplayContainer from '../../Components/ItemDisplayContainer/itemDisplayContainer.component';

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
            localStorage.setItem('items', JSON.stringify(result.items));
        },
        (err) => {
            console.log(err)
        })
    }

    render() {

        return(
            <div>
               <ItemDisplayContainer />
            </div>
        )
    }
}