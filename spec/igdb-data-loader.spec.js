const igdb = require('igdb-api-node')
const IgdbDataLoader = require('../src/igdb-data-loader')

describe('IgdbDataLoader tests', () => {
    let promiseSpy
    let igdbDataLoader
    let client

    function composeExpectedParams(term, limit) {
        return {
            fields: jasmine.any(Array),
            limit: limit,
            search: term,
        }
    }

    beforeAll(() => {
        client = jasmine.createSpyObj('client', ['games', 'companies'])
        promiseSpy = jasmine.createSpyObj('promise', ['then', 'catch'])
        promiseSpy.then.and.returnValue(promiseSpy)
        spyOn(igdb, 'default').and.returnValue(client)
        igdbDataLoader = new IgdbDataLoader()
    })

    describe('tests games loader', () => {
        beforeAll(() => {
            client.games.and.returnValue(promiseSpy)
        })

        it("checks games loader", () => {
            const term = 'term'
            const limit = 15
            igdbDataLoader.games(term, limit)
            expect(client.games).toHaveBeenCalledWith(composeExpectedParams(term, limit))
        })

        it("checks games loader without limit", () => {
            const term = 'term'
            igdbDataLoader.games(term)
            expect(client.games).toHaveBeenCalledWith(composeExpectedParams(term, 10))
        })

        it("checks games loader with huge limit", () => {
            const term = 'term'
            igdbDataLoader.games(term, 99999)
            expect(client.games).toHaveBeenCalledWith(composeExpectedParams(term, 10))
        })
    })

    describe('tests companies loader', () => {
        beforeAll(() => {
            client.companies.and.returnValue(promiseSpy)
        })

        it("checks companies loader", () => {
            const term = 'term'
            const limit = 15
            igdbDataLoader.companies(term, limit)
            expect(client.companies).toHaveBeenCalledWith(composeExpectedParams(term, limit))
        })

        it("checks companies loader without limit", () => {
            const term = 'term'
            igdbDataLoader.companies(term)
            expect(client.companies).toHaveBeenCalledWith(composeExpectedParams(term, 10))
        })

        it("checks companies loader with huge limit", () => {
            const term = 'term'
            igdbDataLoader.companies(term, 99999)
            expect(client.companies).toHaveBeenCalledWith(composeExpectedParams(term, 10))
        })
    })
})
