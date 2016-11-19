<template>
    <div>
        <h1>Chapter Three Blog</h1>
        <div class="post-container">
          <div class="post" v-for="post in posts">
            <span class="date">{{ toDate(post.created[0].value) }}</span>
            <h2><router-link :to="{ name: 'post', params: { post_name: post.nid[0].value } }">{{ post.title[0].value }}</router-link></h2>
            <div class="bodyIndex">
              {{ post.body[0].value | excerpt-filter }}
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
/* eslint-disable no-unused-vars */
import { excerptFilter } from '../filters/Helpers.js'

export default{
  name: 'Index',
  data () {
    return {
      posts: []
    }
  },
  created () {
    /* eslint-disable no-undef */
    if (localStorage.getItem('posts') === null) {
      axios.get('//dev.chapterthree.com/api/1.0/blog/')
        .then((response) => {
          this.$data.posts = response.data
          /* eslint-disable no-undef */
          localStorage.setItem('posts', JSON.stringify(response.data))
        })
    } else {
      this.$data.posts = JSON.parse(localStorage.getItem('posts'))
    }
  },
  methods: {
    toDate (timestamp) {
      return moment.unix(timestamp).format('MM/DD/Y')
    }
  }
}
</script>
<style lang="css">
/*  .post-container {
    text-align: left;
  }
  .post-container h2 {
    margin-bottom: 5px;
  }*/
</style>
