const getters = {
  // 项目相关
  loading: state => state.app.loading,
  // 用户相关
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  user: state => state.user.user,
  role: state => state.user.role,
  permission: state => state.user.permission,
}

export default getters
