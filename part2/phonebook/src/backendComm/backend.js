import axios from 'axios'
const baseUrl = 'http://localhost:3003/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => {
        console.log("fulfilled get REQ");
        return response.data})
}

const addNumb = newNumb => {
    const request = axios.post(baseUrl, newNumb);
    return request.then(response => {
        return response.data})
}

const deleteElem = (id) => {
    const urlElem = baseUrl+"/"+id;
    const request = axios.delete(urlElem);
    return request.then(response => response.data);
}

const replace = (id, newNumb) => {
    const urlElem = baseUrl+"/"+id;
    const request = axios.put(urlElem, newNumb);
    return request.then(response => response.data);
}

const backend = {getAll, addNumb, deleteElem, replace}; 

export default backend;