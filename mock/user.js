
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
  'ICE0tuBK_pi7kRhUb_Do-feCwDzrzb4_1oJtLYfPN2LabaI8K99dmVzUFgVmJmvWAuGHprgowJS_58GuZVGrcISKbCqi9GwsYcXMgdbHUvHZJjKgr5cSl73hwcwiM5S11fnx737T8AsZ6-awRqwwEn7VzZ5B5u9EePdiFQdFyXdwBatBw7XoHGFSZuWxbnmh68StOBufE-BVZSJj1RFsewoIOcwWBoeqs7fDTXA5-A5bEO3rD_yHJEGw8ONquH-2fO7_ifNHXqnAeZ67RBNhZQ_Xs33JoVPm4l3ghXU64d8oSyYtbFrjVMx_cTjNI6k9': {
    roles: ['admin'],
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
    url: '/user/login',
    type: 'post',
    response: config => {
      let configbody = null
      for (const key in config.body) {
        configbody = JSON.parse(key)
      }
      console.log(configbody)
      const { username } = configbody
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'post',
    response: config => {
      const { token } = config.body
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
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
        code: 20000,
        data: 'success'
      }
    }
  }
]
