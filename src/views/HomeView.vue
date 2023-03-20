<template>
  <div class="todo-app">
    <h1>What's the Plan for Today?</h1>

    <TodoForm @submit="addTodo"/>

    <TodoList :todos="todos"
              @removeTodo="removeTodo"
              @completeTodo="completeTodo"
              @updateTodo="updateTodo"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import _ from 'lodash'
export default {
  name: 'HomeView',
  components: {
    TodoForm,
    TodoList
  },
  data() {
    return {
      todos: []
    }
  },
  mounted(){
    this.parseLocalStorage()
  },
  methods: {
    addTodo(newTodo) {
      if (!newTodo.text) return
      this.todos = [newTodo, ...this.todos]
    },
    removeTodo(todoId) {
      this.todos = this.todos.filter(todo => todo.id !== todoId) 
    },
    completeTodo(todoId) {
      this.todos = this.todos.map(todo => {
        if (todo.id === todoId) {
          todo.isCompleted = !todo.isCompleted
        }
        return todo
      })
    },
    updateTodo(todoId, newTodo) {
      if (!newTodo.text) return
      this.todos = this.todos.map(todo => {
        if (todo.id === todoId) {
          todo.text = newTodo.text
        }
        return todo
      })
    },
    saveTodo(){
      const parsed = JSON.stringify(this.todos)
      localStorage.setItem('todos', parsed)
    },
    parseLocalStorage(){
      if (localStorage.getItem('todos')){
        try{
          this.todos = JSON.parse(localStorage.getItem('todos'))
        }catch(e){
          localStorage.removeItem('todos')
        }
      }
    },
    debounceUpdateTodo: _.debounce(function () {
      this.saveTodo()
    }, 5000)

  },
  watch: {
    todos (val, prevVal) {
      this.debounceUpdateTodo()
    },
  }
}
</script>
