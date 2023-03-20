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

export default {
  name: 'HomeView',
  components: {
    TodoForm,
    TodoList
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          text: 'Belajar Odoo',
          isCompleted: false
        },
        {
          id: 2,
          text: 'Beli Hyundai Palisade',
          isCompleted: false
        },
        {
          id: 3,
          text: 'Beli Indomie',
          isCompleted: false
        },
        {
          id: 4,
          text: 'Ngudud bareng mas Sandi dan ko Juan',
          isCompleted: true
        }
      ]
    }
  },
  methods: {
    addTodo(newTodo) {
      if (!newTodo.text) return
      this.todos = [newTodo, ...this.todos]
      // this.todos.push(newTodo)
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
    }
  }
}
</script>
