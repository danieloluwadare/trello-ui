import React, { Component } from 'react';
import Header from '../../partials/header';
import Navbar from '../../partials/navbar'
import BreadCrumb from '../../partials/breadcrumb'
import {fetchAllUsers,unBlockUser,blockUser} from './dashboard-api'
import{tasks} from './dashboard-datasource'
import TaskForm from '../../common/TaskForm'
// import {hasAuthority} from  '../../utils/api-utils'

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Modal,
    Select,
    Button,
    Row,
    Col,
    Spin,
    notification,Popconfirm,Table, Divider, Tag 
  } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
class DashboarPage extends Component  {
    constructor(props) {
        super(props);
        this.state={
            tasks:[],
            name:"",
            description:"",
            status:"",
            completionDate:"",
            isloading:true
        }
            // this.onsubmitDrug = this.onsubmitDrug.bind(this);

    }

    componentDidMount(){
        this.getAllTask()
    } 

    getTaskStatus = (status)=>{
        let badge ={}
        if(status=="Completed"){
            badge = {clazz:"badge badge-success", display:"Completed"}
        } 
        else if(status=="pending"){
            badge = {clazz:"badge badge-info", display:"Pending"}
        }
        else if(status=="started"){
            badge = {clazz:"badge badge-primary", display:"Started"}
        }
        else if(status=="cancelled"){
            badge = {clazz:"badge badge-danger", display:"Cancelled"}
        }  
        return (
            <span className={badge.clazz}>
                {badge.display}
            </span>
        );                  
    }

    getTableHeader = ()=>{
        
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: status => (
                    <span>
                        {this.getTaskStatus(status)}  
                    </span>
                  ),
            },
            {
                title: 'Date completed',
                dataIndex: 'completionDate',
                key: 'completionDate',
            },
           

          ];

        return columns
    }

    
    

    getAllTask = () =>{
        this.setState({isloading:true})
        this.setState({tasks:tasks})
        this.setState({isloading:false})
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
                        <div className="row">
                            <div className="col-md-12">
                                <Form  layout="inline"onSubmit={this.handleSubmit} className="signup-form">
                                    <FormItem
                                        // label="Name"
                                        // validateStatus={this.state.name.validateStatus}
                                        // help={this.state.name.errorMsg}
                                        >
                                        <Input
                                            size="large"
                                            name="name"
                                            autoComplete="off"
                                            placeholder="Task Name name"
                                            value={this.state.name.value}
                                            onChange={(event) => this.handleInputChange(event, this.validateInput)}/>
                                    </FormItem>

                                    <FormItem
                                        // label="Amount"
                                        // validateStatus={this.state.amount.validateStatus}
                                        // help={this.state.amount.errorMsg}
                                        >
                                        <Input
                                            size="large"
                                            name="amount"
                                            autoComplete="off"
                                            placeholder="Description"
                                            value={this.state.description.value}
                                            onChange={(event) => this.handleInputChange(event, this.validateInput)}/>
                                    </FormItem>

                                    <FormItem
                                        // label="Alias"
                                        // validateStatus={this.state.alias.validateStatus}
                                        // help={this.state.alias.errorMsg}
                                        >
                                        <Select defaultValue="jack" style={{ width: 120 }} onChange={this.handleChange}>
                                            <Option value="jack">Completed</Option>
                                            <Option value="lucy">Pending</Option>
                                            <Option value="Yiminghe">Started</Option>
                                            <Option value="Yiminghe">Cancelled</Option>

                                        </Select>
                                        {/* <Input
                                            size="large"
                                            name="alias"
                                            autoComplete="off"
                                            placeholder="status"
                                            value={this.state.status.value}
                                            onChange={(event) => this.handleInputChange(event, this.validateInput)}/> */}
                                    </FormItem>

                                    <FormItem
                                        // label="Alias"
                                        // validateStatus={this.state.alias.validateStatus}
                                        // help={this.state.alias.errorMsg}
                                        >
                                        <Input
                                            size="large"
                                            name="Target Date"
                                            autoComplete="off"
                                            placeholder="completion Date"
                                            value={this.state.completionDate.value}
                                            onChange={(event) => this.handleInputChange(event, this.validateInput)}/>
                                    </FormItem>

                                    <FormItem>
                                        <Button type="primary" icon="search">
                                            Search
                                        </Button>
                                    </FormItem>
                            
                                </Form>
                            </div>
                            
                        </div>
                        <Spin spinning={this.state.isloading}>

                            {/* Table for drugs */}
                            <div class="row">


                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong className="card-title">Data Table</strong>
                                        <span className="pull-right">
                                            {/* <button type="submit" className="btn pull-right btn-primary btn-flat m-b-30 m-t-30">Create</button> */}
                                            <Button type="primary" onClick={()=>{ this.setState({visible:true})}}>
                                                 CreateTask<Icon type="plus-circle" />
                                            </Button>
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <Table columns={this.getTableHeader()} dataSource={this.state.tasks} />
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="col-md-12">
                                {/*TAskForm Modal  */}
                                <TaskForm visible={this.state.visible} close={()=>{this.setState({visible:false})}}></TaskForm>
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

export default DashboarPage;
