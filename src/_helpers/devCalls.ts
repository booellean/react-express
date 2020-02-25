import axios from 'axios';
import config from './../config';

const body = {
    headers : { 'API_KEY' : `${config.dev_to_api_key}` }
}

// NOTE: Adjust as necessary for your API/DB calls. They can be called like call.published().then...
// NOTE: The headers are set with the variable above. If every call you make needs, custom headers, it would be better to change
// 'body' to { headers : { 'API_KEY' : 'the_config_key'} }

const call: CustomObj = {
    all : async (amount = 1000, page = 1, prev = []) => {
            return axios.get(`https://dev.to/api/articles/me/all?per_page=${amount}&page=${page}`, 
                    body,
                ).then( (res) =>{
                    return res.data;
                }).then( (arr) =>{
                    const total = [...prev, ...arr];
                    if(arr.length < amount){
                        return total;
                    }else{
                        return call.all(amount, page += 1,  total);
                    }
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
    published : async (amount = 1000, page = 1, prev = []) => {
            return axios.get(`https://dev.to/api/articles/me/published?per_page=${amount}&page=${page}`, 
                    body,
                ).then( (res) =>{
                    return res.data;
                }).then( (arr) =>{
                    const total = [...prev, ...arr];
                    if(arr.length < amount){
                        return total;
                    }else{
                        return call.published(amount, page += 1,  total);
                    }
                }).catch( (err) =>{
                    return {
                        error : `${err} was sent.`
                    }
                })
            },
    unpublished : async (amount = 1000, page = 1, prev = []) =>{
            return axios.get(`https://dev.to/api/articles/me/unpublished?per_page=${amount}&page=${page}`, 
                    body,
                ).then( (res) =>{
                    return res.data;
                }).then( (arr) =>{
                    const total = [...prev, ...arr];
                    if(arr.length < amount){
                        return total;
                    }else{
                        return call.unpublished(amount, page += 1,  total);
                    }
                }).catch( (err) =>{
                    return {
                        error : `${err} was sent.`
                    }
                })
            },           
}

export default call;