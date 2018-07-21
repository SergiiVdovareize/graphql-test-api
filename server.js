const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')
const QueriesProvider = require('./src/queries-provider')

const queriesProvider = new QueriesProvider()
const schema = buildSchema(`
    type Query {
        getGames(search: String, limit: Int): [Game]
        getCompanies(search: String, limit: Int): [Company]
    },
    type Game {
        id: Int
        name: String
        summery: String
        url: String
        coverImageUrl: String
    },
    type Company {
        id: Int,
        name: String,
        logo: String,
        url: String
    }
`);

const root = {
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
