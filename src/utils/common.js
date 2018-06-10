export default {
  keyBy: function(items, key) {
    const result = {}
    items.forEach(item=>{
      result[item[key]] = item
    })
    return result
  }
}