const Schema = `type Query {
    message: String
    course(id: Int!): Course
    courses(topic: String): [Course]
    getGames(search: String, limit: Int): [Game]
    getCompanies(search: String, limit: Int): [Company]
}
type Mutation {
    updateCourseTopic(id: Int!, topic: String!): Course
}
type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
}
type Game {
    id: Int
    name: String
    summery: String
    url: String
    coverImageUrl: String
}
type Company {
    id: Int,
    name: String,
    logo: String,
    url: String
}`

module.exports = Schema
