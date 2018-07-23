# igdb-data-loader

### Usage
1. Set up IGDB_API_KEY variable before using the server:
`export IGDB_API_KEY=<some_key>`
2. Install dependencies: `npm i`
3. Run server: `npm start`
4. Tests: `npm test`

### Entrypoints
1. `message: String`
2. `getCourse(id: Int!): Course`
3. `getCourses(topic: String): [Course]`
4. `updateCourseTopic(is: Int!, topic: String!): Course`
5. `getGames(name: String!, limit: Int): [Game]`
6. `getCompanies(name: String!, limit: Int): [Company]`
