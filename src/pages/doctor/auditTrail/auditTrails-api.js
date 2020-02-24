import {APP_ACCESS_TOKEN,API_BASE_URL,GETMETHOD,POSTMETHOD,PUTMETHOD,DELETEMETHOD} from '../../../constants';
import { notification} from 'antd';
import {axiosRequest} from  '../../../utils/api-utils'





export const fetchAllAuditTrails= async(form)=>{
    console.log("fetchAllAuditTrails")    
     return axiosRequest({
        userAccessToken: true,
        headerType:`application/json`,
        headerTypeData:true,
        url: `${API_BASE_URL}/api/v1/audit/get-all-audits/validate`,
        method: GETMETHOD
    })
}


