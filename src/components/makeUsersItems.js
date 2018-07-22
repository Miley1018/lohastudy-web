import common from '../utils/common'
const userConstructor = (user, index) => {
  return {
    index: index,
    id: user['id'],
    openId:user['openid'],
    name: user['username'],
    nickname: user['nickname'],
    phoneNumber: user['phoneNumber'],
    email: user['email'],
    avatar: user['avatar'],
    scope: user['scope'] == 'admin' ? '管理员' : '用户',
    createdAt: common.formatDateTime(user['createdAt']),
  };
};

export default function makeUsersItems(users) {
  let usersRows = []
  let index = 1
  for (let key in users) {
    if (users[key].scope != 'admin') {
      index++
    }
  }
  for (let key in users) {
    if (users[key].scope != 'admin') {
      usersRows.push(userConstructor(users[key], index--))
    }
  }
  return usersRows
}
