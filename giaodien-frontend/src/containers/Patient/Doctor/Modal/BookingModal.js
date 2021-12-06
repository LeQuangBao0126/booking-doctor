import './BookingModal.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {   Modal  } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor'
import {getProfileDoctorById , bookingAppoitment} from '../../../../services/doctorServices'
import { toast } from 'react-toastify';
class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorId : this.props.doctorId,
      dataScheduleTimeModal : this.props.dataScheduleTimeModal,
      dataProfile : null,

      fullName :'',
      phoneNumber:"",
      emailPatient:"",
      addressPatient:"",
      reason:"",
      dateAppointment :""
    }
  }
  async componentDidMount() {
    //let res = await getProfileDoctorById(this.state.doctorId)
    //console.log(res.data)
    //console.log(this.state.dataScheduleTimeModal)
    let a = await this.getInfoDoctor(this.state.doctorId);
    if(a){
      this.setState({
        dataProfile: a
      })
    }
  }
  getInfoDoctor = async (id)=>{
    let res = await getProfileDoctorById(this.state.doctorId)
    if(res && res.data ){
        return res.data
    }
    return null
  }
  async componentDidUpdate(preProps , preState){
    if(this.props.doctorId != preProps.doctorId){
      let a = await this.getInfoDoctor(this.props.doctorId)
      if(a){
        this.setState({
          dataProfile: a
        })
      }
    }
    if(this.props.dataScheduleTimeModal != preProps.dataScheduleTimeModal){
      this.setState({
        dataScheduleTimeModal : this.props.dataScheduleTimeModal
      })
    }

  }
  handleBooking = async ()=>{
    let {doctorId , fullName ,phoneNumber,
      emailPatient,addressPatient,reason ,dataScheduleTimeModal } = this.state
      if( !fullName || !emailPatient || !reason ){
          alert("please fill info ")
          return
      }
     let obj = {
        fullName : fullName,
        phoneNumber : phoneNumber,
        email : emailPatient ,
        address : addressPatient,
        reason : reason ,
        doctorId : doctorId,
        timeType : dataScheduleTimeModal.timeType,
        dateAppointment: dataScheduleTimeModal.valueVi
     }
     let result = await bookingAppoitment(obj);
      console.log("result booking",result)
      toast.success(`Booking appointment success http://localhhost:3000/${result.data}/doctorId`)
  }

  render() {
    let {dataProfile,dataScheduleTimeModal} = this.state
      console.log(dataScheduleTimeModal)
    return (
      <div className="">
        <Modal
          backdrop={false}
          className="booking-modal-container"
          size={'lg'}
          isOpen={this.props.isOpenModal }
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Thông tin đặt lịch khám bệnh</span>
            </div>
            <div className="booking-modal-body">
                 <div className="doctor-info">
                   <ProfileDoctor dataProfile ={dataProfile}/>
                 </div>
                 <div className="price">
                    <b>Giá khám : 50 BTC</b>
                 </div>  

            <div className="row">
                 <div className="col-md-6 form-group">
                     <label>Họ tên</label>
                     <input 
                     onChange={(e)=>{this.setState({ fullName : e.target.value})}}
                     value={this.state.fullName}
                     className="form-control" 
                     type="text" />
                 </div>
                 <div className="col-md-6 form-group">
                    <label>Số điện thoại</label>
                    <input 
                        onChange={(e)=>{this.setState({ phoneNumber : e.target.value})}}
                        value={this.state.phoneNumber}
                        className="form-control"
                        type="text" />
                  </div>
                 <div className="col-md-6 form-group">
                      <label>Địa chỉ email</label>
                       <input 
                         onChange={(e)=>{this.setState({ emailPatient : e.target.value})}}
                         value={this.state.emailPatient}
                       className="form-control" 
                       type="email" />
                 </div>
                 <div className="col-md-6 form-group">
                      <label>Địa chỉ</label>
                       <input 
                           onChange={(e)=>{this.setState({ addressPatient : e.target.value})}}
                           value={this.state.addressPatient}
                       className="form-control"
                       type="text" />
                 </div>
                 <div className="col-md-6 form-group">
                       <label>Lý do khám </label>
                       <input 
                        onChange={(e)=>{this.setState({ reason : e.target.value})}}
                        value={this.state.reason}
                       className="form-control" 
                       type="text" />
                 </div>
                 <div className="col-md-6 form-group">
                       <label>Thời gian gặp bác sĩ : </label>
                       <b>{dataScheduleTimeModal.valueVi ?? ""  }</b>
                 </div>
            </div>
            </div>
            <div className="booking-modal-footer">
               <button className=""  onClick={ () => this.handleBooking() }> Xác nhận Đặt Lịch </button>
               <button className="" onClick={() => { this.props.closeModal(false)}} > Hủy </button>
            </div>
          </div>

        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
