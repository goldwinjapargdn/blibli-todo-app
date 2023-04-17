import axios from 'axios'

const api = {
  todo: '/api/todo'
}

const getTodos = (callback, errHandler) => {
  axios.get(api.todo)
    .then(response => callback(response))
    .catch(response => errHandler(response))
}

const getTodo = (callback, errHandler, id) => {
  axios.get(api.todo + '/' + id)
    .then(response => callback(response))
    .catch(response => errHandler(response))
}

const upsertTodo = (callback, errHandler, data) => {
  axios.post(api.todo, data)
    .then(response => callback(response))
    .catch(response => errHandler(response))
}

const deleteTodo = (callback, errHandler, id) => {
  axios.delete(api.todo + '/' + id)
    .then(response => callback(response))
    .catch(response => errHandler(response))
}

export {
  getTodos,
  getTodo,
  upsertTodo,
  deleteTodo
}
