const courseConstructor = (course) => {
  let belong = ''
  const categories = course.categories
  if (course['tags'] !== null && course['tags'].length >= 1) {
    belong = course.tags.map((tag,i)=>(categories[i]&&categories[i].name) + ' - '+tag.name).join(',')
  }
  return {
    id: course['id'],
    name: course['title'],
    belong: belong,
    pic: course['images'] && course['images'][0],
    operation: ''
  };
};

export default function makeCoursesItems(courses) {
  let coursesRows = []
  for (let key in courses) {
    coursesRows.push(courseConstructor(courses[key]))
  }
  return coursesRows
}
