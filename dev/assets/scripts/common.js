var watchExampleVM = new Vue({
  el: '#app',
  data: {
    question: '',
    img: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.img = './assets/img/balls.gif'
      this.getAnswer()
    }
  },
  methods: {
    getAnswer: _.debounce(
      function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. ;-)'
          this.img = ''
          return
        }
        this.answer = 'Thinking...'
        this.img = './assets/img/balls.gif'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
            vm.img = _.capitalize(response.data.image)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      500
    )
  }
})
