import {shallowMount, createLocalVue} from "@vue/test-utils";
import Component from '@/views/HomeView'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const MOCK_TODOS = [
  {
    id: 1,
    text: 'Belajar Vue',
    completed: false
  },
  {
    id: 2,
    text: 'Belajar Java',
    completed: true
  }
]

const stubs = {
  TodoForm: true,
  TodoList: true
}
describe('views/HomeView.vue', () => {
  let wrapper, actions, getters, store, state

  beforeEach(() => {
    actions = {
      getTodos: jest.fn(),
      upsertTodo: jest.fn(),
      deleteTodo: jest.fn()
    }

    getters = {
      todos: state => state.todos
    }

    state = {
      todos: MOCK_TODOS
    }

    store = new Vuex.Store({
      state,
      getters,
      actions,
      namespaced: true
    })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      stubs
    })
  })

  test('Initialized well', () => {
    wrapper.vm.$mount()
  })
})
