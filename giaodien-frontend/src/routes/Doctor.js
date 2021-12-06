import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from './../containers/System/Doctor/ManageSchedule'
import Header from '../containers/Header/Header'
class Doctor extends Component {
    render() {
        return (
            <div className="Doctor-container">
                <div className="Doctor-list">
                    <Header />
                    <Switch>
                        <Route path="/doctor" exact render={()=><h1>Weee Com</h1>}  />
                        <Route path="/doctor/manage-schedule" component ={ManageSchedule}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
 