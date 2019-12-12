import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RefreshTokenKey = 'Admin-Refresh-Token'
const UserName = 'user-name'

export function setUserName(user_name) {
  return Cookies.set(UserName, user_name)
}

export function getUserName() {
  return Cookies.get(UserName)
}

export function removeUserName() {
  return Cookies.remove(UserName)
}

export function setToken(token, expires_in) {
  // if (expires_in) {
  //   setTimeout(removeToken, expires_in)
  // }
  return Cookies.set(TokenKey, token)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRefreshToken(refresh_token) {
  return Cookies.set(RefreshTokenKey, refresh_token)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function removeRefreshToken(refresh_token) {
  return Cookies.remove(RefreshTokenKey)
}
