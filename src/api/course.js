const courses = [
  { id: 1, name: "web全栈架构师", price: 99 },
  { id: 2, name: "web高级工程师", price: 99 },
];

export function getCourses() {
  return Promise.resolve(courses);
}

export function addCourse(name) {
  courses.push({ id: courses.length + 1, name });
  return Promise.resolve(true);
}

export function getCourseById(id) {
  return Promise.resolve(courses.find(c => c.id == id));
}
