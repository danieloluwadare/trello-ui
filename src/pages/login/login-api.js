import {API_BASE_URL, APP_CLIENT, APP_PASS, PAGE_SIZE, CLIENT_TOKEN,GETMETHOD,POSTMETHOD,PUTMETHOD} from '../../constants';
import {axiosLoginRequest,storeJwtAccessToken,storeJwtExpireToken} from  '../../utils/api-utils'
import axios from 'axios';



export function login(loginRequest) {
    loginRequest.grant_type = 'password';
    loginRequest.scope = 'profile';

    let formBody = [];
    for (let property in loginRequest) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(loginRequest[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
    }

    // const formData = new FormData();

    // for (let property in loginRequest) {
    //     let formDataKey = property;
    //     let formDataValue = loginRequest[property];
    //     formData.append(formDataKey,formDataValue )
    // }
    formBody = formBody.join('&');
    console.log(formBody);

    // let head = {headers:{"Authorization": "Basic bWVkdGhyZWF0OjEyMzQ1Ng==",'Content-Type': "application/x-www-form-urlencoded"}, data:{}}
    // console.log(head);
    // return axios.post(API_BASE_URL + '/oauth/token',formBody, head)

    // options.url, options.data, options.headerRequest
    return axiosLoginRequest({
        url: API_BASE_URL + '/oauth/token',
        method: POSTMETHOD,
        data: formBody,
        useBasic: true,
        // headerType: 'application/json'

        headerType: 'application/x-www-form-urlencoded'
    });
}

export const storeToken= (token) =>{
    storeJwtAccessToken(token.access_token);
    storeJwtExpireToken(token.expires_in)
}


