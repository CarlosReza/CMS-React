import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPostComponent from '../Edit/EditPostComponent';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Redirect } from 'react-router-dom';


import ButtonsActionGrid from './ButtonsActionGrid';


class GridPosts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articulos: [],
      IsNewPost:false
    }    
  }

  handleNewPost = () => {
   this.setState({
     IsNewPost : true
   });
   
  }
  render() {
    if(this.props.articulos !== undefined){
      console.log("Articulos en GRID")
      console.log(this.props.articulos)
    var postEdit = this.props.articulos.filter(post => post.Editing === true)
    var IsEditing = postEdit.length > 0 ? true : false
    }

    const options = {
      // pageStartIndex: 0,
      sizePerPage: 5,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true
    };


    if (this.props.articulos !== undefined && this.props.articulos.length > 0) {

      const columnsB = [
        {
          dataField: 'Id',
          text: 'Id',
          Cell: row => (
            <div>
              <span title={row.value} hidden>{row.value}</span>
            </div>
          )
        },
        {
          dataField: 'Title',
          text: 'Título'
        },
        // {
        //   dataField: 'Body',
        //   text: 'Descripción'
        // },
        {
          dataField: 'Options',
          text: 'Options',
          isDummyField: true,
          formatter: (cell, row, enumObject, rowIndex) => {
            return (
              <ButtonsActionGrid cell={cell} row={row} rowIndex={rowIndex} />
            )
          }
        }


      ];

      if (IsEditing) {
        return (
          <div className="container-fluid">
            {
              <EditPostComponent post={postEdit[0]} key={postEdit[0].Id} />
            }

          </div>
        )
      }
      else if(this.state.IsNewPost){
        return (
          <Redirect to={{pathname: "/write" }} ></Redirect>
        )
      }
      else {
        return (
          <div>
            <div className="container-fluid">
              <br /><br />
              <BootstrapTable
                keyField="Id"
                data={this.props.articulos}
                columns={columnsB}
                pagination={paginationFactory(options)}
              />
            </div>
            <div className="pull-right padding-floating-button">
              <button type="button" className="btn btn-success btn-circle btn-xl" onClick={this.handleNewPost}>
                <i className="fa fa-pencil"></i>
              </button>
            </div>
          </div>
        )
      }

    } else {
      return <p className="text-center">Cargando posts...</p>
    }

  }
}

const mapStateToProps = (state) => {  
  return {
    articulos: state.postsData.posts
  }
}

export default connect(mapStateToProps)(GridPosts);

