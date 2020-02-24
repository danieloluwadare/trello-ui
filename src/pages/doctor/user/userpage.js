import React, { Component } from 'react';
import Header from '../../../partials/header';
import Navbar from '../../../partials/navbar'
import BreadCrumb from '../../../partials/breadcrumb'
import {fetchAllUsers,unBlockUser,blockUser} from './user-api'
import {hasAuthority} from  '../../../utils/api-utils'

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Spin,
    notification,Popconfirm,Table, Divider, Tag 
  } from 'antd';

class UserPage extends Component  {
    constructor(props) {
        super(props);
        this.state={
            users:[],
            isloading:true
        }
            // this.onsubmitDrug = this.onsubmitDrug.bind(this);
            this.unblockUzer = this.unblockUzer.bind(this);

    }

    componentDidMount(){
        this.getAllUsers()
    }

    // <span class="badge badge-primary">Primary</span>
    //                                 <span class="badge badge-secondary">Secondary</span>
    //                                 <span class="badge badge-success">Success</span>
    //                                 <span class="badge badge-danger">Danger</span>

     

    getAccontLockedInfo = (block)=>{
        let badge = {clazz:"badge badge-info", display:"Active"}
        if(block==1){
            badge = {clazz:"badge badge-danger", display:"Blocked"}
        }    
        return (
            <span className={badge.clazz}>
                {badge.display}
            </span>
        );                  
    }

