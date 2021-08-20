import axios from 'axios'

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
   return axios.get(baseUrl).then(answer => answer.data)
}

const create = (newContact) => {
  return  axios
    .post(baseUrl, newContact)
}

const deleteContact = (id) => {
   return axios
        .delete(`${baseUrl}/${id}`)
        .then(console.log("deleted"))
        
}

const update = (newContact) => {
  console.log(newContact)
 return   axios
      .put(`${baseUrl}/${newContact.id}`, newContact)
      .then(response => response.data);

}
export default {getAll, create, deleteContact, update}