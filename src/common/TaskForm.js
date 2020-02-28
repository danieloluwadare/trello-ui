import React, { Component } from 'react';
// import {hasAuthority} from  '../../utils/api-utils'

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Modal,
    Select,
    Button,
  } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class TaskForm extends Component {
    render() {
        const AntWrappedTaskForm = Form.create()(CreateTaskForm);
        return (
            // rediredt ={this.props.history.push} 
            <AntWrappedTaskForm visibility={this.props.visible} close={this.props.close} />           
        );
    }
}

class CreateTaskForm extends Component{

    constructor(props) {
        super(props);
        this.state={
            tasks:[],
            name:"",
            description:"",
            status:"",
            completionDate:"",
        }
            // this.onsubmitDrug = this.onsubmitDrug.bind(this);

    }

    closeModal =(drug)=>{
        this.props.close()
    }
    
    handleChange=(value)=>{
        console.log(`selected ${value}`);
    }


    render(){
        return(

            <Modal
                title="Create Task "
                visible={this.props.visibility}
                onOk={this.updateDrug}
                // okButtonProps={{ disabled: this.isFormInvalid() }}
                onCancel={this.closeModal}
                okText="UPDATE"
                >
                    <div className="row">
                        <Form onSubmit={this.handleSubmit} className="signup-form">
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
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="jack">Completed</Option>
                        <Option value="lucy">Pending</Option>
                        <Option value="Yiminghe">Started</Option>
                        <Option value="gjjjh">Cancelled</Option>
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

        )
    }
}

export default TaskForm



