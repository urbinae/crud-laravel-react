import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
import Edit from './Edit';

export default class Index extends Component {
    render() {
        return (
           <div>
               <Link to="/categories" className="btn btn-primary"> Listar</Link>
               <Link to="/categories/add" className="btn btn-primary">Agregar</Link>

               <Route exact path="/categories" component={Listing}></Route>
               <Route exact path="/categories/add" component={Add}></Route>
               <Route exact path="/categories/edit/:id" component={Edit}></Route>
           </div>
           );
    }
}
