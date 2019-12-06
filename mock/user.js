
const tokens = {
  admin: {
    'access_token': 'ICE0tuBK_pi7kRhUb_Do-feCwDzrzb4_1oJtLYfPN2LabaI8K99dmVzUFgVmJmvWAuGHprgowJS_58GuZVGrcISKbCqi9GwsYcXMgdbHUvHZJjKgr5cSl73hwcwiM5S11fnx737T8AsZ6-awRqwwEn7VzZ5B5u9EePdiFQdFyXdwBatBw7XoHGFSZuWxbnmh68StOBufE-BVZSJj1RFsewoIOcwWBoeqs7fDTXA5-A5bEO3rD_yHJEGw8ONquH-2fO7_ifNHXqnAeZ67RBNhZQ_Xs33JoVPm4l3ghXU64d8oSyYtbFrjVMx_cTjNI6k9',
    'token_type': 'bearer',
    'expires_in': 43199,
    'refresh_token': 'd510bd065b1d4b2f983f7d5d8b12eafd'
  },
  editor: {
    access_token: 'editor-token'
  }
}

const users = {
  'ICE0tuBK_pi7kRhUb_Do-feCwDzrzb4_1oJtLYfPN2LabaI8K99dmVzUFgVmJmvWAuGHprgowJS_58GuZVGrcISKbCqi9GwsYcXMgdbHUvHZJjKgr5cSl73hwcwiM5S11fnx737T8AsZ6-awRqwwEn7VzZ5B5u9EePdiFQdFyXdwBatBw7XoHGFSZuWxbnmh68StOBufE-BVZSJj1RFsewoIOcwWBoeqs7fDTXA5-A5bEO3rD_yHJEGw8ONquH-2fO7_ifNHXqnAeZ67RBNhZQ_Xs33JoVPm4l3ghXU64d8oSyYtbFrjVMx_cTjNI6k9':
  {
    'errorcode': 0,
    'count': 1,
    'info': [{
      'userid': 2,
      'username': 'admin',
      'provinceid': '-',
      'provincename': '全部省份',
      'regionid': 1,
      'regionname': '所有区域',
      'authorid': 0,
      'authorname': '管理员',
      'phone': '13700137001'
    }]
  },
  // {
  //   roles: ['0'],
  //   introduction: 'I am a super administrator',
  //   avatar: 'http://www.rising.com.cn/skin/rising/index/img/200x200-rav.png',
  //   name: 'Super Admin'
  // },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'http://www.rising.com.cn/skin/rising/index/img/200x200-rav.png',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/token',
    type: 'post',
    response: config => {
      const token = tokens[config.body.username]

      console.log(token)
      // mock error
      if (!token) {
        return {
          errorcode: -99,
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
          errorcode: -99,
          message: 'Login failed, unable to get user details.'
        }
      }

      return info
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
