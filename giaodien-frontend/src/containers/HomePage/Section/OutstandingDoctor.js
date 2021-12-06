import './OutstandingDoctor.scss'
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import {withRouter } from 'react-router-dom'
//
import OutstandingDoctorImg1 from './../../../assets/images/bs1.jpg'
import * as actions from './../../../store/actions'
class OutstandingDoctor extends Component {
    constructor() {
        super();
        this.settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        }
    }
    componentDidMount() {
        this.props.getTopHomeDoctors(3)
    }

    componentDidUpdate(){

    }
    viewDetailDoctor = (doctor) =>{
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
   
    render() {
        let { doctors } = this.props
       
        return (
            <div >
                <div className="section-OutstandingDoctor">
                    <div className="OutstandingDoctor-title">
                        <h4> Bác Sĩ Nổi Bật</h4>
                    </div>
                    <div className="OutstandingDoctor-content">
                        <Slider {...this.settings}>
                            {doctors && doctors.length > 0 ? doctors.map((item, index) => {
                                return (
                                    <div className="item-slider"
                                    onClick = {() => this.viewDetailDoctor(item) }
                                     key={index}>
                                        <img src={OutstandingDoctorImg1} />
                                        <h3>Bác Sĩ {item.firstName}</h3>
                                    </div>
                                )
                            }) : ""
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        doctors: state.admin.doctorsHome
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopHomeDoctors: () => dispatch(actions.getTopHomeDoctors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
