import {APP_ACCESS_TOKEN,API_BASE_URL,GETMETHOD,POSTMETHOD,PUTMETHOD,DELETEMETHOD} from '../../../constants';
import { notification} from 'antd';
import {axiosRequest} from  '../../../utils/api-utils'





export const fetchAllDrugs= async(form)=>{
    console.log("fetchAllDrugs")    
     return axiosRequest({
        userAccessToken: true,
        headerType:`application/json`,
        headerTypeData:true,
        url: `${API_BASE_URL}/api/v1/drug/get-all-drugs/validate`,
        method: GETMETHOD
    })
}

export const createDrug= async(form)=>{
    console.log("createDrug")    
     return axiosRequest({
        userAccessToken: true,
        data:{requestBody:form},
        headerType:`application/json`,
        headerTypeData:true,
        url: `${API_BASE_URL}/api/v1/drug/create-drug`,
        method: POSTMETHOD
    })
}

export const updateDeleteDrug= async(id)=>{
    console.log("deleteDrug")    
     return axiosRequest({
        userAccessToken: true,
        headerType:`application/json`,
        headerTypeData:true,
        url: `${API_BASE_URL}/api/v1/drug/delete-drug/${id}`,
        method: DELETEMETHOD
    })
}

export const updateCreatedDrug= async(form)=>{
    console.log("createDrug")    
     return axiosRequest({
        userAccessToken: true,
        data:form,
        headerType:`application/json`,
        headerTypeData:true,
        url: `${API_BASE_URL}/api/v1/drug/update-drug`,
        method: PUTMETHOD
    })
}

