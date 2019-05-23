import React, { Component } from 'react';
//import AllPost from '../AllPost';
//import CreatePost from '../../containers/CreatePost';
import PostList from '../../containers/PostList';
import Carrousel from '../../components/Global/Carrousel';

class Home extends Component {
    render() {
        return (
            <div>  
                 <Carrousel/>           
                 <PostList />
            </div>
        )
    }

}

export default Home;