import React, { Component } from 'react';

export default class ErrorAlert extends Component {

    constructor(){
      super();

      this.state = {
        message:'Error!'
      }
    }
    render() {
        return (
           <div>
              <div className="alert alert-danger" role="alert">
                 {this.props.message}
              </div>
           </div>
           );
    }
}
