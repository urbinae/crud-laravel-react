import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Edit extends Component {

	constructor(props){
    	super(props);
    	this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    	this.onSubmit = this.onSubmit.bind(this);
    	this.state = {
    		category_name: '',
    		alert_message: ''
    	}
    }

    componentDidMount(){
    	axios.get('/api/categories/'+this.props.match.params.id+'/edit')
    	.then(response => {
    		this.setState({category_name:response.data.name});
    	});
    }

	onSubmit(event){
    	event.preventDefault();
    	const category = {
    		category_name: this.state.category_name
    	}
    	axios.put('/api/categories/'+this.props.match.params.id, category)
    		 .then(resp => {
    		 	this.setState({alert_message: "success"})
    		 }).catch(error => {
    		 	this.setState({alert_message: "error"})
    		 });
    }

    onChangeCategoryName(event){
    	this.setState({category_name: event.target.value});
    }

    render() {
        return (
            <div>
            	<hr />
            	{this.state.alert_message == 'success' ? <SuccessAlert message={'Modificado con éxito'}/> : null}
            	{this.state.alert_message == 'error' ? <ErrorAlert message={'Modificado con éxito'}/> : null}
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
