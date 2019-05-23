import React from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import CardView from '../components/Post/CardView.js';
import { deletePost, initUpdatePost } from '../actions';
import EditPostComponent from '../components/Post/Edit/EditPostComponent';
import { CardColumns } from 'react-bootstrap';

function PostList({ posts = [], onDelete,onInitUpdate }) {

  if(!posts.length) {
    return (
      <div>
        No Posts
      </div>
    )
  }
  return (   
    <CardColumns>
      {posts.map(post =>               
                post.Editing 
                ? <EditPostComponent post={post} key={post.Id}/>
                : <CardView post={ post } onDelete={ onDelete } onInitUpdate={onInitUpdate} key={post.Id }  />
      )}
    </CardColumns>
  );
}

const mapStateToProps = state => {
  console.log("ARTICULOS")
  console.log(state.postsData)
  return {
    posts: state.postsData.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deletePost(id));
    },
    onInitUpdate: id => {
        dispatch(initUpdatePost(id));
    }
     
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);