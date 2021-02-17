import axios from 'axios'
const baseUrl = 'http://localhost:3001/students'

const getAll = () => {
	return axios.get(baseUrl)
}

const create = studentObject => {
	return axios.post(baseUrl, studentObject)
}

const update = (id, studentObject) => {
	return axios.put(`${baseUrl}/${id}`, studentObject)
}

const remove = id => {
	return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove
}