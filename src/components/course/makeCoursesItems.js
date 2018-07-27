import moment from 'moment'
const courseConstructor = (course, now) => {
  let belong = ''
  const categories = course.categories
  if (course['tags'] !== null && course['tags'].length >= 1) {
    belong = course.tags.map((tag,i)=>(categories[i]&&categories[i].name) + ' - '+tag.name).join(',')
  }
  let isOnline = true
  if (course.isManualOffline) {
    isOnline = false
  }
  if (course.onlineStartDate && now < moment(course.onlineStartDate)) {
    isOnline = false
  }
  if (course.onlineEndDate && now >= moment(course.onlineEndDate)) {
    isOnline = false
  }
  return {
    id: course['id'],
    name: course['title'],
    belong: belong,
    place: course['place'],
    pic: course['images'] && course['images'][0],
    operation: '',
    isOnline: isOnline,
  };
};

export default function makeCoursesItems(courses) {
  let coursesRows = []
  const now = new Date()
  for (let key in courses) {
    coursesRows.push(courseConstructor(courses[key], now))
  }
  return coursesRows
}
