
import './ManageSchedule.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from './../../../store/actions'
import { languages } from '../../../utils';
import DatePicker from "../../../components/Input/DatePicker";
import moment from 'moment';
import {saveBulkSchedule ,getScheduleDoctorByDate} from '../../../services/userService'
class ManageSchedule extends Component {

    constructor() {
        super();
        this.state = {
            selectedDoctor: null,
            listDoctors: [],
            lang: "",
            currentDate: null,
            rangeTime: [],
            arrTime: []
        }
    }

    componentDidMount() {
        this.props.getTopHomeDoctors()
        this.props.fetchAllScheduleHours('TIME')
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
        this.loadSelectedSchedules()
    }
    bindDataInputSelect = (inputData, lang = "vi") => {
        let result = []
        if (inputData && inputData.length > 0) {
            result = inputData.map((item, idx) => {
                let obj = {}
                let labelVi = `${item.firstName} ${item.lastName} `
                let labelEn = `${item.lastName} ${item.firstName}`
                obj.label = lang == languages.VI ? labelVi : labelEn
                obj.value = item.id
                return obj
            })
        }
        return result
    }
    componentDidUpdate(preProps, preState) {
        if (preProps.allDoctors != this.props.allDoctors) {
            let a = this.bindDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: a
            })
        }
        if (preProps.language != this.props.language) {
            let b = this.bindDataInputSelect(this.props.allDoctors, this.props.language)
            this.setState({
                lang: this.props.language,
                listDoctors: b
            })
        }
        if (preProps.scheduleHours != this.props.scheduleHours) {
            this.setState({
                rangeTime: this.props.scheduleHours
            })
        }
        
    }
    onChangeDatePicker = ([date]) => {
        this.setState({
            currentDate: date
        }, () => this.loadSelectedSchedules())

    }
    handleClickTime = (time) => {
        if (this.state.arrTime.includes(time.keymap)) {
            this.state.arrTime = this.state.arrTime.filter(x => x != time.keymap);

            this.setState({
                arrTime: this.state.arrTime
            })
        } else {
            this.state.arrTime.push(time.keymap)
            this.setState({
                arrTime: this.state.arrTime
            })

        }
    }
    handleSaveSchedule =async () => {
        let { rangeTime, selectedDoctor, currentDate, arrTime } = this.state

        if (!selectedDoctor || !currentDate) {
            alert("Must choose"); return
        }
        let items = [...rangeTime].filter(x => arrTime.includes(x.keymap))
        let arr = []
        if (items) {
            arr.push(...items)
        }
        currentDate = moment(currentDate).format("yyyy-MM-DD")
        let resultArr =[]
        arr.forEach(item => {
            let obj = {}
            obj.doctorId = selectedDoctor.value
            obj.date = currentDate
            obj.timeType = item.keymap
            resultArr.push(obj)
        })
        let obj2 = {
            doctorId : selectedDoctor.value,
            date : currentDate,
            schedules : resultArr
        }
        let resp = await saveBulkSchedule(obj2)
        console.log(resp)
        if(resp.data){
            this.loadSelectedSchedules()
        }
    }

    loadSelectedSchedules = async ()=>{
        debugger
        let {selectedDoctor,currentDate} = this.state;
        let a =moment(currentDate).format("yyyy-MM-DD")
        if(selectedDoctor != null && currentDate != null && currentDate!= 'Invalid Date'){
           let arr = await getScheduleDoctorByDate(selectedDoctor.value,a)
           if(arr.data && arr.data.length > 0 ){
            this.setState({
                arrTime : arr.data.map(item => item.timeType)
            })
           }else{
            this.setState({
                arrTime :  []
            })
           }
        } 
    }

    render() {
        //console.log(this.props.scheduleHours)
        let { rangeTime } = this.state
        return (
            <div className="manage-schedule-container">
                <h1><FormattedMessage id="manage-schedule.title" /></h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Chọn ngày</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.onChangeDatePicker} />
                        </div>
                        <div className="col-md-12">
                            <div className=" pick-hour-container">
                                {rangeTime && rangeTime.length > 0 ?
                                    rangeTime.map((item, idx) => {
                                        return (
                                            <button
                                                onClick={() => this.handleClickTime(item)}
                                                key={idx}
                                                className={(this.state.arrTime.length > 0 && this.state.arrTime.indexOf(item.keymap) != -1) ? "btn btn-schedule active" : "btn btn-schedule"}
                                            >{item.valueVi}</button>
                                        )
                                    })
                                    : ""
                                }
                            </div>
                            <button className="btn btn-primary" onClick={() => this.handleSaveSchedule()}>Lưu thông tin </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.doctorsHome,
        language: state.app.language,
        scheduleHours: state.admin.scheduleHours
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopHomeDoctors: () => dispatch(actions.getTopHomeDoctors()),
        fetchAllScheduleHours: (type) => dispatch(actions.fetchAllScheduleHours(type)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageSchedule))
