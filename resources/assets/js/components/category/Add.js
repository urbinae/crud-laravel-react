import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import Listing from './Listing';

export default class Add extends Component {

	constructor(props){
    	super(props);
    	this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    	this.onSubmit = this.onSubmit.bind(this);
    	this.state = {
    		category_name: '',
            alert_message: ''
    	}
    }

	onSubmit(event){
    	event.preventDefault();
    	const category_name = {
    		category_name: this.state.category_name
    	}

    	axios.post('/api/categories/', category_name)
    		 .then(resp => {
                this.setState({alert_message: "success"})
             }).catch(error => {
                this.setState({alert_message : "error"})
             });
    }

    onChangeCategoryName(event){
    	this.setState({category_name: event.target.value});
    }

    render() {
        return (
            <div>
                <hr />
                {this.state.alert_message == 'success' ? <SuccessAlert message={'Agregado con éxito'}/> : null}
                {this.state.alert_message == 'error' ? <ErrorAlert message={'Agregado con éxito'}/> : null}
                <form onSubmit={this.onSubmit}>
				  <div className="form-group">
				    <input type="text" 
				    	className="form-control" 
				    	value={this.state.category_name} 
				    	onChange={this.onChangeCategoryName} 
				    	placeholder="Nombre de la Categoría" />
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
            </div>
        );
    }
}
