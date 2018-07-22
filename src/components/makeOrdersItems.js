import moment from 'moment'

const orderConstructor = (order) => {
  const courseDate = order['courseDate'] && (moment(order['courseDate']).format('YYYY/MM/DD HH:mm'))
  return {
    id: order['id'],
    status: order['status'] == 'pending' ? '预约确认中' :
      (order['status'] == 'confirmed' ? '预约成功': '预约已取消'),
    courseDate: courseDate,
    courseTime: order['courseTime'],
    phoneNumber: order['user']['phoneNumber'],
    nickname: order['user']['nickname'],
    title: order['course']['title'],
    createdAt: moment(order['createdAt']).format('YYYY/MM/DD HH:mm'),
    operation: ''
  };
};

export default function makeOrdersItems(orders) {
  let ordersRows = []
  for (let key in orders) {
    const order = orders[key]
    if (order['user']) {
      ordersRows.push(orderConstructor(order))
    }
  }
  return ordersRows
}
