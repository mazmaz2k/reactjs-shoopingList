import React from "react";
import ShoppingList from "./ShoppingList"


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

export default class Home extends React.Component {



    constructor(props){
        super(props);
        this.products = getProducts();
        // console.log(this.products);
        this.state = {
            data: this.products,
        }
    }
    render() {
        // console.log(this.state.data);
        return (
            <div>
                <ShoppingList pruductArray={this.state.data}/>
            </div>
        );
    }
}