const IgdbDataLoader = require('./igdb-data-loader')
const CoursesLoader = require('./courses-loader')

let igdbDataLoader
let coursesLoader

class QueriesProvider {
    constructor() {
        igdbDataLoader = new IgdbDataLoader()
        coursesLoader = new CoursesLoader()
    }

    getCourse(args) {
        return coursesLoader.single(args.id)
    }

    getCourses(args) {
        return coursesLoader.list(args.topic)
    }

    updateCourseTopic(args) {
        return coursesLoader.updateTopic(args.id, args.topic)
    }

    getGames(args) {
        return igdbDataLoader.games(args.search, args.limit)
    }

    getCompanies(args) {
        return igdbDataLoader.companies(args.search, args.limit)
    }
}

module.exports = QueriesProvider
