import './Specialty.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
//
import specialtyImg1 from './../../../assets/images/spec1.jpg'
import specialtyImg2 from './../../../assets/images/spec2.jpg'
import specialtyImg3 from './../../../assets/images/spec3.jpg'
import specialtyImg4 from './../../../assets/images/spec4.jpg'
import specialtyImg5 from './../../../assets/images/spec5.jpg'
import specialtyImg6 from './../../../assets/images/spec6.jpg'
class Specialty extends Component {
    constructor(){
      super();
        this.settings={
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1
        }
    }
   render() {
      return (
         <>
            <div className="section-specialty">
                <div className="specialty-title">
                      <h4> Chuyên khoa phổ biến</h4>
                </div>
                <div className="specialty-content">
                        <Slider {...this.settings}>
                        <div className="item-slider">
                            <img src={specialtyImg1}/>
                            Tiêu Hóa
                        </div>
                        <div className="item-slider">
                           <img src={specialtyImg2}/>
                           Thần Kinh
                        </div>
                        <div className="item-slider">
                             <img src={specialtyImg3}/>
                            Hô Hấp
                        </div>
                        <div className="item-slider">
                           <img src={specialtyImg4}/>
                           Nha Khoa
                        </div>
                        <div className="item-slider">
                           <img src={specialtyImg5}/>
                           Khoa Nhi
                        </div>
                        <div className="item-slider">
                             <img src={specialtyImg6}/>
                             Tim Mạch
                        </div>
                    </Slider>
                </div>
            </div>
         </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
