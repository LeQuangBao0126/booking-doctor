import './UserRedux.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { languages } from './../../../utils'
import TableManageUser from './TableManageUser'
import * as actions from './../../../store/actions'
const initState = {
  email: '',
  password: '',
  address: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  gender: '',
  position: '',
  role: '',
  avatar: "https://user-images.githubusercontent.com/59433505/142631056-188bf176-acdf-442b-9ed9-c851503fdf4d.jpg"
}
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {...initState}
  }

  async componentDidMount() {
    try {
      this.props.fetchGenderStart('GENDER')
      this.props.fetchPositionStart('POSITION')
      this.props.fetchRoleStart('ROLE')
     
    } catch (e) {
      console.log(e)
    }
  }

  handleOnChangeInput = (e, name) => {
    this.setState({
      [name]: e.target.value
    })
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.genders != this.props.genders) {
      let arrGender = this.props.genders
      this.setState({
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keymap : ""
      })

    }
    if (preProps.positions != this.props.positions) {
      let arrPosition = this.props.positions
      this.setState({
        position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keymap : ""
      })
    }
    if (preProps.roles != this.props.roles) {
      let arrRoles = this.props.roles
      this.setState({
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keymap : ""
      })
    }
  }
  handeSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password || !this.state.firstName) {
      alert("please fill information")
      return
    }
    this.props.addNewUser(this.state)
    this.setState({ ...initState })
    setTimeout(() => {
      this.props.fetchAllUser()
    }, 500);
  }

  render() {
    let { genders, positions, roles  } = this.props;
    let language = this.props.language;

    return (
      <div className="user-redux-container">
        <div className="user-redux-title">
          User Management Redux
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <button className="btn btn-primary"><FormattedMessage id="manage-user.add" /></button>
            </div>
            <div className="row">
              <form onSubmit={(e) => { this.handeSubmit(e) }}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4"><FormattedMessage id="manage-user.email" /></label>
                    <input type="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={(e) => { this.handleOnChangeInput(e, 'email') }}
                      id="inputEmail4" placeholder="Email" />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4"><FormattedMessage id="manage-user.password" /></label>
                    <input type="password"
                      value={this.state.password}
                      onChange={(e) => { this.handleOnChangeInput(e, 'password') }}
                      className="form-control"
                      id="inputPassword4" placeholder="Password" />
                  </div>

                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress"><FormattedMessage id="manage-user.address" /></label>
                  <input type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(e) => { this.handleOnChangeInput(e, 'address') }}
                    id="inputAddress"
                    placeholder="" />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName"><FormattedMessage id="manage-user.first-name" /></label>
                  <input type="text" className="form-control"
                    value={this.state.firstName}
                    onChange={(e) => { this.handleOnChangeInput(e, 'firstName') }}
                    id="firstName" placeholder="FirstName" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname"><FormattedMessage id="manage-user.last-name" /></label>
                  <input type="text"
                    value={this.state.lastName}
                    onChange={(e) => { this.handleOnChangeInput(e, 'lastName') }}
                    className="form-control"
                    id="lastname" placeholder="LastName" />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber"><FormattedMessage id="manage-user.phone-number" /></label>
                  <input type="text" className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(e) => { this.handleOnChangeInput(e, 'phoneNumber') }}
                    id="phoneNumber" placeholder="phoneNumber" />
                </div>
                <div className="form-group">
                  <label htmlFor="inputState">Role</label>
                  <select className="form-control" onChange={(e) => { this.handleOnChangeInput(e, 'role') }}>
                    {roles.length > 0 ?
                      roles.map((item, index) => {
                        return <option key={index}
                          value={item.keymap}
                        >{language === languages.VI ? item.valueVi : item.valueEn}</option>
                      })
                      :
                      <option value="">Choose Role</option>
                    }

                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="inputState"><FormattedMessage id="manage-user.position" /></label>
                  <select className="form-control" onChange={(e) => { this.handleOnChangeInput(e, 'position') }}>
                    {positions.length > 0 ?
                      positions.map((item, index) => {
                        return <option key={index}
                          value={item.keymap}
                        >{language === languages.VI ? item.valueVi : item.valueEn}</option>
                      })
                      :
                      <option value="">Choose Position</option>
                    }

                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="inputState">Gender</label>
                  <select className="form-control" onChange={(e) => { this.handleOnChangeInput(e, 'gender') }} >
                    {genders.length > 0 ?
                      genders.map((item, index) => {
                        return <option key={index}
                          value={item.keymap}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                      })
                      :
                      <option value="">Choose Gender</option>
                    }

                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="hinh">Tải ảnh Avatar <i className="fas fa-upload"></i></label>
                  <input type="file" id="hinh"
                    style={{ "visibility": "hidden" }} />
                  <div className="preview-image"></div>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="hinh"> Avatar link - ko cần upload hình nữa <i className="fas fa-upload"></i></label>
                  <input type="text"
                    value={this.state.avatar}
                    onChange={(e) => { this.handleOnChangeInput(e, 'avatar') }} />
                </div>

                <button type="submit" className="btn btn-primary">Save User</button>
              </form>
            </div>
          </div>
        </div>

        <hr>
        </hr>

        <TableManageUser/>            

      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    positions: state.admin.positions,
    roles: state.admin.roles
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenderStart: (typeCode) => dispatch(actions.fetchGenderStart(typeCode)),
    fetchPositionStart: (typeCode) => dispatch(actions.fetchPositionStart(typeCode)),
    fetchRoleStart: (typeCode) => dispatch(actions.fetchRoleStart(typeCode)),
    addNewUser: (data) => dispatch(actions.addUser(data)),
    fetchAllUser: () => dispatch(actions.fetchAllUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
