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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    TodoForm,
    TodoList
  },
  // data() {
  //   return {
  //     todos: [
  //       {
  //         id: 1,
  //         text: 'Belajar Odoo',
  //         isCompleted: false
  //       },
  //       {
  //         id: 2,
  //         text: 'Beli Hyundai Palisade',
  //         isCompleted: false
  //       },
  //       {
  //         id: 3,
  //         text: 'Beli Indomie',
  //         isCompleted: false
  //       },
  //       {
  //         id: 4,
  //         text: 'Ngudud bareng mas Sandi dan ko Juan',
  //         isCompleted: true
  //       }
  //     ]
  //   }
  // },
  created () {
    this.init()
  },
  computed: {
    ...mapGetters([
      'todos'
    ])
  },
  methods: {
    ...mapActions([
      'getTodos',
      'upsertTodo',
      'deleteTodo'
    ]),
    init () {
      this.getTodos({
        success: response => console.log(response),
        fail: err => console.log(err)
      })
    },
    addTodo(newTodo) {
      if (!newTodo.text) return
      // this.todos = [newTodo, ...this.todos]
      // this.todos.push(newTodo)
      this.upsertTodo({
        data: Object.assign({}, newTodo),
        success: () => { this.init() },
        fail: err => console.log(err)
      })
    },
    removeTodo(todoId) {
      // this.todos = this.todos.filter(todo => todo.id !== todoId)
      this.deleteTodo({
        id: todoId,
        success: () => { this.init() },
        fail: err => console.log(err)
      })
    },
    completeTodo(todo) {
      // this.todos = this.todos.map(todo => {
      //   if (todo.id === todoId) {
      //     todo.isCompleted = !todo.isCompleted
      //   }
      //   return todo
      // })
      this.upsertTodo({
        data: {
          id: todo.id,
          text: todo.text,
          completed: !todo.completed
        },
        success: () => { this.init() },
        fail: err => console.log(err)
      })
    },
    updateTodo(todoId, newTodo) {
      // if (!newTodo.text) return
      // this.todos = this.todos.map(todo => {
      //   if (todo.id === todoId) {
      //     todo.text = newTodo.text
      //   }
      //   return todo
      // })
      this.upsertTodo({
        data: {
          id: todoId,
          text: newTodo.text,
          completed: newTodo.completed
        },
        success: () => { this.init() },
        fail: err => console.log(err)
      })
    }
  }
}
</script>
