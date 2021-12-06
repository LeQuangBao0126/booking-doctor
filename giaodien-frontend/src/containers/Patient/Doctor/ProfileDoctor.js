import './ProfileDoctor.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
class ProfileDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
        dataProfile : this.props.dataProfile
    }
  }
  componentDidMount() {
        console.log(this.state.dataProfile)
  }
  componentDidUpdate(preProps,preState ){
      if(preProps.dataProfile != this.props.dataProfile){
          this.setState({
            dataProfile : this.props.dataProfile
          })
      }
  }
  renderTimeBooking = ()=>{
        return (
            <>
                <div>16:30  - 17:00 Thứ 7 - 31/07/2021 </div>
            </>
        )
  }
  render() {
   let {dataProfile} = this.state;

    return (
      <div className="profile-doctor">
           <div className="intro-doctor">
                <div className="content-left">
                      <img src={dataProfile?.avatar}/>
                </div>
                <div className="content-right">
                    <div className="up">
                         Bác sĩ : {dataProfile?.firstName +  " " + dataProfile?.lastName} <br/>
                         Liên hệ với bác sĩ qua email : {dataProfile?.email}
                         Số điện thoại {dataProfile?.phonenumber ?? "0909177865"}
                    </div>
                </div>
          </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
      language : state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
     
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
