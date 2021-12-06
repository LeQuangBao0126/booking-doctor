import './HomePage.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import Specialty from './Section/Specialty';
import OutstandingDoctor from './Section/OutstandingDoctor';
import CoSoYTe from './Section/CoSoYTe'
class HomePage extends Component {

    render() {
        return (
            <div  className="home-wrapper">
                <HomeHeader isShowBanner />
                <Specialty/>
                <OutstandingDoctor/>
                <CoSoYTe/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
