import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu , doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { UserRole } from '../../utils';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAdmin : true ,
            menuApp :[]
        }
    }

    changeLanguage = (lang)=>{
        this.props.changeLanguage(lang)
    }
    componentDidMount(){
        console.log(this.props.adminInfo)
        let {adminInfo} = this.props
        let menu = []
        if(adminInfo ){
            let role = adminInfo.roleId
            if(role == UserRole.ADMIN){
                menu = adminMenu
            }else if(role == UserRole.DOCTOR){
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp : menu
        })
    }
    render() {
        const { processLogout, adminInfo } = this.props;
       // console.log(this.props.adminInfo)
        return (
          
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

               <div>
                { adminInfo!=null  ?   
                  ( <div className="btn btn-logout"  >
                     <FormattedMessage id="home-header.welcome" />  {adminInfo.firstName} 
                    </div>) : ""
                   
                }
                   <div className="btn btn-logout" onClick={()=>{this.changeLanguage("vi")}} >
                        VN
                    </div>
                    <div className="btn btn-logout" onClick={()=>{this.changeLanguage("en")}}>
                        EN
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
               </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        adminInfo: state.admin.adminInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage:(lang)=> dispatch(actions.changeLanguage(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
