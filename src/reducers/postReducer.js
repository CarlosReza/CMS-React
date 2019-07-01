import { ADD_POST, DELETE_POST, FETCH_POST, UPDATE_POST, INI_UPDATE_POST, GET_POST_BY_ID } from '../actions/types';

export default function postReducer(state = [], action) {
  switch (action.type) {
    case ADD_POST:    
      return Object.assign({},state, {posts: [...state.posts, action.payload]});
    case DELETE_POST:
      return Object.assign({},state,{posts:state.posts.filter(post => post.Id !== action.payload.id)}); 
    case FETCH_POST:
      return Object.assign({}, state, {
        posts: action.posts
      });
    case INI_UPDATE_POST:   
      return Object.assign({}, state, {
        posts: state.posts.map((post) => post.Id === action.payload.id ? { ...post, Editing: !post.Editing } : post)
      });
    case UPDATE_POST:
      return Object.assign({},state,{
        posts: state.posts.map((post) => {
        if (post.Id === action.payload.Id) {
          return {
            ...post,
            Title: action.payload.Title,
            Body: action.payload.Body,
            Cover: action.payload.Cover,
            Editing: false,
            Description: action.payload.Description
          }
        } else return post;
      })
    })
    case GET_POST_BY_ID:    
      return Object.assign({}, state, {
        PostSingle: action.post
      });
    default:
      return state;
  }
}