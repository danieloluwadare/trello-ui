import React, { Component } from 'react';
import {
    Table, Divider, Tag 
  } from 'antd';

class AuditTrailTable extends Component  {
    constructor(props) {
        super(props);
    }

    
     

    getLegalStatusTag = (legal_status)=>{
        let clazzName = "badge badge-primary"
        if(legal_status=="LEGAL"){
            clazzName="badge badge-success"
        }
        else if(legal_status=="ILLEGAL"){
            clazzName="badge badge-danger"
        }
        
        return (
            <span className={clazzName}>
                {legal_status}
            </span>
        );
        
                        
    }

    getUserFullName(user){
        let fullname=""
        if(user && user!=null){
            fullname = `${user.firstName} ${user.lastName}`
        }

        return(
            <span> 
                {fullname}                     
            </span>
        )
        

    }
    getTableHeader = ()=>{
        const columns = [
            {
              title: 'Full Name',
              dataIndex: 'user',
              key: 'user',
              render: user => (
                this.getUserFullName(user)
              ),
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            // {
            //   title: 'Request',
            //   dataIndex: 'request',
            //   key: 'request',
            // },
            {
                title: 'Target Url',
                dataIndex: 'target_url',
                key: 'target_url',
            },

            {
                title: 'ip',
                dataIndex: 'ip',
                key: 'ip',
            },
            
            {
                title: 'Legal Status',
                dataIndex: 'legal_status',
                key: 'legal_status',
                render: legal_status => (
                    <span>
                        {this.getLegalStatusTag(legal_status)}
                        
                      
                    </span>
                  ),
            },
           
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
            },
          ];

          return columns
    }

    

  render() {
    

    return (
        <div className="card">
            <div className="card-header">
                <strong className="card-title">Audit Table</strong>
            </div>
            <div className="card-body">
                <Table columns={this.getTableHeader()} expandedRowRender={record => <p style={{ margin: 0 }}>{record.request}</p>}  dataSource={this.props.auditTrails} />
            </div>
            
        </div>
    );
  }
}

export default AuditTrailTable;
