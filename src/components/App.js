//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';



class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {   
    const {children} = this.props; 
    return (
      <div>
       <Header title="You write!"/>      
       <Content body={children} />
       <Footer copyright='&copy; You write 2019' />        
      </div>
    );
  }
}

export default App;
