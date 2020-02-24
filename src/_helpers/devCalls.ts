import axios from 'axios';
import config from '../config';

const body = {
    headers : { 'API_KEY' : `${config.dev_to_api_key}` }
}

const call: CustomObj = {
    all : async () => {
            return axios.get('https://dev.to/api/articles/me/all', 
                    body,
                ).then( (res) =>{
                    return res.data;
                }).catch( (err) =>{
                    return {
                        error : `${err} was sent.`
                    }
                })
            },
    published : async () => {
            return axios.get('https://dev.to/api/articles/me/published', 
                    body,
                ).then( (res) =>{
                    console.log(res.data);
                    return res.data;
                }).catch( (err) =>{
                    console.log(err);
                    return {
                        error : `${err} was sent.`
                    }
                })
            },
    unpublished : async () =>{
            return axios.get('https://dev.to/api/articles/me/unpublished', 
                    body,
                ).then( (res) =>{
                    return res.data;
                }).catch( (err) =>{
                    return {
                        error : `${err} was sent.`
                    }
                })
            },           
}

export default call;