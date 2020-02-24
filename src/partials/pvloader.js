{/* <div className="auth-wrapper">
            <div className="auth-content">
                <div className="auth-bg">
                    <span className="r"></span>
                    <span className="r s"></span>
                    <span className="r s"></span>
                    <span className="r"></span>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <i className="feather icon-unlock auth-icon"></i>
                        </div>
                        <h3 className="mb-4">Sign Up</h3>
                        <Form onSubmit={this.onSubmitExperience} >

                            <div className="row">
                                <div className="col-md-12">
                                    <FormItem>
                                        {getFieldDecorator('firstName', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Password!'
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
                                                    message: 'Please input your Password!'
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
                                                    message: 'Please input your Password!'
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
                                <button className="btn btn-primary shadow-2 mb-4">Sign Up</button>
                            </FormItem>
                        </Form>

                        
                        
                        <p className="mb-2 text-muted">Forgot password? <a href="auth-reset-password.html">Reset</a></p>
                        <p className="mb-0 text-muted">Don’t have an account? <a href="auth-signup.html">Signup</a></p>
                    </div>
                </div>
            </div>
        </div> */}