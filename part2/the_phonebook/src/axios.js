import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data);

const createPerson = (newPerson) => axios.post(baseUrl, newPerson).then(response => response.data);

const deletePerson = (personID) => axios.delete(`${baseUrl}/${personID}`).then(response => response.data)

const updatePersonInfo = (personToUpdate) => axios.put(`${baseUrl}/${personToUpdate.id}`, personToUpdate).then(response => response.data)

export default { getAll, createPerson, deletePerson , updatePersonInfo };