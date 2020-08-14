import * as api from './api'

// ajax ES6封装
const baseUrl = config.arcgicServices;
export const ajaxPromise = ({ url, type = "get", dataType = "json", data = {f:'pjson'}}) => {
    return new Promise((resovle, reject) => {
        $.ajax({ 
            async: true, //同步，异步
            url: baseUrl + url,
            type, 
            dataType, 
            data, 
            success:res => { resovle(res) },
            error:res => { reject(res) }
        }) 
    })
}


export const ajaxUrlPromise = ({ url, type = "get", dataType = "json", data}) => {
    console.log(dataType, data, url)
    return new Promise((resovle, reject) => {
        $.ajax({ 
            async: true, //同步，异步
            url: url,
            type, 
            dataType, 
            data, 
            success:res => { resovle(res) },
            error:res => { reject(res) }
        }) 
    })
}

export default api
