import axios from "axios";

const baseUrl = 'http://localhost:3001/';

const getAll = () => axios.get(`${baseUrl}api/persons`).then(response => response.data);

const createPerson = (newPerson) => axios.post(`${baseUrl}api/persons`, newPerson).then(response => response.data);

const deletePerson = (personID) => axios.delete(`${baseUrl}api/persons/${personID}`).then(response => response.data)

const updatePersonInfo = (personToUpdate) => axios.put(`${baseUrl}api/persons/${personToUpdate.id}`, personToUpdate).then(response => response.data)

export default { baseUrl, getAll, createPerson, deletePerson , updatePersonInfo };