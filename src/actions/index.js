import { ADD_POST, DELETE_POST, FETCH_POST, UPDATE_POST,INI_UPDATE_POST, GET_POST_BY_ID } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:14918/api/posts';
const axiosConfig ={
  'Access-Control-Allow-Methods': 'POST, GET,PUT, OPTIONS',
  'Access-Control-Allow-Origin' : '*'
}  

// CREAR POST
export const createPost = ({ Title, Body,Cover , Description}) => { 
  return (dispatch) => {   
    return axios.post(`${apiUrl}/addpost`,{Title, Body,Cover,Description},axiosConfig)
      .then(response => {
        dispatch(createPostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createPostSuccess =  (data) => {
  console.log({data})
  return {
    type: ADD_POST,
    payload: {
      Id: data.Id,
      Title: data.Title,
      Body: data.Body,
      Cover:data.Cover,
      Editing:false,
      Author:"",
      Description: data.Description,
      CreateDate: data.CreateDate
    }
  }
};

// BORRAR POST
export const deletePost = id => {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/${id}`,axiosConfig)
      .then(response => {
        dispatch(deletePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  }
}

// OBTENER TODOS LOS POSTS
export const fetchAllPosts = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/Get`)
      .then(response => {
        dispatch(fetchPosts(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POST,
    posts
  }
};

//ACTUALIZAR POST
export const updatePost = (id, data) =>{
  console.log({id});
  console.log({data});
  return(dispatch)=>{
    return axios.post(`${apiUrl}/editpost`,{Id:id, Title:data.Title, Body:data.Body,Cover:data.Cover,Description:data.Description}, axiosConfig)
    .then(response =>{
      dispatch(updatePostSuccess(response.data))
    })
    .catch(error => {
      throw(error);
    });
  };
};

export const updatePostSuccess = (data) =>{
  return{
    type: UPDATE_POST,
    payload: {
      Id: data.Id,
      Title: data.Title,
      Body: data.Body,
      Cover:data.Cover,
      Description: data.Description
    }
  }
};

export const initUpdatePost =(id)=>{
  return {
    
      type: INI_UPDATE_POST,
      payload: {
        id: id,        
      }    
  }
}

//Obtener POST por Id
export const getPostById = id =>{ 
  console.log("Entre aqui con el ID: " + id)
  return(dispatch)=>{
    return axios.get(`${apiUrl}/GetPostById/?Id=${id}`,axiosConfig)
    .then(response =>{
      dispatch(getPostSuccess(response.data))
    })
    .catch(error => {
      throw(error);
    });
  };
};

export const getPostSuccess = (post) =>{
  return{
    type: GET_POST_BY_ID,
    post
  }
};
