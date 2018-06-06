const orderConstructor = (order) => {
  return {
    id: order['id'],
    status: order['status'] == 'pending' ? '预约确认中' :
      (order['status'] == 'confirmed' ? '预约成功': '预约已取消'),
    courseDate: order['courseDate'],
    courseTime: order['courseTime'],
    phoneNumber: order['user']['phoneNumber'],
    nickname: order['user']['nickname'],
    title: order['course']['title'],
    createdAt: order['createdAt'],
    operation: ''
  };
};

export default function makeOrdersItems(orders) {
  let ordersRows = []
  for (let key in orders) {
    ordersRows.push(orderConstructor(orders[key]))
  }
  return ordersRows
}
