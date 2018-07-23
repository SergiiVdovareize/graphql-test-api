# igdb-data-loader

### Usage
1. Set up IGDB_API_KEY variable before using the server:
`export IGDB_API_KEY=<some_key>`
2. Install dependencies: `npm i`
3. Run server: `npm start`
4. Tests: `npm test`

### Entrypoints
0. `message: String`
1. `getCourse(id: Int!): Course`
2. `getCourses(topic: String): [Course]`
3. `updateCourseTopic(is: Int!, topic: String!): Course`
4. `getGames(name: String!, limit: Int): [Game]`
5. `getCompanies(name: String!, limit: Int): [Company]`
