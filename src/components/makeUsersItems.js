const userConstructor = (user) => {
  return {
    id: user['id'],
    openId:user['openid'],
    name: user['username'],
    nickname: user['nickname'],
    phoneNumber: user['phoneNumber'],
    email: user['email'],
    avatar: user['avatar'],
    scope: user['scope'] == 'admin' ? '管理员' : '用户'
  };
};

export default function makeUsersItems(users) {
  let usersRows = []
  for (let key in users) {
    usersRows.push(userConstructor(users[key]))
  }
  return usersRows
}