import React, { Component } from 'react';
import {connect} from 'react-redux';
import Post from '..';
import EditPostComponent from '../EditPostComponent';
import DataTable from 'react-data-table-component';

class AllPost extends Component {
  constructor(props){
      super(props)
      this.state= {
          posts : []
      }
  }  
  render() {

    return (
    <div>
      <h1>All Posts</h1>
      {this.props.posts.map((post) => 
      post.editing ? <EditPostComponent post={post} key={post.id}/> : 
      <Post key={post.id} post={post} />)}
    </div>


    );
   }

}
const mapStateToProps = (state) =>{
    return{
        posts: state
    }
}



export default connect(mapStateToProps)(AllPost);