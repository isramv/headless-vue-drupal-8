<template>
    <div>
        <h1>Chapter Three Blog</h1>
        <div class="post-container">
          <div class="postIndex" v-for="(post, index) in posts">
            <span class="dateIndex">{{ post.created }}</span>
            <router-link :to="{ name: 'post', params: { route_name: cleanPath(post.path), nid: post.nid, index }}">
              <h2 class="titleIndex">{{ post.title }}</h2>  
            </router-link>
            <div class="bodyIndex">
              {{ post.body_summary | excerpt-filter }}
            </div>
            <div class="authorContainerIndex">
              <div class="authorPictureIndex" v-html="parseImages(post.user_picture)"></div>
              <div class="authorName">{{ post.author_name }}</div>
            </div>
          </div>
          <div v-infinite>Infinite</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { store } from '../vuex/store.js'
/* eslint-disable no-unused-vars */
import { excerptFilter } from '../filters/Filters.js'

export default{
  name: 'Index',
  store,
  data () {
    return {
      posts: []
    }
  },
  directives: {
    Infinite () {
      console.log('infinite')
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    /* eslint-disable no-undef */
    if (localStorage.getItem('posts') === null) {
      axios.get('//dev.chapterthree.com/api/1.1/blog/')
        .then((response) => {
          this.$data.posts = response.data
          /* eslint-disable no-undef */
          localStorage.setItem('posts', JSON.stringify(response.data))
          this.$store.commit('setPosts', response.data)
        })
    } else {
      this.$data.posts = JSON.parse(localStorage.getItem('posts'))
      this.$store.commit('setPosts', JSON.parse(localStorage.getItem('posts')))
    }
  },
  methods: {
    // todo deprecate momentjs
    parseImages (string) {
      var find = 'src="/sites/default'
      var re = new RegExp(find, 'g')
      return string.replace(re, 'src="http://dev.chapterthree.com/sites/default')
    },
    cleanPath (string) {
      let result = string.split('/')
      let stringResult = ''
      if (result[1] === 'blog') {
        stringResult = result[2]
      } else {
        stringResult = result[1]
      }
      return stringResult
    },
    handleScroll (event) {
      console.log(event)
      console.log(window)
    }
  }
}
</script>
<style lang="css">
  .authorPictureIndex img {
    max-width: 100px;
    height: auto;
  }
</style>
