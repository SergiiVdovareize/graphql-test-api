const courses = require('./courses')

class CoursesLoader {
    single(id) {
        return courses.find(item => item.id === id)
    }

    list(topic = null) {
        return topic
            ? courses.filter(item => item.topic.toLowerCase().indexOf(topic.toLowerCase()) !== -1)
            : courses
    }

    updateTopic(id, topic) {
        const course = this.single(id)
        course.topic = topic
        return course
    }
}

module.exports = CoursesLoader
