<template>
	<div v-if="post.title">
		<h1 v-test>{{ post.title[0].value }}</h1>
    <div v-for="item in post.body">
      <div v-html="parseImages(item.value)" v-test></div>
    </div>  
	</div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  // var prismcss = require('prismjs/themes/prism.css')
  var prismDark = require('prismjs/themes/prism-dark.css')
  import axios from 'axios'
  let Prism = require('prismjs')

  export default{
    name: 'Post',
    data () {
      return {
        post: {}
      }
    },
    directives: {
      test (el) {
        let tags = el.getElementsByClassName('brush:plain;')
        for (let i = 0; i < tags.length; i++) {
          console.dir(tags[i].classList)
          tags[i].innerHTML = Prism.highlight(tags[i].innerHTML, Prism.languages.js)
        }
      }
    },
    created () {
      let postId = this.$route.params.post_name
      axios.get('https://dev.chapterthree.com/node/' + postId + '/?_format=json').then((res) => {
        this.$data.post = res.data
      })
    },
    methods: {
      parseImages (string) {
        var find = 'src="/sites/default'
        var re = new RegExp(find, 'g')
        return string.replace(re, 'src="http://chapterthree.com/sites/default')
      }
    }
  }
</script>