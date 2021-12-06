import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../../store/actions'
class TableManageUser extends Component {

   constructor() {
      super()
      this.state = {
      }
   }
   componentDidMount() {
      this.props.fetchAllUser()
   }

   render() {
      let { users } = this.props;
      return (
         <div className="table-manage-user">
            <table style={{"border":"1px solid black"}}>
               <thead>
                     <tr>
                        <td>Email</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Address</td>
                        <td>Actions</td>
                     </tr>
               </thead>
               <tbody>
                  {
                     users && users.length > 0 ?
                        users.map((item, index) => {
                           return (
                              <tr key={index}>
                                 <td>{item.email}</td>
                                 <td>{item.firstName}</td>
                                 <td>{item.lastName}</td>
                                 <td>{item.address}</td>
                                 <td> action</td>
                              </tr>
                           )
                        }) :    <tr>  </tr>
                      
                    
                  }
               </tbody>
            </table>
         </div>
      );
   }

}

const mapStateToProps = state => {
   return {
      users: state.admin.users
   };
};

const mapDispatchToProps = dispatch => {
   return {
      fetchAllUser: () => dispatch(actions.fetchAllUser())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
