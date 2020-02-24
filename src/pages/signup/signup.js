import React, { Component } from 'react';
import {signUp} from '../signup/sign-api'
import {
    Link,
  } from "react-router-dom";
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    Spin,
    notification
  } from 'antd';

const FormItem = Form.Item;

class Signup extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(SignupForm);
        return (
            <AntWrappedLoginForm onLogin={this.props.onLogin}/>           
        );
    }
}

class SignupForm extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            isloading:false
           }
        this.onSubmitExperience = this.onSubmitExperience.bind(this);

    }

    onSubmitExperience = (e) => {
        e.preventDefault();
        this.setState({isloading:true})

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                signUp(values)
                .then(response=>{
                    console.log(response);
                    notification['success']({
                        message: 'MEDTHREAT',
                        description:
                          'Successfully registered.',
                      });
                    this.props.form.resetFields();
                    this.setState({isloading:false})

                }).
                catch((error)=> {
                    if(error.response){
                      console.log(error.response);
                      if(error.response.data.status == 400){
                        notification['error']({
                            message: 'MEDTHREAT',
                            description:
                              `${error.response.data.status} Error occured .`,
                          });
                            console.log(error.response.status);
                            this.setState({isloading:false})

                      }
                      notification['error']({
                        message: 'MEDTHREAT',
                        description:
                          `An Error occured .`,
                      });
                      
                      console.log(error.response.status);
                      this.setState({isloading:false})


                    }
                    this.setState({isloading:false})

                });
                // let loginRequests=values;
                // console.log(loginRequests);
                // loginRequest.data={};
                // console.log(loginRequest);
                // console.log(loginRequests.username);
                // console.log(loginRequests.password);




                // login(loginRequest)
                //     .then(response => {
                //         initiateUser(response.access_token);
                //         this.props.onLogin();
                //     })
                //     .catch(error => {
                //         if (error.status === 401 || (error.error_description === 'Bad credentials')) {
                //             notification.error({
                //                 message: APP_NAME,
                //                 description:
                //                     'Your Username or Password is incorrect. Please try again!'
                //             });
                //         } else {
                //             notification.error({
                //                 message: APP_NAME,
                //                 description:
                //                     error.message ||
                //                     'Sorry! Something went wrong. Please try again!'
                //             });
                //         }
                //     });
            }
        });
    }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
        <div className="bg-dark" style={{height: "100vh"}}>
            <div className="bg-dark sufee-login d-flex align-content-center flex-wrap">
                <div className="container">
                    <div className="login-content">
                        <div className="login-logo">
                            <h2>MEDTHREAT</h2>
                        </div>
                        <div className="login-form">
                            <Spin spinning={this.state.isloading}>
                                <form onSubmit={this.onSubmitExperience}>
                                    {/* <div className="form-group">
                                        <label>User Name</label>
                                        <input type="email" className="form-control" placeholder="User Name">
                                    </div> */}

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormItem>
                                                {getFieldDecorator('firstName', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your First Name!'
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        prefix={<Icon type="lock"/>}
                                                        name="firstName"
                                                        placeholder="First Name"
                                                    />

                                                )}
                                            </FormItem> 
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormItem>
                                                {getFieldDecorator('lastName', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your lastName!'
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        prefix={<Icon type="lock"/>}
                                                        name="lastName"
                                                        placeholder="Last Name"
                                                    />

                                                )}
                                            </FormItem> 
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormItem>
                                                {getFieldDecorator('email', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your email!'
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        className="form-control"
                                                        prefix={<Icon type="user"/>}
                                                        name="email"
                                                        placeholder=" Email"
                                                    />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormItem>
                                                {getFieldDecorator('phoneNo', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your phoneNo!'
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        prefix={<Icon type="lock"/>}
                                                        name="phoneNo"
                                                        placeholder="Phnoe Number"
                                                    />

                                                )}
                                            </FormItem> 
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormItem>
                                                {getFieldDecorator('password', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your Password!'
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        prefix={<Icon type="lock"/>}
                                                        name="password"
                                                        type="password"
                                                        placeholder="Password"
                                                    />

                                                )}
                                            </FormItem> 
                                        </div>
                                    </div>
                                    
                                    <FormItem>
                                        <button type="submit" className="btn btn-primary btn-flat m-b-30 m-t-30">Register</button>
                                    </FormItem>                                        
                                    <div className="register-link m-t-15 text-center">
                                        <p>Already have account ? <Link to={`/`} >Sign in</Link></p>
                                    </div>
                                </form>
                            </Spin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Signup;