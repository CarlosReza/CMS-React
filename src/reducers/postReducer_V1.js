const PostReducerV1 = (state = [], action) => {
    console.log({state}, {action})
    switch(action.type) {
        case 'ADD_POST':
          return state.concat([action.data]);
        case 'DELETE_POST':
          return state.filter((post)=>post.id !== action.id);
        case 'EDIT_POST':
          return state.map((post)=>post.id === action.id ? {...post, editing: !post.editing} : post)  
        case 'UPDATE':
          return state.map((post)=>{
            if(post.id === action.id) {
              return {
                 ...post,
                 title:action.data.newTitle,
                 message:action.data.newMessage,
                 editing: !post.editing
              }
            } else return post;
          })
        case 'GET_POSTS':
          console.log("Enter to Reducer")
          fetch('http://localhost:8081/api/demo/1',{mode:'cors'})
      .then((response) => {
        return response.json()
      })
      .then((responsePosts) => {
         console.log({responsePosts})        
         responsePosts.forEach(post =>{
            let data = {
                name:post.Name,
                author: post.Author
            }
            state.push(data)
        })         
        console.log({state})
        return state;
       
      })
        default:
          return state;
      }
}
export default PostReducerV1;