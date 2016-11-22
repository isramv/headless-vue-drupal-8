<template>
  <div>
    <h1>{{ post.title }}</h1>
    {{ post.created }} by {{ post.author_name }}
    <div v-html="parseImages(post.body)" v-hljs></div>
	</div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import axios from 'axios'
  import { store } from '../vuex/store.js'
  import hljs from 'highlight.js'
  var hljsCss = require('highlight.js/styles/darkula.css')

  export default{
    name: 'Post',
    store: store,
    directives: {
      hljs (el) {
        Array.from(el.getElementsByClassName('brush:plain;')).forEach(item => {
          item.className = 'nohighlight hljs'
        })
        Array.from(el.getElementsByTagName('PRE')).forEach(item => {
          hljs.highlightBlock(item)
        })
      }
    },
    computed: {
      post () {
        return this.$store.state.post
      }
    },
    created () {
      /* eslint-disable no-undef */
      if (localStorage.getItem('post') !== null) {
        let post = localStorage.getItem('post')
        this.$store.commit('setPost', JSON.parse(post))
      }
      if (typeof this.$route.params.nid === 'undefined') {
        console.log('variable not defined')
      }
      if (typeof this.$route.params.index !== 'undefined') {
        let post = this.$store.state.posts[this.$route.params.index]
        this.$store.commit('setPost', post)
        localStorage.setItem('post', JSON.stringify(post))
      }
    },
    methods: {
      parseImages (string) {
        var find = 'src="/sites/default'
        var re = new RegExp(find, 'g')
        return string.replace(re, 'src="http://dev.chapterthree.com/sites/default')
      }
    }
  }
</script>