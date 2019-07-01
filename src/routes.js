import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

//Components
import App from './components/App';
import About from './components/About';
import Home from './components/Home';
import Page404 from './components/Page404';
import GridPosts from './components/Post/GridPosts'

import CreatePost from './containers/CreatePost';
import LoginForm from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PostSingle from './components/Post/PostSingle';

class AppRoutes extends Component {
        constructor(props){
            super(props);                     
        }       
        render() {
                return (
                        <App>
                                <Switch>
                                        <Route path="/login" exact component={LoginForm} />                                       
                                        <Route path="/" exact component={Home} />                                       
                                        <ProtectedRoute path="/write" exact loggedIn={this.props.loggedIn} component={CreatePost} />
                                        <ProtectedRoute path="/admin" exact loggedIn={this.props.loggedIn} component={GridPosts} />  
                                        <Route path ="/:Id" exact component= {PostSingle}/>                                     
                                        <ProtectedRoute path="/about" exact loggedIn={this.props.loggedIn} component={About} />
                                        <Route component={Page404} />
                                </Switch>
                        </App>
                )
        }
}

const mapStateToProps = (state) =>{      
        return{
        loggedIn: state.loginData.isLoginSuccess  
        }
}

export default connect(mapStateToProps)(AppRoutes);