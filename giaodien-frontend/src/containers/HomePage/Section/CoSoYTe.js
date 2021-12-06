import './CoSoYTe.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
//
import csyt1 from './../../../assets/images/csyt1.jpg'
import csyt2 from './../../../assets/images/csyt2.jpg'
import csyt3 from './../../../assets/images/csyt3.jpg'
import csyt4 from './../../../assets/images/csyt4.jpg'
import csyt5 from './../../../assets/images/csyt5.jpg'
class CoSoYTe extends Component {
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
            <div className="section-cosoyte">
                <div className="cosoyte-title">
                      <h4>Cơ Sở Y Tế</h4>
                </div>
                <div className="cosoyte-content">
                        <Slider {...this.settings}>
                        <div className="item-slider">
                            <img src={csyt1}/>
                            Bệnh Viện Hoàn Mỹ Phan Xích Long
                        </div>
                        <div className="item-slider">
                           <img src={csyt2}/>
                           Bệnh Viện Bình Dân
                        </div>
                        <div className="item-slider">
                             <img src={csyt3}/>
                             Bệnh Viện Gia Định
                        </div>
                        <div className="item-slider">
                           <img src={csyt4}/>
                            Bệnh Viện Nhân Dân 175
                        </div>
                        <div className="item-slider">
                           <img src={csyt5}/>
                            Bệnh Viện Thống Nhất
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

export default connect(mapStateToProps, mapDispatchToProps)(CoSoYTe);
