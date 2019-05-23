import React from 'react';
import { Link } from 'react-router-dom';

export default ({ post: { Title, Body, Id } }) => {
  var strDesc =Body.substring(0,30);
  return (    
    <div>
      <h2><Link to={"/"+Id}>{ Title }</Link></h2>
      <p>{strDesc}</p>     
    </div>
  );
};