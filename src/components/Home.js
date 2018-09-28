import React, { Component } from 'react';
import fire from './Fire';
import ShoppingList from './ShoppingList';


function getProducts() {
    const products = [];
    const startId = products.length;
    for (let i = 0; i < 12; i++) {
      const id = startId + i;
      const price = Math.floor((Math.random() * 2000) + 1);
      const number_of_units = 1;
      products.push({
        id: id,
        name: 'Item name ' + id,
        price: price,
        number_of_units: 1 ,
        total_price: price*number_of_units

      });
    }
    return products;
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.products = getProducts();
        // console.log(this.products);
        this.state = {
            data: this.products,
        }
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div >
                {/* <h1>Welcome to Home</h1> */}
                <ShoppingList pruductArray={this.state.data}/>
                <button onClick={this.logout}   className="btn btn-primary">Logout</button>
            </div>
        );

    }

}

export default Home;