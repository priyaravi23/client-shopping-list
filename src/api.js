const axios = require('axios');
const BASE_URL = 'http://localhost:8000';

export const listItems = () => {
    return axios({
        url: `${BASE_URL}/items`,
        method: 'get',
    });
};
export const getItem = id => {
    return axios({
        url: `${BASE_URL}/items/${id}`,
        method: 'get',
    });
};
export const createItem = item => {
    console.log('making a post request ... ');
    return axios({
        url: `${BASE_URL}/items`,
        method: 'post',
        data: item,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export const updateItem = item => {
    return axios({
        url: `${BASE_URL}/items/${item.id}`,
        method: 'put',
        data: item
    });
};
export const deleteItem = id => {
    return axios({
        url: `${BASE_URL}/items/${id}`,
        method: 'delete',
    });
};

