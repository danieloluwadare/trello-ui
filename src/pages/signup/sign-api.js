import {APP_ACCESS_TOKEN,API_BASE_URL,GETMETHOD,POSTMETHOD,PUTMETHOD,DELETEMETHOD} from '../../constants';
import { notification} from 'antd';
import {axiosRequest} from  '../../utils/api-utils'



export function login(loginRequest) {
    loginRequest.grant_type = 'password';
    loginRequest.scope = 'profile';

    let formBody = [];
    for (let property in loginRequest) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(loginRequest[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return axiosRequest({
        url: API_BASE_URL + '/oauth/token',
        method: POSTMETHOD,
        body: formBody,
        useBasic: true
    });
} 

const getBasicAuthentication = async ()=>{
    // const options =  
    // { headers:
    //      {'Content-Type': 'application/json', 'Authorization': `${getBasicAuth(APP_CLIENT, APP_PASS)}` } 
    // };
    const formData = new FormData();
    formData.append("grant_type","client_credentials")
    // let data = {"grant_type":"client_credentials"}
    // this doesnt work
    // return axios.post(`${API_BASE_URL}/oauth/token`,formData, options)

    await axiosRequest({
        useBasic: true,
        data: formData,
        url: `${API_BASE_URL}/oauth/token`,
        method: POSTMETHOD
    }).then(response =>{
        console.log("calling getBasicAuthentication")
        localStorage.setItem(APP_ACCESS_TOKEN, response.data.access_token);

    }).catch((error)=> {
        
        notification['error']({
            message: 'MEDTHREAT',
            description:
              `Server Error occured .`,
          });
          
        console.log(error);

    });;
}

export const signUp= async(form)=>{
    console.log("signUp")
     await getBasicAuthentication()
    
     return axiosRequest({
        useAppAccessToken: true,
        data: form,
        url: `${API_BASE_URL}/api/v1/user/create-sign-up`,
        method: POSTMETHOD,
    })
}

