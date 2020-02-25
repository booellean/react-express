import axios from 'axios';
import config from './../config';

const body = {
    headers : { 'API_KEY' : `${config.dev_to_api_key}` }
}

// NOTE: Adjust as necessary for your API/DB calls. They can be called like call.published().then...
// NOTE: The headers are set with the variable above. If every call you make needs, custom headers, it would be better to change
// 'body' to { headers : { 'API_KEY' : 'the_config_key'} }

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
    article : async (id) => {
                // return axios.get(`https://dev.to/api/articles/${id}`, 
                // TODO: Change this back, only testing unpublished articles
                return axios.get('https://dev.to/api/articles/150589',
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
                    return res.data;
                }).catch( (err) =>{
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