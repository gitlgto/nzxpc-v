const mutations = {
  // mutations用于同步地更改状态,其中，第一个参数是state，后面的其他参数是发起mutation时传入的参数。
  changeWs (state, val) {
    state.ws = val
    return state.ws
  },
  changeToken (state, val) {
    state.token = val
    return state.token
  },
  // 添加tabs
  add_tabs (state, data) {
    this.state.openTab.push(data)
  },
  // 删除tabs
  delete_tabs (state, route) {
    let index = 0
    for (let option of state.openTab) {
      if (option.route === route) {
        break
      }
      index++
    }
    this.state.openTab.splice(index, 1)
  },
  // 设置当前激活的tab
  set_active_index (state, index) {
    this.state.activeIndex = index
  }
}
export default mutations
