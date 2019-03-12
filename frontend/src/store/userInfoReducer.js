import UserInfo from './userClass'

const initialState = {
  userInfo: new UserInfo()
}

function manageUserInfo(state = initialState, action) {
  let nextState = {...state}
  switch (action.type) {
    case 'UPDATE_USERIDS':
      nextState.userInfo.email = action.value.email
      // nextState.userInfo.firstName = action.value.firstName
      // nextState.userInfo.lastName = action.value.lastName
      nextState.userInfo.token = action.value.token
      return nextState || state
    case 'UPDATE_USERNAMES':
      nextState.userInfo.firstName = action.value.firstName
      nextState.userInfo.lastName = action.value.lastName
      return nextState || state
    case 'DELETE_USERINFO':
      nextState.userInfo.email = ''
      nextState.userInfo.firstName = ''
      nextState.userInfo.lastName = ''
      nextState.userInfo.token = ''
      return nextState || state
    default:
      return state
  }
}

export default manageUserInfo
