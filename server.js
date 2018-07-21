const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')
const QueriesProvider = require('./src/queries-provider')
const schemaFile = require('./schema.js')

const queriesProvider = new QueriesProvider()
const schema = buildSchema(schemaFile)

const root = {
    message: () => 'Hello, is it me you\'re looking for?',
    course: queriesProvider.getCourse,
    courses: queriesProvider.getCourses,
    updateCourseTopic: queriesProvider.updateCourseTopic,
    getGames: queriesProvider.getGames,
    getCompanies: queriesProvider.getCompanies,
}

const app = express()
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'))
