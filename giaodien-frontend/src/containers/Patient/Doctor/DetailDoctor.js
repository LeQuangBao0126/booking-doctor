import './DetailDoctor.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader'
import {getDoctorDetail} from'./../.././../services/doctorServices'
import DoctorSchedule from './DoctorSchedule'
import DoctorExtraInfo from'./DoctorExtraInfo'
class DetailDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
        doctor : null
    }
  }
  async componentDidMount() {
      if(this.props.match &&  this.props.match.params ){
        let resp = await  getDoctorDetail(this.props.match.params.id)
        this.setState(
          { doctor :resp.data }
        )
      }
  }
  componentDidUpdate(preProps,preState ){

  }

  render() {
    let {doctor} = this.state
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-left">
              <img  src={doctor?.avatar}/>
            </div>
            <div className="content-right">
                <div className="up">
                  Phó giáo sư tiến sĩ ABC
                </div>
                <div className="down"  >
                    {doctor && doctor.markdown ? doctor.markdown.description : "" }
                </div>
            </div>
          </div>
          <div className="schedule-doctor">
              <div className="content-left">
                  <DoctorSchedule doctorId={this.props.match.params.id}/>
              </div>
              <div className="content-right">
                  <DoctorExtraInfo  doctorId={this.props.match.params.id} />
              </div>
          </div>
          <div className="detail-info-doctor"
              dangerouslySetInnerHTML={ {__html :  doctor && doctor.markdown ? doctor.markdown.contentHTML : ""  }}
          >
          </div>
          <div className="comment-doctor">

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
