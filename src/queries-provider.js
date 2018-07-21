const DataLoader = require('./data-loader')

let dataLoader

class QueriesProvider {
    constructor() {
        dataLoader = new DataLoader()
    }

    getGames(args) {
        return dataLoader.games(args.search, args.limit)
    }

    getCompanies(args) {
        return dataLoader.companies(args.search, args.limit)
    }
}

module.exports = QueriesProvider
