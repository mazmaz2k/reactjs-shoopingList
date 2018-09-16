import React, { Component } from 'react';

export class MyCustomBody extends Component {

    getFieldValue() {
      const newRow = {};
      const min = 1;
      const max = 100000;

      this.props.columns.forEach((column, i) => {
        
        if(column.name==="Product ID"){
            // console.log("ggggggg",this.props.columns.length);
            newRow[column.field] =Math.floor( min + Math.random() * (max - min));
        }
        else if(column.name==="Total Product Price"){
            newRow[column.field] = this.refs['price'].value *this.refs['number_of_units'].value ;
        }else{
            newRow[column.field] = this.refs[column.field].value;

        }
      }, this);
      if(newRow.name===''||newRow.number_of_units===''||newRow.price==='' || isNaN(newRow.price)||isNaN(newRow.number_of_units)){
            return null ;
        }
        this.props.addItem(newRow);
      return newRow;
    }
  
    render() {
      const { columns, validateState } = this.props;
      return (
        <div className='modal-body'>
          {/* <h2 style={ { color: 'red' } }>Custom body</h2> */}
          <div>
            {
              this.props.columns.map((column, i) => {
                // console.log(column);
                if(column.name==="Total Product Price" || column.name==="Product ID" ){
                    return null;
                }
                const {
                //   editable ,
                //   format,
                  field,
                  name,
                  hiddenOnInsert
                } = column;
  
  

                if (hiddenOnInsert) {
                    console.log("hiddenOnInsert");

                  // when you want same auto generate value
                  // and not allow edit, for example ID field

                  return null;
                }
                const error = validateState[field] ?
                  (<span className='help-block bg-danger'>{ validateState[field] }</span>) :
                  null;
                return (
                  <div className='form-group' key={ field }>
                    <label style={{"padding": '5px'}}> { name }:    </label>
                    <input ref={ field } type='text' defaultValue={ '' } />
                    { error }
                  </div>
                );
              })
            }
          </div>
        </div>
      );
    }
  }