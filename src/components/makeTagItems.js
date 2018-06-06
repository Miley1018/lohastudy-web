const tagConstructor = (tag, categories) => {
  return {
    id: tag['id'],
    name: tag['name'],
    category: categories[tag['category']] && categories[tag['category']].name,
    operation: ''
  };
};

export default function makeTagItems(tags, categories) {
  let tagsRows = []
  for (let key in tags) {
    tagsRows.push(tagConstructor(tags[key], categories))
  }
  return tagsRows
}
