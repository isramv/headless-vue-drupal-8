import axios from 'axios'

const actions = {
  getMorePosts (context) {
    // console.log('getting more posts... boss')
    // console.log(context.getters.nextPage)
    context.commit('setUpdating', true)
    axios.get('//dev.chapterthree.com/api/1.1/blog/?page=' + context.getters.nextPage)
      .then((response) => {
        let data = response.data
        if (data.length === 0) {
          context.commit('setUpdating', false)
          return
        }
        response.data.forEach(item => {
          context.commit('addItemToPosts', item)
          context.commit('setUpdating', false)
        })
        /* eslint-disable no-undef */
        localStorage.setItem('posts', JSON.stringify(context.state.posts))
      }).catch((error) => {
        console.warn(error)
        context.commit('setUpdating', false)
      })
  },
  getIndexPosts (context) {
    let promise = new Promise((resolve, reject) => {
      axios.get('//dev.chapterthree.com/api/1.1/blog/index')
      .then(response => {
        context.commit('setPostsIndex', response.data)
        /* eslint-disable no-undef */
        localStorage.setItem('postsIndex', JSON.stringify(response.data))
        resolve(response.data)
        response.data
      }).catch(data => {
        reject(data)
      })
    })
    return promise
  },
  getSinglePost (context, path) {
    console.log('get sigle post distpatch')
    // get the nid.
    context.dispatch('getIndexPosts').then(data => {
      let result = _.find(data, (o) => {
        return o.path === path
      })
      axios.get('//dev.chapterthree.com/api/1.1/blog/' + result.nid)
        .then((response) => {
          context.commit('setPost', response.data[0])
          /* eslint-disable no-undef */
        }
      )
    })
  }
}

export default actions
