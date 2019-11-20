var utils = {
  getDatas: function getData () {
    const ret = {
      'meta': {'msg': '成功', 'status': 200},
      'data': [
        {
          'id': 99,
          'authName': '权限管理',
          'path': null,
          'children': [
            {
              'id': 100,
              'authName': '权限列表',
              'path': 'authList',
              'children': []
            }
          ]
        },
        {
          'id': 101,
          'authName': '商品管理',
          'path': null,
          'children': [
            {
              'id': 103,
              'authName': '商品列表',
              'path': 'goodsList',
              'children': []
            }
          ]
        },
        {
          'id': 102,
          'authName': '资产管理',
          'path': null,
          'children': [
            {
              'id': 104,
              'authName': '资产列表',
              'path': 'coinList',
              'children': []
            }
          ]
        },
        {
          'id': 105,
          'authName': '成员管理',
          'path': null,
          'children': [
            {
              'id': 106,
              'authName': '成员列表',
              'path': 'userList',
              'children': []
            }
          ]
        }
      ]
    }
    return ret
  },
  getUserLists: function getUserList () {
    const res = {
      'meta': {'msg': '成功', 'status': 200},
      'data': [
        // {'pagenum': 1,
        //   'total': 2},
        {
          'pagenum': 1,
          'total': 6,
          'users': [
            {
              'id': 500,
              'username': '000',
              'userStatus': true
            },
            {
              'id': 501,
              'username': 'admin',
              'userStatus': true
            },
            {
              'id': 502,
              'username': 'lhh',
              'userStatus': false
            },
            {
              'id': 503,
              'username': 'lhh01',
              'userStatus': false
            },
            {
              'id': 504,
              'username': 'lhh02',
              'userStatus': true
            },
            {
              'id': 505,
              'username': 'lhh03',
              'userStatus': false
            }
          ]}
      ]
    }
    return res
  },
  getUserTwoLists: function getUserList () {
    var list = []
    const res = {
      'meta': {'msg': '成功', 'status': 200},
      'data': [
        // {'pagenum': 1,
        //   'total': 2},
        {
          'pagenum': 1,
          'total': 2,
          'users': [
            {
              'id': 500,
              'username': '000',
              'userStatus': true
            },
            {
              'id': 501,
              'username': 'admin',
              'userStatus': true
            }
          ]}
      ]
    }
    list.push(res)
    return res
  },
  getUserOneLists: function getUserList () {
    const res = {
      'meta': {'msg': '成功', 'status': 200},
      'data': [
        // {'pagenum': 1,
        //   'total': 2},
        {
          'pagenum': 1,
          'total': 1,
          'users': [
            {
              'id': 505,
              'username': '000',
              'userStatus': true
            }
          ]}
      ]
    }
    return res
  },
  changeStatus: function change000Status (id, status) {
    var ok = true
    var userLists = utils.getUserLists()
    var uid = userLists.data[0].users[0].id
    // const userStatus = userLists.data[0].users[0].userStatus
    if (id === uid) {
      // const newList = utils.getNewList()
      userLists.data[0].users[0].userStatus = status
      return ok
    } else {
      return !ok
    }
    // console.log(userLists.data[0].users[0]) 修改成功但没改变值，请求的还是之前的数组,如何修改数组,目前没好的办法解决
  }
  // getNewList: function getNewList () {
  //   const ret = {}
  //   return ret
  // }
}
export default utils
