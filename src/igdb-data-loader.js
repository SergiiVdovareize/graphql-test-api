const igdb = require('igdb-api-node')

const GAMES_TYPE = 'games'
const COMPANIES_TYPE = 'companies'
const gameFields = ['name', 'id', 'slug', 'summary', 'url', 'cover']
const companyFields = ['name', 'id', 'url', 'logo']
let client

class IgdbDataLoader {
    constructor() {
        client = igdb.default()
    }

    games(term, limit) {
        return fetchData(term, limit, GAMES_TYPE)
    }

    companies(term, limit) {
        return fetchData(term, limit, COMPANIES_TYPE)
    }
}

function fetchData(term, limit, type) {
    const options = composeLoadOptions(term, limit, type)
    return new Promise((resolve, reject) => {
        client[type](options).then(response => {
            resolve(composeSearchResult(response, type))
        }).catch(error => {
            reject(error)
        })
    })
}

function composeLoadOptions(term, limit, type) {
    let fields
    switch (type) {
        case GAMES_TYPE:
            fields = gameFields
            break
        case COMPANIES_TYPE:
            fields = companyFields
            break
        default:
            // nothing
    }

    return {
        fields: fields,
        limit: checkLimit(limit),
        search: term
    }
}

function checkLimit(limit = 10) {
    if (limit < 1 || limit > 100) {
        limit = 10
    }
    return limit
}

function composeSearchResult(response, type) {
    const result = []
    response.body.forEach(item => {
        switch (type) {
            case GAMES_TYPE:
                result.push(composeGame(item))
                break
            case COMPANIES_TYPE:
                result.push(composeCompany(item))
                break
            default:
                // nothing
        }
    })
    return result
}

function composeCompany(data) {
    return {
        id: data.id,
        name: data.name,
        url: data.url,
        logo: data.logo && data.logo.url || null,
    }
}

function composeGame(data) {
    return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        summery: data.summary,
        url: data.url,
        coverImageUrl: data.cover && data.cover.url || null,
    }
}

module.exports = IgdbDataLoader
