import './DoctorExtraInfo.scss'
import React, { Component } from 'react';
import { connect } from 'react-redux';
class DefaultClass extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
   componentDidMount() {
  }
   componentDidUpdate(preProps,preState ){
     
  }

  render() {
   
    return (
      <div className="doctor-extra-infor-container">
           
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
