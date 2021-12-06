import './Login.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import { FormattedMessage } from 'react-intl';
import userIcon from "../../assets/images/user.svg";
import {LanguageUtils} from "../../utils";
import passIcon from "../../assets/images/pass.svg";
import {adminService} from './../../services'
class Login extends Component {
  constructor(props) {
    super(props);
    this.initialState ={
      email :'',
      password :'',
    }
    this.state ={
      ...this.initialState
    }
  }

  handleOnChangeInput = (e ,name) =>{
     this.setState({
        [name] : e.target.value
     })
  }
 
  refresh = () => {
    this.setState({
        ...this.initialState
    })
  }
  redirectToSystemPage = () => {
    const { navigate } = this.props;
    const redirectPath = '/system/user-manage';
    window.location.replace("/system/user-manage");
  }

  processLogin = async() => {
    
    let obj = {
      email :this.state.email,
      password : this.state.password
    }
  let {adminLoginSuccess} = this.props
    try {
      let user=await  adminService.login(obj)
      console.log(user)
        this.refresh();
        this.redirectToSystemPage();
        adminLoginSuccess(user)
    } catch (e) {
        console.log('error login : ', e)
    }
}
 
  render() {
    return (
        <div className="login-background">
            <div className="login-container">
              <div className="form_login">
                <h2 className="title" style={{"color":"black"}}>
                  Login
                </h2>
                <div className="form-group icon-true">
                  <input
                      placeholder={"Email"}
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={(e)=>this.handleOnChangeInput(e,"email")}
                  />
                </div>

                <div id="phone-input-container" className="form-group icon-true">
                  <img className="icon" src={passIcon} alt="this" />
                  <input
                      placeholder={"Password"}
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={(e)=>this.handleOnChangeInput(e,"password")}
                  />
                </div>
                <div className="form-group login">
                  <button
                      id="btnLogin"
                      type="submit"
                      onClick={()=>{ this.processLogin() }}
                      className="btn">
                       Login
                  </button>
                </div>
              </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
