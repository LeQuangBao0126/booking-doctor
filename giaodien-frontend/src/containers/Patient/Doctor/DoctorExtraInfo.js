import './DoctorExtraInfo.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExtraInfoByDoctorId } from './../../../services/userService'
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
        addressClinic : "",
        nameClinic : "",
        price :  0,
        note : ""

    }
  }
  async componentDidMount() {
    let resp = await getExtraInfoByDoctorId(this.props.doctorId )
    console.log("doctor extra ",resp.data)
    if(resp.data && resp.data){
        let {addressClinic, nameClinic , priceData ,note } = resp.data
        this.setState({
          addressClinic : addressClinic,
          nameClinic : nameClinic ,
          price :  priceData.valueVi,
          note : note
        })
    }
     
  }
  async componentDidUpdate(preProps,preState ){
      if(this.props.doctorId != preProps.doctorId ){
          let resp = await getExtraInfoByDoctorId(this.props.doctorId )
      }
  }

  render() {
    let {doctor} = this.state
    return (
      <div className="doctor-extra-infor-container">
           <div className="content-up">
              <div className="text-address">Địa chỉ khám</div>
              <div className="name-clinic">{this.state.nameClinic}</div>
              <div className="detail-address">{this.state.addressClinic}</div>
           </div>  
           <div className="content-down">
              <div>Giá khám</div>
              <div>{this.state.price}</div>
              <div><b>Ghi chú : {this.state.note}</b></div>
           </div>    
           <button className="btn btn-primary">Ẩn/Hiện Nội Dung</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
