import {APP_ACCESS_TOKEN,API_BASE_URL,GETMETHOD,POSTMETHOD,PUTMETHOD,DELETEMETHOD} from '../../../constants';
import { notification} from 'antd';
import {axiosRequest} from  '../../../utils/api-utils'





export const fetchOneUser= async(userid)=>{
    console.log("fetchOneUser")    
     return axiosRequest({
        userAccessToken: true,
        headerType:`application/json`,
        headerTypeData:true,
        url: `${API_BASE_URL}/api/v1/user/get-user-by-id/${userid}`,
        method: GETMETHOD
    })
}

export const fetchOneUserAuditTrail= async(userid)=>{
    console.log("fetchOneUserAuditTrail")    
     return axiosRequest({
        userAccessToken: true,
        headerType:`application/json`,
        headerTypeData:true,
        url: `${API_BASE_URL}/api/v1/audit/get-all-audits-by-userId/${userid}`,
        method: GETMETHOD
    })
}

export const fetchAllroles= async()=>{
    console.log("fetchAllroles")    
     return axiosRequest({
        userAccessToken: true,
        headerType:`application/json`,
        headerTypeData:true,
        url: `${API_BASE_URL}/api/v1/role/get-all-roles/validate`,
        method: GETMETHOD
    })
}

export const updateUserRoles= async(form)=>{
    console.log("fetchAllroles")    
     return axiosRequest({
        userAccessToken: true,
        data:{requestBody:form},
        headerType:`application/json`,
        headerTypeData:true,
        url: `${API_BASE_URL}/api/v1/user/update-user-roles-email`,
        method: PUTMETHOD
    })
}


