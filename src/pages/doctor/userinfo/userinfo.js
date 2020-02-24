import React, { Component } from 'react';
import Header from '../../../partials/header';
import Navbar from '../../../partials/navbar'
import BreadCrumb from '../../../partials/breadcrumb'
import {fetchOneUser,fetchOneUserAuditTrail,fetchAllroles,updateUserRoles} from './userinfo-api'
import {hasAuthority} from  '../../../utils/api-utils'
import {
    Form,
    Input,
    Divider,
    Icon,Card, Avatar,Checkbox,Modal,
    Spin,
    notification,Popconfirm
  } from 'antd';
  import AuditTrailTable from '../../../common/AuditTableComponent'


const { Meta } = Card;

class UserInfoPage extends Component  {
    constructor(props) {
        super(props);
        this.state={
            user:{roles:[]},
            systemRoles:[],
            userId:null,
            auditTrails:[],
            isloading:true,
            isUserloading:true,
            checkBoxModal:{
                title:'',
                roles:[]
            },
            visible:false,
            newUserRoles:[]
        }
           
    }

    componentDidMount(){
        const {match: { params }} = this.props;
        this.setState({userId:params.userId})
        this.getSingleUser(params.userId)
        this.getSingleUserAuditTrails(params.userId)
        this.getAllRoles()
    }

    
    
