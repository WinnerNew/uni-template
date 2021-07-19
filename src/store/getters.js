const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userInfo.userId
}

export default getters
