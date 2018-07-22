import moment from "moment/moment";

export default {
  keyBy: function(items, key) {
    const result = {}
    items.forEach(item=>{
      result[item[key]] = item
    })
    return result
  },
  formatDateTime: function(date) {
    if (!date) {
      return ''
    }
    return moment(date).format('YYYY/MM/DD HH:mm')
  }
}