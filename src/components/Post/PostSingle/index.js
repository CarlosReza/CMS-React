import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getPostById} from '../../../actions/index.js'
import  '../../../styles/post.css';

class PostSingle extends Component{
    constructor(props){
        super(props);
        this.state ={
            post:{}
        }
    }
    
    componentWillMount() {
       const { match: { params } } = this.props;     
       this.props.GetPostById(params.Id);
       
      }

      render(){       
        if(this.props.post === undefined) {
            return (
              <div>
                No Post
              </div>
            )
          }
        return (
            
            <div>
              <h1 className='title-post'><span >{this.props.post.Title}</span></h1>
              <p className='content-text' dangerouslySetInnerHTML={{__html: this.props.post.Body}}/>     
            </div>
          );
      }
}

const mapStateToProps = state => {   
    return {
      post: state.postsData.PostSingle
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      GetPostById: id => {
        dispatch(getPostById(id));
      }       
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)( PostSingle);



