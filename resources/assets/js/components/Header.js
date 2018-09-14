import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Category from './category/Index';
import Error404 from './Error404';

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/categories">Categories</Link>
                            </li>
                        </ul>
                    </div>
                </nav> 
                <div className = "row">
                    <div className = "col-md-12">
                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            <Route exact path="/about" component={About}></Route>
                            <Route exact path="/categories" component={Category}></Route>
                            <Route exact path="/categories/add" component={Category}></Route>
                            <Route exact path="/categories/edit/:id" component={Category}></Route>
                            <Route exact path="/*" component={Error404}></Route>
                        </Switch>
                    </div>
                </div>
            </div>
            );
    }
}
