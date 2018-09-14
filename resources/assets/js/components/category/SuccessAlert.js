import React, { Component } from 'react';

export default class SuccessAlert extends Component {

    constructor(){
      super();

      this.state = {
        message:'Exito!'
      }
    }
    render() {
        return (
           <div>
              <div className="alert alert-success" role="alert">
                 {this.props.message}
              </div>
           </div>
           );
    }
}
