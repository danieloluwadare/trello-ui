import React, { Component } from 'react';
import Header from '../../../partials/header';
import Navbar from '../../../partials/navbar'
import BreadCrumb from '../../../partials/breadcrumb'
import {fetchAllAuditTrails} from './auditTrails-api'
import {Spin,notification,Popconfirm,Table, Divider, Tag} from 'antd';
import AuditTrailTable from '../../../common/AuditTableComponent'
import {hasAuthority} from  '../../../utils/api-utils'


class AuditTrailPage extends Component  {
    constructor(props) {
        super(props);
        this.state={
            auditTrails:[],
            isloading:true
        }
            // this.onsubmitDrug = this.onsubmitDrug.bind(this);
            // this.deleteDrug = this.deleteDrug.bind(this);

    }

    componentDidMount(){

        this.getAllAuditTrails()
    }

    getAllAuditTrails = () =>{
        this.setState({isloading:true})
        fetchAllAuditTrails()
        .then(response=>{
            console.log("drug Response");
            console.log(response.data)
            this.setState({auditTrails:response.data})
            this.setState({isloading:false})
        })
        .catch((error)=> {
            console.log("drug Error Response");
      
            notification['error']({
            message: 'MEDTHREAT',
            description:
                `An Error Fetching Drug .`,
            });
            
            console.log(error.response);

        });
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

                <BreadCrumb menu="Audit Trail" submenu=""></BreadCrumb>

                <div class="content mt-3">
                    
                    <div class="animated fadeIn">
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
                                        <Table columns={this.getTableHeader()} dataSource={this.state.auditTrails} />
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

export default AuditTrailPage;
