import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePost,initUpdatePost } from '../../../actions';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {stateFromHTML} from 'draft-js-import-html';
import { stateToMarkdown } from "draft-js-export-markdown";
import {stateToHTML} from 'draft-js-export-html';

class EditPostComponent extends Component {
constructor(props){
  super(props);
  let contentState = stateFromHTML(props.post.Body);

  this.state= {
    editorState: EditorState.createWithContent(contentState),
    Body:''
  }
}

//Click en Actualizar
  handleEdit = (e) => {
    e.preventDefault();
    console.log("ANTES EDIT")
    console.log(this.state)
    const newTitle = this.getTitle.value;
    const newMessage = stateToHTML(
      this.state.editorState.getCurrentContent()
    )
    const data = {
      Title: newTitle,
      Body: newMessage
    }
    console.log({ data })
    this.props.dispatch(updatePost(this.props.post.Id, data))
  }
//Click en Cancelar
  handleCancel =(e)=>{
e.preventDefault();
     this.props.dispatch(initUpdatePost(this.props.post.Id))
  }

  onEditorStateChange = (editorState) => {
    console.log("Cambio en Content")
    console.log(stateToMarkdown(
      this.state.editorState.getCurrentContent()
    ));
    this.setState({
      editorState,
       Body: stateToHTML(
        this.state.editorState.getCurrentContent()
      )
    });
  };

  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

//Renderiza la vista
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <br/><br/>
        <form onSubmit={this.handleEdit}>
          <div className='form-group'>
            <input className='form-control' required type="text" ref={(input) => this.getTitle = input}
              defaultValue={this.props.post.Title} placeholder="Enter Post Title" />
          </div>
          <div className='form-group'>
            {/* <textarea className='form-control' required rows="5" ref={(input) => this.getMessage = input}
              defaultValue={this.props.post.Body} cols="28" placeholder="Enter Post" /> */}
              <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}           
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false } }            
            }}
          />
          </div>
          
          <button type='submit' className='btn btn-info'>
            Actualizar
           </button>
           <button type='button' className='btn btn-danger' onClick={this.handleCancel}>
            Cancelar
           </button>
        </form>
      </div>
    );
  }
}
export default connect()(EditPostComponent);