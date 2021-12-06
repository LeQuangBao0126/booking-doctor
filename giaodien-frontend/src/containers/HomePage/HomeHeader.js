import './HomeHeader.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl'


class HomeHeader extends Component {
   changeLanguage = (language) => {
      this.props.changeLanguage(language)
   }

   render() {
      return (
         <>
            <div className="home-header-container">
               <div className="home-header-content">
                  <div className="left-content">
                     <div className="header-logo"></div>
                  </div>
                  <div className="center-content">
                     <div className="child-content">
                        <div><b><FormattedMessage id="home-header.speciality" />  </b></div>
                        <div className="sub-title"><FormattedMessage id="home-header.findDoctorBySpeciality" /> </div>
                     </div>
                     <div className="child-content">
                        <div><b>Cơ Sở Y Tế</b></div>
                        <div className="sub-title">Chọn Bệnh Viện Phòng Khám</div>
                     </div>
                     <div className="child-content">
                        <div><b>Bác Sĩ</b></div>
                        <div className="sub-title">Tìm Chọn Bác Sĩ</div>
                     </div>
                     <div className="child-content">
                        <div><b>Gói Khám</b></div>
                        <div className="sub-title">Tìm Gói Khám</div>
                     </div>
                  </div>
                  <div className="right-content">
                     <div className="support">
                        <i className="far fa-question-circle " ></i>
                        <span className="ml-2">Hỗ Trợ</span>
                        <button className="" onClick={() => { this.changeLanguage('vi') }} >Tiếng Việt</button>
                        <button className="" onClick={() => { this.changeLanguage('en') }} >Tiếng Mỹ</button>
                     </div>
                  </div>
               </div>
            </div>
            {
               this.props.isShowBanner == true ? 
               (
                  <div className="home-header-banner">
                  <div className="content-up"></div>
                  <div className="content-down">
                     <div className="options">
                        <ul>
                           <li>
                              <a>
                                 <div className="option-image" style={{ "backgroundImage": "url('https://bookingcare.vn/assets/anh/kham_chuyenkhoa.png')" }} ></div>
                                 Khám <br /> Chuyên Khoa
                              </a>
                           </li>
                           <li>
                              <a>
                                 <div className="option-image" style={{ "backgroundImage": "url('https://bookingcare.vn/assets/anh/kham_tuxa.png')" }} ></div>
                                 Khám <br /> Từ Xa
                              </a>
                           </li>
                           <li>
                              <a>
                                 <div className="option-image" style={{ "backgroundImage": "url('https://bookingcare.vn/assets/anh/kham_tongquat.png')" }} ></div>
                                 Khám <br /> Tổng quát
                              </a>
                           </li>
                           <li>
                              <a>
                                 <div className="option-image" style={{ "backgroundImage": "url('https://bookingcare.vn/assets/anh/dichvu_xetnghiem.png')" }} ></div>
                                 Xét Nghiệm <br /> Y Học
                              </a>
                           </li>
                           <li>
                              <a>
                                 <div className="option-image" style={{ "backgroundImage": "url('https://bookingcare.vn/assets/anh/kham_nhakhoa.png')" }} ></div>
                                 Khám <br /> Nha Khoa
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               )
               :
               ""
            }
          
         </>
      );
   }

}

const mapStateToProps = state => {
   return {
      language: state.app.language
   };
};

const mapDispatchToProps = dispatch => {
   return {
      changeLanguage: (lang) => dispatch(actions.changeLanguage(lang)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
