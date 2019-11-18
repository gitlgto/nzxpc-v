var utils = {
  getDatas: function getData() {
    const ret = {
      'meta': {'msg': '成功', 'status': 200},
      'data': [
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
          'total': 2,
          'users': [
            {
              'id': 500,
              'username': '000'
            },
            {
              'id': 501,
              'username': 'admin'
            },
            {
              'id': 502,
              'username': 'lhh'
            }
          ]}
      ]
    }
    return res
  }
}
export default utils
