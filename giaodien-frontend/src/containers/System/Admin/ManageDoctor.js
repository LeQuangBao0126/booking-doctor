import './ManageDoctor.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import * as actions from './../../../store/actions'
import { languages } from '../../../utils';
import { getDoctorDetail } from '../../../services/doctorServices'
import { textChangeRangeIsUnchanged } from 'typescript';

class ManageDoctor extends Component {

  constructor() {
    super()
    this.mdParser = new MarkdownIt();
    this.state = {
      //save to markdown table
      contentMarkdown: '',
      contentHTML: '',
      selectedOption: null,
      description: "",
      listDoctors: [],
      lang: "",
      hasOldData: true,

      //save to doctor_info table
      listPrice : [],
      listPaymentMethod : [],
      listProvince : [],
      selectedPrice : null,
      selectedPayment : null,
      selectedProvince: null,
      nameClinic : '',
      addressClinic :'',
      note : ''
    }
  }


  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html
    })
  }
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let respDoctorDetail = await getDoctorDetail(selectedOption.value)
    console.log(respDoctorDetail.data)
    if (respDoctorDetail.data && respDoctorDetail.data.markdown
      && (respDoctorDetail.data.markdown.contentMarkdown || respDoctorDetail.data.markdown.description)) {
      let a = respDoctorDetail.data.markdown;
      let b =respDoctorDetail.data
      this.setState({
        contentMarkdown: a.contentMarkDown,
        description: a.description ?? "abc",
        hasOldData: true,

        nameClinic : b.nameClinic,
        addressClinic : b.addressClinic,
        note : b.note,

        selectedPrice : this.bindDataInputSelect2([b.priceData] , this.props.language)[0] ,
        selectedPayment : this.bindDataInputSelect2([b.paymentData] , this.props.language)[0] ,
        selectedProvince : this.bindDataInputSelect2([b.provinceData] , this.props.language)[0] ,
      })
    } else {
      this.setState({
        contentMarkdown: '',
        contentHTML: '',
        description: "",
        hasOldData: false,
        
        nameClinic : "",
        addressClinic :"",
        note : "",
        selectedPrice:[],
        selectedPayment:[],
        selectedProvince:[]
      })
    }

  }
  handleSaveContentMarkdown = () => {
    let { contentHTML, contentMarkdown,
       selectedOption, description ,
       selectedPrice ,selectedProvince ,selectedPayment,
       nameClinic , addressClinic , note} = this.state;
    let obj = {
      contentHTML: contentHTML,
      contentMarkDown: contentMarkdown,
      doctorId: selectedOption.value,
      description: description ,
      /// tablle doctor info  
      selectedPrice : selectedPrice.value,
      selectedPayment : selectedPayment.value,
      selectedProvince : selectedProvince.value,
      nameClinic :nameClinic,
      addressClinic :addressClinic,
      note :note
    }
    this.props.saveDetailDoctor(obj)
  }

  componentDidMount() {
    this.props.getTopHomeDoctors()
    this.props.getRequiredDoctorInfor()
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

    if(preProps.arrPrice != this.props.arrPrice){
      let b = this.bindDataInputSelect2(this.props.arrPrice, this.props.language)
     
        this.setState({
          listPrice : b
        })
    }
    if(preProps.arrPayment != this.props.arrPayment){
     let b = this.bindDataInputSelect2(this.props.arrPayment, this.props.language)
        this.setState({
          listPaymentMethod : b
        })
    }
    if(preProps.arrProvince != this.props.arrProvince){
         let b = this.bindDataInputSelect2(this.props.arrProvince, this.props.language)
        this.setState({
          listProvince :   b
        })
    }
  
  }
  bindDataInputSelect2 = (arrInputData,lang)=>{
    let result = []
    if (arrInputData && arrInputData.length > 0) {
      result = arrInputData.map((item)=>{
          let obj = {}
          obj.label = lang == 'vi' ? item.valueVi : item.valueEn;
          obj.value = item.keymap
          return obj 
      })
    }
    return result
  }
  bindDataInputSelect = (inputData, lang) => {
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
   
  render() {
   // let { listProvince , listPrice ,listPaymentMethod } = this.state
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          Tạo thêm thông tin bác sĩ  ||||   tiếng {this.props.language}
        </div>
        <div className="more-info">
          <div className="row">
            <div className="col-md-4">
              <label>Chọn bác sĩ</label><br />
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-md-8">
              <label>Thông tin giới thiệu</label><br />
              <textarea className="form-control"
                value={this.state.description}
                onChange={(e) => { this.setState({ description: e.target.value }) }}
                name="w3review" rows="4" cols="100" style={{ "width": "90%" }}>
              </textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label>Chọn Giá Khám (dropdown)</label>
              <Select
                value={this.state.selectedPrice}
                onChange={(e) => this.setState({ selectedPrice : e })}
                options={this.state.listPrice }
              />
            </div>
            <div className="col-md-4">
              <label>Chọn Phương thức thanh toán (dropdown)</label>
              <Select
                value={this.state.selectedPayment}
                onChange={(e) => this.setState({ selectedPayment : e })}
                options={this.state.listPaymentMethod }
                />
            </div>
            <div className="col-md-4">
              <label>Chọn Tỉnh thành(dropdown)</label><br />
              <Select
                value={this.state.selectedProvince}
                onChange={(e) => this.setState({ selectedProvince : e })}
                options={this.state.listProvince }
                />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <label>Tên Phòng Khám</label>
              <input className="form-control"  
               value= {this.state.nameClinic}
               onChange={(e) => { this.setState({ nameClinic: e.target.value }) }} />
            </div>
            <div className="col-md-4">
              <label>Địa chỉ phòng khám</label>
              <input className="form-control"
                value= {this.state.addressClinic}
                onChange={(e) => { this.setState({ addressClinic: e.target.value }) }} />
            </div>
            <div className="col-md-4">
              <label>Ghi chú</label><br />
              <input className="form-control"
                value= {this.state.note}
                onChange={(e) => { this.setState({ note: e.target.value }) }} />
            </div>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor style={{ height: '300px' }}
            value={this.state.contentMarkdown}
            renderHTML={text => this.mdParser.render(text)}
            onChange={this.handleEditorChange} />
        </div>
        {this.state.selectedOption != null ?
          <button className={this.state.hasOldData ? 'btn btn-success' : 'btn btn-danger'} 
          onClick={() => this.handleSaveContentMarkdown()} >
            {this.state.hasOldData == true ? 'Cập nhật thông tin' : 'Tạo mới thông tin'}
          </button> : ""
        }

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    allDoctors: state.admin.doctorsHome,
    language: state.app.language,
    arrPrice: state.admin.arrPrice,
    arrProvince: state.admin.arrProvince,
    arrPayment: state.admin.arrPayment,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTopHomeDoctors: () => dispatch(actions.getTopHomeDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorAct(data)),
    getRequiredDoctorInfor : ()=> dispatch(actions.getRequiredDoctorInfor()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
//74