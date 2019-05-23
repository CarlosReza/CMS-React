import { connect } from 'react-redux';
import { createPost } from '../actions';
import PostForm from '../components/Post/PostForm';

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => {        
      dispatch(createPost(post));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostForm);