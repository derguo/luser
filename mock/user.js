
const tokens = {
  admin: {
    errorcode: 0,
    info: {
    'access_token': 'ICE0tuBK_pi7kRhUb_Do-feCwDzrzb4_1oJtLYfPN2LabaI8K99dmVzUFgVmJmvWAuGHprgowJS_58GuZVGrcISKbCqi9GwsYcXMgdbHUvHZJjKgr5cSl73hwcwiM5S11fnx737T8AsZ6-awRqwwEn7VzZ5B5u9EePdiFQdFyXdwBatBw7XoHGFSZuWxbnmh68StOBufE-BVZSJj1RFsewoIOcwWBoeqs7fDTXA5-A5bEO3rD_yHJEGw8ONquH-2fO7_ifNHXqnAeZ67RBNhZQ_Xs33JoVPm4l3ghXU64d8oSyYtbFrjVMx_cTjNI6k9',
    'token_type': 'bearer',
    'expires_in': 43199,
    'refresh_token': 'd510bd065b1d4b2f983f7d5d8b12eafd'
    }
  },
  editor: {
    access_token: 'editor-token'
  }
}

const users = {
  'ICE0tuBK_pi7kRhUb_Do-feCwDzrzb4_1oJtLYfPN2LabaI8K99dmVzUFgVmJmvWAuGHprgowJS_58GuZVGrcISKbCqi9GwsYcXMgdbHUvHZJjKgr5cSl73hwcwiM5S11fnx737T8AsZ6-awRqwwEn7VzZ5B5u9EePdiFQdFyXdwBatBw7XoHGFSZuWxbnmh68StOBufE-BVZSJj1RFsewoIOcwWBoeqs7fDTXA5-A5bEO3rD_yHJEGw8ONquH-2fO7_ifNHXqnAeZ67RBNhZQ_Xs33JoVPm4l3ghXU64d8oSyYtbFrjVMx_cTjNI6k9':
  // {
  //   'errorcode': 0,
  //   'count': 1,
  //   'info': [{
  //     'id': 2,
  //     'username': 'admin',
  //     'cnname': '管理员',
  //     'provinceid': '-',
  //     'provincename': '全部省份',
  //     'regionid': 1,
  //     'regionname': '所有区域',
  //     'authorid': 0,
  //     'authorname': '管理员',
  //     'phone': '13700137001',
  //     'assignment': '0'
  //   }]
  // },
  {
    roles: ['0'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/token',
    type: 'post',
    response: config => {
      let token = null 
      for (const k in config.body) {
        token = tokens[JSON.parse(k).username]
      }
      console.log(token)
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return token
    }
  },

  // get user info
  {
    url: '/users/getone\.*',
    type: 'post',
    response: config => {
      const token = config.headers['x-token']
      const info = users[token]
      console.log(!info)

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        errorcode: 0,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        errorcode: 0,
        data: 'success'
      }
    }
  }
]
