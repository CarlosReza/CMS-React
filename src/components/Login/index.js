import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions/loginActions.js';
import '../Global/css/Login.css'

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  render() {
    let { email, password } = this.state;
    let { isLoginPending, isLoginSuccess, loginError } = this.props;

    return (
      !isLoginSuccess ?
        <div className="body-login">
          <div className="container">
            <div className="d-flex justify-content-center h-100">
              <div className="card card-login">
                <div className="card-header">
                  <h3>Iniciar Sesión</h3>
                  {/* <div className="d-flex justify-content-end social_icon">
                  <span><i className="fa fa-facebook-square"></i></span>
                  <span><i className="fa fa-google-plus-square"></i></span>
                  <span><i className="fa fa-twitter-square"></i></span>
                </div> */}
                </div>
                <div className="card-body">
                  <form name="loginForm" onSubmit={this.onSubmit}>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                      </div>
                      <input className="form-control" placeholder="email user" type="email" name="email" onChange={this.handleInputChange} value={email} />
                    </div>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                      </div>
                      <input className="form-control" placeholder="password" type="password" name="password" onChange={this.handleInputChange} value={password} />
                    </div>
                    {/* <div className="row align-items-center remember">
                    <input type="checkbox" />Remember Me
					</div> */}
                    <div className="form-group">
                      <input type="submit" value="Login" className="btn float-right login_btn" />
                    </div>
                  </form>
                </div>
                {/* <div className="card-footer">
                <div className="d-flex justify-content-center links">
                  Don't have an account?<a href="#">Sign Up</a>
                </div>
                <div className="d-flex justify-content-center">
                  <a href="#">Forgot your password?</a>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
        :
        <Redirect
          to={{
            pathname: "/admin"
          }}
        />
    )
  }

  onSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.loginData.isLoginPending,
    isLoginSuccess: state.loginData.isLoginSuccess,
    loginError: state.loginData.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);