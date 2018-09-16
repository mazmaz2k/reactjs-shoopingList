import React from "react";
import { Button } from 'reactstrap';


export default class AddItem extends React.Component {

    // constructor(){
    //     super();
    // }



    render() {

        return (
            <Button color="danger" onClick={() => this.props} style={{ top: '20px', right: '20px', width: '500px', marginBottom: "10px" }}>Add Item</Button>
        );
    }
}