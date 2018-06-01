const courseConstructor = (course) => {
  let belong = ''
  if (course['categories'] !== null && course['categories'].length >= 1 ) {
    belong = course['categories'][0]['name'] + ' - '
  }
  if (course['tags'] !== null && course['tags'].length >= 1) {
    belong += course['tags'][0]['name']
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
  console.log('www',coursesRows)
  return coursesRows
}
