import Vue from 'vue'
import Vuex from 'vuex'
import {
  getTodos,
  upsertTodo,
  deleteTodo
} from '@/api/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    todos(state) {
      return state.todos || []
    }
  },
  mutations: {
    setTodos(state, value) {
      state.todos = [...value]
    }
  },
  actions: {
    getTodos({ commit }, { success, fail } = {}) {
      getTodos(response => {
        commit('setTodos', response.data)
        success && success(response)
      }, fail)
    },
    // eslint-disable-next-line no-unused-vars
    upsertTodo({ commit }, { data, success, fail } = {}) {
      upsertTodo(response => {
        success && success(response)
      }, fail, data)
    },
    // eslint-disable-next-line no-unused-vars
    deleteTodo({ commit }, { id, success, fail } = {}) {
      deleteTodo(response => {
        success && success(response)
      }, fail, id)
    }
  },
  modules: {
  }
})
