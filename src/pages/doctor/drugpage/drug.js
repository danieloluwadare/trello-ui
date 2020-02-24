import React, { Component } from 'react';
import Header from '../../../partials/header';
import Navbar from '../../../partials/navbar'
import BreadCrumb from '../../../partials/breadcrumb'
import {fetchAllDrugs,createDrug,updateDeleteDrug,updateCreatedDrug} from './drug-api'
import {hasAuthority,getForbiddenCount} from  '../../../utils/api-utils'

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Switch,
    Modal,
    Spin, 
    notification,
    Popconfirm
  } from 'antd';

const FormItem = Form.Item;

class DrugPage extends Component {
    render() {
        const AntWrappedDrug = Form.create()(Drug);
        return (
            <AntWrappedDrug rediredt ={this.props.history.push} />           
        );
    }
}

class Drug extends Component  {
    constructor(props) {
        super(props);
        this.state={
            drugs:[],
            isloading:true,
            drug:{},
            visible:false,

            name: {
                value: '',
                validateStatus:''
            },
            amount: {
                value: '',
                validateStatus:''
            },
            alias: {
                value: '',
                validateStatus:''
            },

            insiderAttackStatus:false,
            
        }
            this.onsubmitDrug = this.onsubmitDrug.bind(this);
            this.deleteDrug = this.deleteDrug.bind(this);

    }

    componentDidMount(){
        this.getAllDrugs()
    }

