/* eslint-disable no-undef */
const getters = {
  numberOfPosts (state) {
    return state.posts.length
  },
  nextPage (state) {
    let currentPage = state.posts.length / 10
    return currentPage + 1
  }
}

export default getters
