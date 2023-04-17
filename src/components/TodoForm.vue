<template>
  <form class="todo-form" @submit.prevent="handleSubmit">
    <input type="text"
           v-model="text"
           class="todo-input"
           ref="input"
           :placeholder="placeholder">

    <button class="todo-button">
      {{ action }}
    </button>
  </form>
</template>

<script>
export default {
  name: 'TodoForm',
  props: {
    editData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      text: this.editData ? this.editData.text : ''
    }
  },
  mounted () {
    this.$refs.input.focus()
  },
  computed: {
    placeholder () {
      return this.editData ? 'Update your todo' : 'Add new todo'
    },
    action () {
      return this.editData ? 'Update' : 'Add'
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('submit', {
        // id: Math.floor(Math.random() * 10000),
        text: this.text
      })
      this.reset()
    },
    reset () {
      this.text = ''
    }
  }
}
</script>
