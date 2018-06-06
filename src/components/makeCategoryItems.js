const categoryConstructor = (category) => {
  return {
    id: category['id'],
    name: category['name'],
    weight: category['order'],
    image: category['image'],
    operation: ''
  };
};

export default function makeCategoryItems(categories) {
    let categoriesRows = []
    for (let key in categories) {
      categoriesRows.push(categoryConstructor(categories[key]))
    }
  return categoriesRows
}
