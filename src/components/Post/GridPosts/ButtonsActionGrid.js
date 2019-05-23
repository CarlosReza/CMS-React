import React, { Component } from 'react';
import { deletePost, initUpdatePost } from '../../../actions';
import { connect } from 'react-redux';

class ButtonsActionGrid extends Component {
    constructor(props) {
      super(props);
    
    }
  
   
    render() {
      const { cell, row, rowIndex } = this.props;
      return (
        <React.Fragment>
          <div className='row'>
            <div className='col-md-4'>
              <button className='btn btn-danger' onClick={() => this.props.onDelete(row.Id)}><i className="fa fa-trash"></i></button>
            </div>
  
            <div className='col-md-4'>
              <button className='btn btn-info' onClick={() => this.props.onInitUpdate(row.Id)}><i className="fa fa-edit"></i></button>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
    }
  }

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

  export default  connect(mapStateToProps, mapDispatchToProps)(ButtonsActionGrid);