    onsubmitDrug = (e) => {
        e.preventDefault();
        this.setState({isloading:true})
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                createDrug(values)
                .then(response =>{
                    console.log(response.data);
                    if(response.data){
                        notification['success']({
                            message: 'MEDTHREAT',
                            description:
                              'Drug Created Successfully',
                          });
                        this.props.form.resetFields();
                        this.getAllDrugs()
                    }
                })
                .catch((error)=> {
                    console.log("Drug Error Response");

              
                    notification['error']({
                    message: 'MEDTHREAT',
                    description:
                        `Error Occured Creating Drug .`,
                    });
                    this.setState({isloading:false})
                    console.log(error.response.status);

                    getForbiddenCount(this.props.rediredt)
        
                });
            }
            this.setState({isloading:false})

        });
    }

    getAllDrugs = () =>{
        this.setState({isloading:true})
        fetchAllDrugs()
        .then(response=>{
            console.log("drug Response");
            console.log(response.data)
            this.setState({drugs:response.data})
            this.setState({isloading:false})
        })
        .catch((error)=> {
            console.log("drug Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `An Error Fetching Drug .`,
            });
            
            console.log(error.response.status);
            getForbiddenCount(this.props.rediredt)
        });
    }

    deleteDrug = (id)=>{
        console.log( id)
        updateDeleteDrug(id)
        .then(response=>{
            console.log("drug Response");
            console.log(response.data)
            this.getAllDrugs()

            // this.setState({drugs:response.data})
            // this.setState({isloading:false})
        })
        .catch((error)=> {
            console.log("drug Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `An Error Occured Deleting Drug .`,
            });
            
            console.log(error);
            // this.props.rediredt("/")

            // let rt = this.props

            // getForbiddenCount(rt)
            getForbiddenCount(this.props.rediredt)

        });
    }

    updateDrug = ()=>{
        this.setState({visible:false})
        const {drug,name, amount, alias}=this.state
        let updatedDrugRequest = {
            id:drug.id,
            name:name.value,
            amount:amount.value,
            alias:alias.value
        }
        updateCreatedDrug(updatedDrugRequest)
        .then(response =>{
            console.log(response.data);
            if(response.data){
                notification['success']({
                    message: 'MEDTHREAT',
                    description:
                      'Drug Updated Successfully',
                  });
                // this.props.form.resetFields();
                this.getAllDrugs()
                this.setState({drug:{}})
            }
        })
        .catch((error)=> {
            console.log("Drug Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `Error Occured Updating Drug .`,
            });
            this.setState({isloading:false})
            console.log(error.response.status);
            getForbiddenCount(this.props.rediredt)

        });

    }

    enableDrugModal =(drug)=>{
        this.setState({drug})
        this.setState({name:{value: drug.name, validateStatus:'success'}})
        this.setState({amount:{value: drug.amount, validateStatus:'success'}})
        this.setState({alias:{value: drug.alias, validateStatus:'success'}})
        this.setState({visible:true})
    }

    cancelDrugModal =(drug)=>{
        
        this.setState({visible:false})
    }

    cancelDrug = ()=>{

    }

    validateInput = (input) => {
        if (input) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        } else {
            
            return {
                validateStatus: 'error',
                errorMsg: `This field is required`
            };
        }
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.amount.validateStatus === 'success' &&
            this.state.alias.validateStatus === 'success' 
                    );
    }

    insiderAttackSwitch = (e)=>{
        console.log("insiderAttackSwitch")
        console.log(e)
        this.setState({insiderAttackStatus:e})
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
                        {
                            hasAuthority(["ROLE_USER_DELETE_DRUG"]) || this.state.insiderAttackStatus
                            ?
                                <Popconfirm
                                    title="Are you sure delete this Item?"
                                    onConfirm={(e)=>this.deleteDrug(drug.id)}
                                    onCancel={this.cancelDrug()}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <button style={{margin:'5px'}} type="button" class="btn btn-danger btn-sm">DELETE</button>    
                                </Popconfirm>
                            :
                            ""
                        }

                        {
                            hasAuthority(["ROLE_USER_UPDATE_DRUG"]) || this.state.insiderAttackStatus
                            ?
                                <button type="button" onClick={(e)=>this.enableDrugModal(drug)} class="btn btn-primary btn-sm">UPDATE</button>
                            :
                            ""
                        }
                    
                    

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
    const {getFieldDecorator} = this.props.form;
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

                <BreadCrumb menu="Drug" submenu=" "></BreadCrumb>

                <div class="content mt-3">
                    
                    <div class="animated fadeIn">
                        <Modal
                        title="UPDATE DRUG Modal"
                        visible={this.state.visible}
                        onOk={this.updateDrug}
                        okButtonProps={{ disabled: this.isFormInvalid() }}
                        onCancel={this.cancelDrugModal}
                        okText="UPDATE"
                        >
                            <div className="row">
                                <Form onSubmit={this.handleSubmit} className="signup-form">
                                    <FormItem
                                        label="Name"
                                        validateStatus={this.state.name.validateStatus}
                                        help={this.state.name.errorMsg}>
                                        <Input
                                            size="large"
                                            name="name"
                                            autoComplete="off"
                                            placeholder="Drug name"
                                            value={this.state.name.value}
                                            onChange={(event) => this.handleInputChange(event, this.validateInput)}/>
                                    </FormItem>

                                    <FormItem
                                        label="Amount"
                                        validateStatus={this.state.amount.validateStatus}
                                        help={this.state.amount.errorMsg}>
                                        <Input
                                            size="large"
                                            name="amount"
                                            autoComplete="off"
                                            placeholder="Amount in number e.g 100"
                                            value={this.state.amount.value}
                                            onChange={(event) => this.handleInputChange(event, this.validateInput)}/>
                                    </FormItem>

                                    <FormItem
                                        label="Alias"
                                        validateStatus={this.state.alias.validateStatus}
                                        help={this.state.alias.errorMsg}>
                                        <Input
                                            size="large"
                                            name="alias"
                                            autoComplete="off"
                                            placeholder="Alias e.g Pz"
                                            value={this.state.alias.value}
                                            onChange={(event) => this.handleInputChange(event, this.validateInput)}/>
                                    </FormItem>
                                    
                                    {/* <FormItem>
                                        <Button type="primary"
                                                htmlType="submit"
                                                size="large"
                                                className="signup-form-button"
                                                disabled={this.isFormInvalid()}>Update</Button>
                                    </FormItem> */}
                                </Form>
                            </div>
                            
                        </Modal>


                        <Spin spinning={this.state.isloading}>
                            {/* Table for drugs */}
                            <div className="row">
                            {
                                hasAuthority(["ROLE_USER_CREATE_DRUG"]) || this.state.insiderAttackStatus
                                ?

                                    
                                    <div class="col-lg-9">
                                        <div class="card">
                                            <div class="card-header">
                                                <strong>Drug</strong>
                                                <small> Form</small>
                                            </div>
                                            <form onSubmit={this.onsubmitDrug}>
                                                <div class="card-body card-block">
                                                    <div class="form-group">
                                                        <FormItem>
                                                            <label  class=" form-control-label">
                                                                Name
                                                            </label>
                                                            {getFieldDecorator('name', {
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input your Name!'
                                                                    }
                                                                ]
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="lock"/>}
                                                                    name="name"
                                                                    placeholder="Enter your Drug name"
                                                                />

                                                            )}
                                                        </FormItem>    
                                                    </div>
                                                    <div class="form-group">
                                                        <FormItem>
                                                            <label for="company" class=" form-control-label">
                                                                Amount
                                                            </label>
                                                            {getFieldDecorator('amount', {
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input Amount!'
                                                                    }
                                                                ]
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="lock"/>}
                                                                    name="amount"
                                                                    placeholder="Enter your Amount"
                                                                />

                                                            )}
                                                        </FormItem>    
                                                    </div>

                                                    <div class="form-group">
                                                        <FormItem>
                                                            <label for="company" class=" form-control-label">
                                                                Alias
                                                            </label>
                                                            {getFieldDecorator('alias', {
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input Alias !'
                                                                    }
                                                                ]
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="lock"/>}
                                                                    name="alias"
                                                                    placeholder="Enter your Drug Alias"
                                                                />

                                                            )}
                                                        </FormItem>    
                                                    </div>

                                                    <div class="form-group">
                                                        <FormItem>
                                                            <button type="submit" className="btn pull-right btn-primary btn-flat m-b-30 m-t-30">Create</button>
                                                        </FormItem>
                                                    </div>

                                                    

                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                    
                                 
                                 : 
                                 
                                 " "
                            }
                                <div class="col-lg-3">
                                    <div class="card">
                                        <div class="card-header">
                                            <strong>Insider</strong>
                                            <small> Attacker</small>
                                        </div>
                                        <div className="card-body">
                                            <Switch 
                                            checkedChildren="Enabled" 
                                            unCheckedChildren="Disabled" 
                                            onChange={(e)=>this.insiderAttackSwitch(e)} 
                                            />
                                        </div>
                                        
                                    </div>

                                </div>

                            </div>
                            

                            {/* Table for drugs */}
                            <div class="row">

                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <strong className="card-title">Data Table</strong>
                                        </div>
                                        <div className="card-body">
                                            <table id="bootstrap-data-table-export" className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Amount</th>
                                                        <th>Alias</th>
                                                        {
                                                            hasAuthority(["ROLE_USER_UPDATE_DRUG","ROLE_USER_DELETE_DRUG"]) || this.state.insiderAttackStatus
                                                            ?
                                                                <th>Settings</th>
                                                            :
                                                            ""
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.mapDrugTables()}  
                                                </tbody>
                                            </table>
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

export default DrugPage;
