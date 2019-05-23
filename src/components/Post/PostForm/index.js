import React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToMarkdown } from "draft-js-export-markdown";
import { stateToHTML } from 'draft-js-export-html';
import axios from 'axios';
import dummyImage from '../../Global/images/dummy-post-card.jpg';
import '../../../styles/post.css'

const axiosConfig = {
  'Access-Control-Allow-Methods': 'POST, GET,PUT, OPTIONS',
  'Access-Control-Allow-Origin': '*'
}

class PostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Title: '',
      Body: '',
      editorState: EditorState.createEmpty(),
      uploadStatus: false,
      Cover: dummyImage

    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.Title.trim() && this.state.Body.trim()) {
      this.props.onAddPost(this.state);
      this.handleReset();
    }
  };

  handleUploadCover = e => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    //data.append('filename', this.fileName.value);

    axios.post('http://localhost:14918/api/docfile/Post', data, axiosConfig)
      .then((response) => {
        console.log(response)
        this.setState({ 
          Cover: "http://" + response.data[0], 
          uploadStatus: true 
        })
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleReset = () => {
    this.setState({
      Title: '',
      Body: '',
      editorState: '',
      uploadStatus: false,
      Cover:dummyImage
    });
  };

  onEditorStateChange = (editorState) => {
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

  render() {
    const { editorState } = this.state;   
    return (
      <div>
        <br /><br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              name="Title"
              onChange={this.handleInputChange}
              value={this.state.Title}
            />
          </div>
          <div className="form-group">
            <label>Portada del artículo</label>
            <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" onChange={this.handleUploadCover} />
          </div>
          <div className="form-group">
          <img className="cover-form" src={this.state.Cover}/>
          </div>
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

          {/* <div className="form-group">
            <textarea
              cols="19"
              rows="8"
              placeholder="Body"
              className="form-control"
              name="Body"
              onChange={this.handleInputChange}
              value={this.state.Body}>
            </textarea>
          </div> */}

          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Post</button>
            <button type="button" className="btn btn-warning" onClick={this.handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostForm;
