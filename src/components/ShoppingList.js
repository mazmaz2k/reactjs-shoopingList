import React from "react";
import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';
import {MyCustomBody} from './MyCustomBody'

// function onAfterSaveCell(row, cellName, cellValue) {
//     // alert(`Save cell ${cellName} with value ${cellValue}`);
//     if (cellName ==='number_of_units' ){
//         row.total_price = cellValue * row.price;
//         console.log(row);
//     }else if (cellName ==='price') {
//         row.total_price = cellValue * row.number_of_units;
//     }
//     // let rowStr = '';
//     // for (const prop in row) {
//     //   rowStr += prop + ': ' + row[prop] + '\n';
//     // }
  
//     // alert('Thw whole row :\n' + rowStr);
//     const oldPruducts = this.state.products;
//     oldPruducts.push(row);
//     this.setState({
//         products: oldPruducts
//     });
// }
  
//   function onBeforeSaveCell(row, cellName, cellValue) {
//     // You can do any validation on here for editing value,
//     // return false for reject the editing
//     console.log("tt444444ttt", row);

//     if(row.name===''){
//         return false;
//     }
//     console.log("tt444444ttt", row);
//     return true;
// }

export default class ShoppingList extends React.Component {

    constructor(props){
        super(props);
        // console.log(this.props);
        this.state ={
            products: this.props.pruductArray,
        };
        // this.onAddRow = this.onAddRow.bind(this);
        this.onDeleteRow = this.onDeleteRow.bind(this);
        this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
        this.onBeforeSaveCell = this.onBeforeSaveCell.bind(this);
        this.addItem = this.addItem.bind(this);

    }
    addItem(row){
        const oldPruducts = this.state.products;
        oldPruducts.push(row);
        this.setState({
            products: oldPruducts
        });
    }

    onBeforeSaveCell(row, cellName, cellValue) {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        console.log("tt444444ttt", row);
    
        if(cellValue===''||cellName==='total_price'){
            // console.log("oowjwjdjddndjdjdjddk");
            return false;
        }else if(cellName==='number_of_units' && isNaN(cellValue)){
            return false;    
        }else if(cellName==='price' && isNaN(cellValue)){
            return false;
        }
        // if(cellName==='total_price'){
        //     return false;
        // }
        // console.log("tt444444ttt", row);
        return true;
    }

    onAfterSaveCell(row, cellName, cellValue) {
        // alert(`Save cell ${cellName} with value ${cellValue}`);
        if (cellName ==='number_of_units' ){
            row.total_price = parseInt(parseInt(cellValue,10) * parseInt(row.price,10), 10);
        }else if (cellName ==='price') {
            row.total_price = parseInt(parseInt(cellValue, 10) * parseInt(row.number_of_units,10), 10);
        }
        // let rowStr = '';
        // for (const prop in row) {
        //   rowStr += prop + ': ' + row[prop] + '\n';
        // }
      
        // alert('Thw whole row :\n' + rowStr);        
        const oldPruducts = this.state.products;
        if( cellName ==='price'){
            row.price=parseInt(cellValue, 10);
        }else if(cellName ==='number_of_units' ){
            row.number_of_units=parseInt(cellValue, 10);
            console.log(row.number_of_units);
        }
        this.setState({
            products: oldPruducts
        });
    }

    handleDeleteButtonClick = (onClick,row) => {
        // let {products} = this.state;
        // console.log("ooiiikuku", row);
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        // console.log('This is my custom function for DeleteButton click event');
        onClick();
      }
    createCustomDeleteButton = (onClick) => {
        // console.log("delete",this.state.products,onClick)
        return (
          <DeleteButton
            btnText='Delete pruduct'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleDeleteButtonClick(onClick) }/>
        );
      }
    // onAddRow(row){
    //      //row.id = this.state.products.length;
    //     const oldPruducts = this.state.products;
    //     oldPruducts.push(row);
    //     this.setState({
    //         products: oldPruducts
    //     });
    //     console.log(row);

    // }
    onDeleteRow(rows){
        const newPruducts =[];
        this.state.products.forEach((prudact,i) => {
            if(!( rows.includes(prudact.id))){
                newPruducts.push(prudact);
            } 
        });
  
        // console.log("newPruducts",newPruducts);
        this.setState({
            products: newPruducts
        });

    }
    
    handleInsertedRow(row) {
        if(row.name===''||row.number_of_units===''||row.price===''){
            return ;
        }
        // console.log(row);
        // this.setState ={
        //     products
        // }
      }
    createCustomModalBody = (columns, validateState, ignoreEditable) => {
        return (
          <MyCustomBody columns={ columns }
            validateState={ validateState }
            ignoreEditable={ ignoreEditable }
            addItem={this.addItem}/>
        );
    }
    render() {
        const products = this.state.products;
        // console.log("products: ",products);
        const selectRow = {
            mode: 'checkbox'
          };
        const cellEditProp = {
            mode: 'click',
            beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
            afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
          };
        const options = {
            // onAddRow: this.onAddRow,
            onDeleteRow: this.onDeleteRow,
            insertModalBody: this.createCustomModalBody,
            deleteBtn: this.createCustomDeleteButton,
            afterInsertRow: this.handleInsertedRow, 
          };
        return (
            <BootstrapTable data={products} cellEdit={cellEditProp} deleteRow selectRow={selectRow} insertRow  options={ options } search>
                <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name' >Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='number_of_units'>Number Of Units</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Single Product Price</TableHeaderColumn>
                <TableHeaderColumn dataField='total_price'>Total Product Price</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}