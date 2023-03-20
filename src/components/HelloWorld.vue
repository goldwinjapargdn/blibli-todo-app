<template>
  <div class="hello">
    <input type="text"
           :class="{ 'error': hasErrors }"
           v-model="text">
    <button @click="reverse" >Reverse</button>
    <p>{{ text }}</p>
    <p>{{ reversedText }}</p>
    <p>Jawabannya adalah : {{ answer }}</p>
    <img :src="answerImage" :alt="answer">
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      text: '',
      reversedText: '',
      errors: [],
      answer: '',
      answerImage: ''
    }
  },
  computed: {
    hasErrors () {
      return this.errors.length  > 0
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  },
  methods: {
    reverse () {
      if (!this.validate()) return
      this.reversedText = this.text.split('').reverse().join('')
      this.getAnswer()
      console.log('reverse this')
    },
    validate () {
      this.errors = []
      if (!this.text) {
        this.errors.push('Harus diisi gan')
        return false
      }
      if (this.text.length < 6) {
        this.errors.push('Karakternya minimal 6')
        return false
      }
      return true
    },
    getAnswer () {
      axios.get('https://yesno.wtf/api')
        .then((response) => {
          console.log(response)
          const { answer, image } = response.data
          this.answer = answer
          this.answerImage = image
        })
        .catch((error) => {
          console.log(error)
        })
    },
    debounceGetAnswer: _.debounce(function () {
      this.getAnswer()
    }, 500)
  },
  watch: {
    text (val, prevVal) {
      console.log(val, prevVal)
      this.debounceGetAnswer()
    },
    hasErrors () {
      alert('ada error')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input.error {
  color: red;
  border: 1px solid red;
  font-weight: bold;
}
</style>
