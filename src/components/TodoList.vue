<template>
  <TodoForm v-if="editData.id" :editData="editData" @submit="updateTodo" />
  <div v-else class="todo-list">
    <div :class="['todo-row', { 'complete': todo.isCompleted }]"
         v-for="todo in todos"
         :key="todo.id">
      <div @click="completeTodo(todo.id)">
        {{ todo.text }}
      </div>
      <div class="icons">
        <TrashIcon @click="removeTodo(todo.id)">Delete</TrashIcon>
        <PencilIcon @click="editTodo(todo)">Edit</PencilIcon>
      </div>
    </div>
  </div>
</template>

<script>
import TodoForm from '@/components/TodoForm'
import { TrashIcon, PencilIcon } from '@vue-hero-icons/outline'

export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      editData: {
        id: null,
        text: ''
      }
    }
  },
  components: {
    TrashIcon,
    PencilIcon,
    TodoForm
  },
  methods: {
    completeTodo (todoId) {
      this.$emit('completeTodo', todoId)
    },
    removeTodo (todoId) {
      this.$emit('removeTodo', todoId)
    },
    editTodo (todo) {
      this.editData = {
        id: todo.id,
        text: todo.text
      }
    },
    updateTodo (newTodo) {
      this.$emit('updateTodo', this.editData.id, newTodo)
      this.editData = {
        id: null,
        text: ''
      }
    }
  }
}
</script>
