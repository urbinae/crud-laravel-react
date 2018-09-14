import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Listing extends Component {
    
    constructor(){
    	super();
    	this.state={
    		categories: [],
    		activePage: 3,
    		itemsCountPerPage:1,
		    totalItemsCount:1,
		    pageRangeDisplayed:3,
		    alert_message: ''
    	}
    	this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(){
    	axios.get('/api/categories')
    		.then(resp => {
    		this.setState({
    				activePage: resp.data.current_page,
    				categories: resp.data.data,
    				itemsCountPerPage: resp.data.per_page,
    				totalItemsCount: resp.data.total
    			});
    	});
    }

    onDelete(category_id){
    	axios.delete('/api/categories/'+category_id).then(resp => {
    		let categories = this.state.categories;
    		for (var i = 0; i < categories.length; i++) {
    			if(categories[i].id == category_id){
    				categories.splice(i, 1);
    				this.setState({categories:categories});
    			}
    		}
    		this.setState({alert_message: "success"})
    	}).catch(error => {
    	 	this.setState({alert_message: "error"})
    	});
    
    }

    handlePageChange(pageNumber) {
	    console.log(`active page is ${pageNumber}`);
	    //first_page_url": "http://localhost:8000/categories?page=1",
	    axios.get('/api/categories?page='+pageNumber)
	    	.then(resp => {
    			this.setState({
    				activePage: pageNumber,
    				categories: resp.data.data,
    				itemsCountPerPage: resp.data.per_page,
    				totalItemsCount: resp.data.total
    			});
    		
    	});
	    
	 }

    render() {    	    	
        return (
            <div>
            	<hr />
            	{this.state.alert_message == 'success' ? <SuccessAlert message={'Eliminado con éxito'}/> : null}
            	{this.state.alert_message == 'error' ? <ErrorAlert message={'Eliminado con éxito'}/> : null}
                <table className="table">
				  <thead>
				    <tr>
				      <th scope="col">#</th>
				      <th scope="col">Category Name</th>
				      <th scope="col">Status</th>
				      <th scope="col">Created At</th>
				      <th scope="col">Updated At</th>
				      <th scope="col">Acción</th>
				    </tr>
				  </thead>
				  <tbody>
				  {
				  	this.state.categories.map(category => {
				  		return (
						    <tr key={category.id}>
						      <td scope="row">{category.id}</td>
						      <td>{category.name}</td>
						      <td>{category.active==1?('Activa'):('Inactiva')}</td>
						      <td>{category.created_at}</td>
						      <td>{category.updated_at}</td>
						      <td>
						      	<a href="#" 
						      		onClick={this.onDelete.bind(this, category.id)}>Delete</a> |
						      	<Link to={`/categories/edit/${category.id}`}>Editar</Link>
						      </td>
						    </tr>
						)
					})
				   } 
				  </tbody>
				</table>

				<div className="d-flex justify-content-center">
					<Pagination
			          activePage={this.state.activePage}
			          itemsCountPerPage={this.state.itemsCountPerPage}
			          totalItemsCount={this.state.totalItemsCount}
			          pageRangeDisplayed={this.state.pageRangeDisplayed}
			          onChange={this.handlePageChange}
			          item-class="page-item"
			          link-class="page-link"
			        />
			    </div>
            </div>
        );
    }
}
