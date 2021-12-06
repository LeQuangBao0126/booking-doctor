import './DoctorSchedule.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getScheduleDoctorByDate } from '../../../services/userService';
import BookingModal from  './Modal/BookingModal'
class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDayss: [],
      selectedDate : null,
      doctorId : this.props.doctorId,
     
      selectedDay : "",
      availableTimes :[],
      isOpenModalBooking : false,
      dataScheduleTimeModal: {

      }

    }
  }
  
  componentDidMount() {
    let { language } = this.props;
    //   console.log(moment(new Date()).locale("vi").format('dddd - DD/MM') )
    //   console.log(moment(new Date()).locale("en").format('ddd - DD/MM') )
    let arrDate = []
    for (let i = 0; i < 7; i++) {
      let object = {}
      if(language == 'vi'){
        object.label = moment(new Date()).add(i, 'days').locale("vi").format("dddd - DD/MM");
      }else{
        object.label = moment(new Date()).add(i, 'days').locale("en").format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, 'days').startOf("day").format("yyyy-MM-DD");
      arrDate.push(object);
    }
    this.setState({
      allDays: arrDate,
    })
  }
  componentDidUpdate(preProps , preState){
      if(this.props.language != preProps.language){
        let arrDate = []
        let { language } = this.props;
        for (let i = 0; i < 7; i++) {
          let object = {}
          if(language == 'vi'){
            object.label = moment(new Date()).add(i, 'days').locale("vn").format("dddd - DD/MM/YYYY");
          }else{
            object.label = moment(new Date()).add(i, 'days').locale("en").format("ddd - DD/MM");
          }
          object.value = moment(new Date()).add(i, 'days').startOf("day").format("yyyy-MM-DD");
          arrDate.push(object);
        }
        this.setState({
          allDays: arrDate
        })
      }
  }
  handleChangeDate = async (e)=>{
    if(e.target.value){
      let respScheduleDoctor = await getScheduleDoctorByDate(this.state.doctorId,e.target.value)
      this.setState({
        availableTimes : respScheduleDoctor.data  
      })
    }
  }
  handleClickScheduleTime = (time) =>{
      this.setState({
        isOpenModalBooking : true,
        dataScheduleTimeModal : time
      })
  }
  closeModal= (flag)=>{
    this.setState({
      isOpenModalBooking : flag
    })
  }
  render() {
    let { allDays,availableTimes  } = this.state;
    return (
      <>
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select className="form-control selectDay" style={{"width":"40%"}} 
          onChange= {(e)=> this.handleChangeDate(e)}  >
            {
              allDays && allDays.length > 0 ?
                allDays.map((item, index) => {
                  return <option key={index} value={item.value}>{item.label}</option>
                })
                :  <option >None</option>
            }
          </select>
        </div>
        <div className="all-available-time">
              <div className="calendar">
                   <b><i className="far fa-calendar-alt"></i> Lịch Khám</b><br/>
                  <b> <small>Click vào ô vàng để đặt lịch hẹn vói bác sĩ </small></b>
               </div>
              {
                availableTimes && availableTimes.length >0 ? 
                availableTimes.map((item, idx) => {
                      return (
                          <button  key={idx} 
                            onClick= {()=> this.handleClickScheduleTime(item)}
                           className="btn btn-schedule"  >{item.valueVi}</button>
                      )
                  })
                :
                <b>Không có lịch hẹn trong khoảng thồi gian này</b>
              }
        </div>
      </div>
       <BookingModal  

            doctorId ={this.state.doctorId}
            dataScheduleTimeModal = {this.state.dataScheduleTimeModal}
            isOpenModal={this.state.isOpenModalBooking}  
            closeModal ={this.closeModal}
        
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
