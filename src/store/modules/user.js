import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken, setUserName, getUserName, removeUserName } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getBasic, basicType } from '@/api/basicData'
import Vue from 'vue'

const state = {
  token: getToken(),
  refresh_token: getRefreshToken(),
  username: getUserName(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: {},
  users: [],
  province: [],
  city: [],
  states: [],
  products: [],
  region: [],
  authorType: [],
  industry: [],
  logType: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESH_TOKEN: (state, refresh_token) => {
    state.refresh_token = refresh_token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_USERS: (state, users) => {
    state.users = users
  },
  SET_PROVINCE: (state, province) => {
    state.province = province
  },
  SET_STATES: (state, states) => {
    state.states = states
  },
  SET_PRODUCTS: (state, products) => {
    state.products = products
  },
  SET_REGION: (state, region) => {
    state.region = region
  },
  SET_AUTHORTYPE: (state, authorType) => {
    state.authorType = authorType
  },
  SET_INDUSTRY: (state, industry) => {
    state.industry = industry
  },
  SET_CITY: (state, city) => {
    state.city = city
  },
  SET_LOGTYPE: (state, logtype) => {
    state.logType = logtype
  }
}

const actions = {
  async getRegion({ commit, state, dispatch }) {
    if (!(state.states && state.states[0].children)) {
      try {
        const response = await getBasic(state.token, basicType.STATE, { flag: -1, stateid: -1 })
        if (state.states.length) {
          state.states.forEach(item => {
            response.info.forEach(i => {
              if (i.aid === item.id) {
                for (const k in i) {
                  Vue.set(item, k, i[k])
                }
              }
            })
          })
        }
      } catch (error) {
        throw new Error('获取状态列表出错')
      }
    }
    return state.states
  },
  async getIndustry({ commit, state, dispatch }) {
    if (!state.industry.length) {
      try {
        const industryes = await getBasic(state.token, basicType.INDUSTRY, { industryid: -1 })
        commit('SET_INDUSTRY', industryes.info)
      } catch (error) {
        throw new Error('获取行业名称出错')
      }
    }
    return state.industry
  },
  async getAuthorType({ commit, state, dispatch }) {
    if (!state.authorType.length) {
      try {
        const author = await getBasic(state.token, basicType.AUTHOR, { authorid: -1 })
        commit('SET_AUTHORTYPE', author.info)
      } catch (error) {
        throw new Error('获取行业名称出错')
      }
    }
    return state.authorType
  },
  async getCity({ commit, state }) {
    if (!state.city.length) {
      try {
        const response = await getBasic(state.token, basicType.CITY, { provinceid: -1 })
        commit('SET_CITY', response.info)
      } catch (error) {
        throw new Error('获取城市列表出错')
      }
    }
    return state.city
  },
  async getBigRegion({ commit, state }) {
    if (!state.region.length) {
      try {
        const response = await getBasic(state.token, basicType.REGION, { regionid: -1 })
        commit('SET_REGION', response.info)
      } catch (error) {
        throw new Error('获取大区列表出错')
      }
    }
    return state.region
  },
  async getLogList({ commit, state }) {
    if (!state.logType.length) {
      try {
        const res = await getBasic(state.token, basicType.LOG, { flag: 1 })
        commit('SET_LOGTYPE', res.info)
      } catch (error) {
        throw new Error('获取日志类别出错')
      }
    }
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const info = response
        commit('SET_TOKEN', info.access_token)
        commit('SET_REFRESH_TOKEN', info.refresh_token)
        commit('SET_USERNAME', username.trim())
        setToken(info.access_token, info.expires_in)
        setRefreshToken(info.refresh_token)
        setUserName(username.trim())
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }, username) {
    const uname = username || state.username
    return new Promise((resolve, reject) => {
      getInfo(state.token, uname).then(response => {
        const info = response.info[0]

        if (!info) {
          reject('Verification failed, please Login again.')
        }

        const { province, products, states, users } = info

        commit('SET_PROVINCE', province)
        commit('SET_PRODUCTS', products)
        commit('SET_STATES', states)
        commit('SET_USERS', users)

        const self = users.find((item) => {
          return item.username === state.username
        })

        const { authorid, username, authorname } = self
        info.roles = [authorid]

        // roles must be a non-empty array
        if (!info.roles || info.roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', info.roles)
        commit('SET_NAME', username)
        commit('SET_AVATAR', 'http://www.rising.com.cn/skin/rising/index/img/200x200-rav.png')
        commit('SET_INTRODUCTION', authorname)
        commit('SET_USERINFO', self)
        resolve(info)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeRefreshToken()
      removeUserName()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     removeToken()
    //     resetRouter()

    //     // reset visited views and cached views
    //     // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    //     dispatch('tagsView/delAllViews', null, { root: true })

    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

const getter = {
  doneCity(state, getters) {
    return state.city
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getter
}