    getAllRoles(){
        this.setState({isUserloading:true})
        fetchAllroles()
        .then(response=>{
            console.log("Roles Response");
            console.log(response.data)
            this.setState({systemRoles:response.data})
            this.setState({isUserloading:false})
        })
        .catch((error)=> {
            console.log("Roles Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `An Error Occured Fetching Roles .`,
            });

            this.setState({isUserloading:false})
            console.log(error);

        });
    }

    getSingleUser = (userId) =>{
        this.setState({isUserloading:true})
        fetchOneUser(userId)
        .then(response=>{
            console.log("Users Response");
            console.log(response.data)
            this.setState({user:response.data})
            this.setState({isUserloading:false})
        })
        .catch((error)=> {
            console.log("User Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `An Error Fetching User .`,
            });

            this.setState({isUserloading:false})
            console.log(error);

        });
    }

    getSingleUserAuditTrails = (userId) =>{
        this.setState({isloading:true})
        fetchOneUserAuditTrail(userId)
        .then(response=>{
            console.log("Audit one Response");
            console.log(response.data)
            this.setState({auditTrails:response.data})
            this.setState({isloading:false})
        })
        .catch((error)=> {
            console.log("Audit Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `An Error Fetching Audit Trail .`,
            });

            this.setState({isloading:false})
            console.log(error);

        });
    }

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

    onSelectRole = (roles)=>{

        notification['info']({
            message: 'MEDTHREAT',
            description:
                `${roles.length} Roles Selected .`,
        });

        this.setState({newUserRoles:roles})
        console.log('checked = ', roles);
    }

    addRolesToUser=()=>{
        this.setState({visible:false})

        let userRoles = this.state.user.roles
        let systemRoles= this.state.systemRoles
        let unAllocatedRoles = systemRoles.map(systemRole=>{
            if(!userRoles.includes(systemRole)){
                return systemRole
            }

        })
        
        let options = [];
        unAllocatedRoles.forEach(unAllocatedRole=>{
            let obj = { label: unAllocatedRole.name, value: unAllocatedRole.id }
            options.push(obj);
        })

        this.setState({checkBoxModal:{title:"Allocate Roles",roles:options}})

        this.setState({visible:true})


        console.log("lol")
    }

    removeRolesToUser=()=>{
        this.setState({visible:false})

        let userRoles = this.state.user.roles        
        
        let options = [];
        userRoles.forEach(userRole=>{
            let obj = { label: userRole.name, value: userRole.id }
            options.push(obj);
        })

        this.setState({checkBoxModal:{title:"De-Allocate Roles",roles:options}})
        this.setState({visible:true})

        console.log("lol")
    }

    updateRoles=()=>{
        this.setState({visible:false})
        this.setState({isUserloading:false})

        let form={
            userId:this.state.user.id,
            roleIds:this.state.newUserRoles
        }
        updateUserRoles(form)
        .then(response=>{
            console.log("Users Response");
            console.log(response.data)
            // this.setState({user:response.data})
            this.getSingleUser(this.state.user.id)
            this.setState({isUserloading:false})
            
            notification['success']({
                message: 'MEDTHREAT',
                description:
                    `Updated User Role Successfully .`,
                });
        })
        .catch((error)=> {
            console.log("User Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `Error Updating User Role .`,
            });

            this.setState({isUserloading:false})
            console.log(error);

        });
    }

    canUpdateRole=()=>{
        if(this.state.newUserRoles.length > 0){
            return true
        }
        return false;
    }

    cancelUpdates=()=>{
        this.setState({checkBoxModal:{title:" ",roles:[]}})
        this.setState({newUserRoles:[]})
        this.setState({visible:false})
    }

  render() {
    const bodystyle =  {
        background: "#f1f2f7",
        display: "table",
        fontFamily: "'Open Sans' sans-serif !important",
        fontSize: "16px",
        width: "100%" }

    const {user,checkBoxModal}=this.state
    let plusRole = hasAuthority(["ROLE_ADMIN_BLOCK_USER"]) 
        ? 
        <a onClick={()=>{this.addRolesToUser()}}><Icon type="plus-circle" /></a>
        :
        <a><Icon type="plus-circle" /></a>
        
    let minusRole = hasAuthority(["ROLE_ADMIN_BLOCK_USER"]) 
        ?
        <a onClick={()=>{this.removeRolesToUser()}}><Icon type="minus-circle" key="edit" /></a>
        :
        <a><Icon type="minus-circle" key="edit" /></a>


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

                <BreadCrumb menu="User" submenu="User Information"></BreadCrumb>

                <div class="content mt-3">
                    
                    <div class="animated fadeIn">
                        <div className="row">
                            <Modal
                            title={checkBoxModal.title}
                            visible={this.state.visible}
                            onOk={this.updateRoles}
                            okButtonProps={{ disabled: !this.canUpdateRole() }}
                            onCancel={this.cancelUpdates}
                            okText="UPDATE"
                            >
                            <Checkbox.Group options={checkBoxModal.roles} onChange={this.onSelectRole} />
                                
                            </Modal>
                        </div>
                        <Spin spinning={this.state.isUserloading}>
                            <div class="row">

                                <div className="col-md-12">
                                    <Card style={{ width: "100%", marginTop: 16 }}
                                        actions={[
                                            
                                            plusRole,
                                            minusRole,
                                            <Icon type="ellipsis" key="ellipsis" />,
                                        ]} >
                                        <Meta
                                            avatar={
                                                <Avatar size="large" icon="user" />
                                            }
                                            title="User details"
                                            description="User description"
                                        />
                                        <p><b>FullName</b>: {user.firstName} {user.lastName}</p>
                                        <p><b>Phone Number </b>: {user.phoneNo}</p>
                                        <p><b>Email</b>: {user.email}</p>
                                        <p><b> UnAuthorized Activity Count block</b>: {user.illegalCount}</p>
                                        <p><b> Account Status</b>:  {this.getAccontLockedInfo(user.block)}</p>
                                        <p>
                                            <b>Roles:</b>
                                            {user.roles.map(role => {
                                                return (
                                                    <span>
                                                        <span className="badge badge-secondary">
                                                            {role.name}

                                                        </span>
                                                        <Divider type="vertical" />
                                                    </span>
                                                    
                                                );   
                                            })}

                                        </p>

                                    </Card>
                                    
                                </div>
                                
                            </div>
                        </Spin>

                        <Spin spinning={this.state.isloading}>

                            {/* Table for drugs */}
                            <div class="row">

                                <div className="col-md-12">
                                    <AuditTrailTable auditTrails={this.state.auditTrails}></AuditTrailTable>

                                    {/* <div className="card">
                                        <div className="card-header">
                                            <strong className="card-title">Data Table</strong>
                                        </div>
                                        <div className="card-body">
                                            <Table columns={this.getTableHeader()} dataSource={this.state.users} />
                                        </div>
                                        
                                    </div> */}
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

export default UserInfoPage;
