const mutations = {
  // mutations用于同步地更改状态,其中，第一个参数是state，后面的其他参数是发起mutation时传入的参数。
  changeWs (state, val) {
    state.ws = val
    return state.ws
  },
  changeToken (state, val) {
    state.token = val
    return state.token
  }
}
export default mutations