    unblockUzer = (email) =>{
        unBlockUser(email)
        .then(response=>{
            console.log("Users Response");
            console.log(response.data)
            this.getAllUsers()
            // this.setState({isloading:false})
        })
        .catch((error)=> {
            console.log("User Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `An Error Occured UnBlocking User Users .`,
            });

            this.setState({isloading:false})
            console.log(error);

        });
    }

    blockUzer = (email) =>{
        blockUser(email)
        .then(response=>{
            console.log("Users Response");
            console.log(response.data)
            this.getAllUsers()
            // this.setState({isloading:false})
        })
        .catch((error)=> {
            console.log("User Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `An Error Occured Blocking User Users .`,
            });

            this.setState({isloading:false})
            console.log(error);

        });
    }

    getTableHeader = ()=>{
        
        const columns = [
            {
              title: 'First Name',
              dataIndex: 'firstName',
              key: 'firstName',
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
              title: 'Email',
              dataIndex: 'email', 
              key: 'email',
            },
            {
              title: 'Phone Number',
              dataIndex: 'phoneNo',
              key: 'phoneNo',
            },
            {
                title: 'Roles',
                dataIndex: 'roles',
                key: 'roles',
                render: roles => (
                    <span>
                      {roles.map(role => {
                        return (
                            <span className="badge badge-secondary">
                                {role.name}
                            </span>
                        );   
                      })}
                    </span>
                ),
            },

            {
                title: 'UnAuthorized Activity',
                dataIndex: 'illegalCount',
                key: 'illegalCount',
            },
            
            {
                title: 'Account Status',
                dataIndex: 'block',
                key: 'block',
                render: block => (
                    <span>
                        {this.getAccontLockedInfo(block)}  
                    </span>
                  ),
            },
           
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span>
                    {
                        hasAuthority(["ROLE_ADMIN_BLOCK_USER"]) 
                        ?

                            (record.block==0) ?

                            <Popconfirm
                                title="Are you sure you want to Block this User?"
                                onConfirm={(e)=>{this.blockUzer(record.email)}}
                                onCancel={this.cancelDrug()}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button type="button" style={{marginBottom:'5px'}}  class="btn btn-danger btn-sm">Block</button>
                            </Popconfirm>

                            :

                            <Popconfirm
                                title="Are you sure you want to UnBlock this User?"
                                onConfirm={(e)=>{this.unblockUzer(record.email)}}
                                onCancel={this.cancelDrug()}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button type="button" style={{marginBottom:'5px'}}  class="btn btn-primary btn-sm">UnBlock</button>
                            </Popconfirm>
                        :
                        ""

                    }
                    
                    {/* <button type="button" style={{marginBottom:'5px'}}  class="btn btn-primary btn-sm">Block</button> */}
                    <Divider type="vertical" />
                    <button onClick={(e)=>{this.props.history.push(`/single-user/${record.id}`);}} type="button" class="btn btn-primary btn-sm">View Audit Trail</button>
                  </span>
                ),
              },
          ];

          return columns
    }

    
    // onsubmitDrug = (e) => {
    //     e.preventDefault();
    //     this.setState({isloading:true})
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log(values);
    //             createDrug(values)
    //             .then(response =>{
    //                 console.log(response.data);
    //                 if(response.data){
    //                     notification['success']({
    //                         message: 'MEDTHREAT',
    //                         description:
    //                           'Drug Created Successfully',
    //                       });
    //                     this.props.form.resetFields();
    //                     this.getAllDrugs()
    //                 }
    //             })
    //             .catch((error)=> {
    //                 console.log("Drug Error Response");
              
    //                 notification['error']({
    //                 message: 'MEDTHREAT',
    //                 description:
    //                     `Error Occured Creating Drug .`,
    //                 });
    //                 this.setState({isloading:false})
    //                 console.log(error.response.status);
        
    //             });
    //         }
    //     });
    // }

    getAllUsers = () =>{
        this.setState({isloading:true})
        fetchAllUsers()
        .then(response=>{
            console.log("Users Response");
            console.log(response.data)
            this.setState({users:response.data})
            this.setState({isloading:false})
        })
        .catch((error)=> {
            console.log("User Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `An Error Fetching Users .`,
            });

            this.setState({isloading:false})
            console.log(error);

        });
    }

    deleteDrug = (id)=>{
        console.log( id)

    }
    cancelDrug = ()=>{

    }

    mapDrugTables = () =>{
        let items = <tr style={{ width: '100%' }} className="col-md-12" >No drug</tr>

        if (this.state.drugs) {

            items = this.state.drugs.map(drug => {
              return (
                <tr key={drug.id}>
                    <td>{drug.name}</td>
                    <td>{drug.amount}</td>
                    <td>{drug.alias}</td>
                    <td>
                    <Popconfirm
                        title="Are you sure delete this Item?"
                        onConfirm={(e)=>this.deleteDrug(drug)}
                        onCancel={this.cancelDrug()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#" style={{margin:'5px'}} >Delete</a>
                        {/* <a style={{margin:'5px'}} type="button" class="btn btn-primary">Update</a>     */}
                    </Popconfirm>
                        <button type="button" class="btn btn-primary btn-sm">Delete</button>

                            {/* <Button className='m-1' color="primary" size="xs"
                                onClick={() => { this.setPublicationUpdate(item) }}>
                                Update
                            </Button> */}
                            {/* <Button className='m-1' color="danger" size="xs"
                                onClick={() => { this.deleteItem(item) }}>
                                Delete
                            </Button> */}
                    </td>  
                </tr>
              )
            });
        }

        return items;

    }

  render() {
    const bodystyle =  {
        background: "#f1f2f7",
        display: "table",
        fontFamily: "'Open Sans' sans-serif !important",
        fontSize: "16px",
        width: "100%" }

    return (
        <div style={bodystyle}>
        {/* <!-- Left Panel --> */}

            <Navbar></Navbar>
            {/* <!-- /#left-panel --> */}
            {/* <!-- Left Panel --> */}

            {/* <!-- Right Panel --> */}

            <div  class="right-panel ">
                <Header></Header>
                {/* <!-- /header --> */}
                {/* <!-- Header--> */}

                <BreadCrumb menu="User" submenu=" "></BreadCrumb>

                <div class="content mt-3">
                    
                    <div class="animated fadeIn">
                        <Spin spinning={this.state.isloading}>

                            {/* Table for drugs */}
                            <div class="row">

                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong className="card-title">Data Table</strong>
                                    </div>
                                    <div className="card-body">
                                        <Table columns={this.getTableHeader()} dataSource={this.state.users} />
                                    </div>
                                    
                                </div>
                            </div>


                        </div>

                        </Spin>

                    </div>
                </div>
                {/* <!-- .content --> */}
            </div>
            {/* <!-- /#right-panel --> */}

            {/* <!-- Right Panel --> */}
        </div>
    );
  }
}

export default UserPage;
