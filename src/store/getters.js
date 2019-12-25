const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  citys: state => state.user.city,
  industry: state => state.user.industry,
  userInfo: state => state.user.userInfo,
  region: state => state.user.region,
  authorType: state => state.user.authorType,
  province: state => state.user.province
}
export default getters
