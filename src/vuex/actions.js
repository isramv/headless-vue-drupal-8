import axios from 'axios'

const actions = {
  getMorePosts (context) {
    // console.log('getting more posts... boss')
    // console.log(context.getters.nextPage)
    context.commit('setUpdating', true)
    axios.get('//dev.chapterthree.com/api/1.1/blog/?page=' + context.getters.nextPage)
      .then((response) => {
        response.data.forEach(item => {
          context.commit('addItemToPosts', item)
          context.commit('setUpdating', false)
        })
        /* eslint-disable no-undef */
        localStorage.setItem('posts', JSON.stringify(context.state.posts))
        // localStorage.setItem('posts', JSON.stringify(response.data))
        // this.$store.commit('setPosts', response.data)
      })
  }
}

export default actions
