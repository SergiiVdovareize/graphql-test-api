const DataLoader = require('../src/data-loader')
const QueriesProvider = require('../src/queries-provider')

describe('QueriesProvider tests', () => {
    const params = {
        search: 'term',
        limit: 10,
    }

    let queriesProvider
    let loaderSpy

    beforeAll(() => {
        loaderSpy = jasmine.createSpyObj('loader', ['games', 'companies'])
        spyOn(DataLoader.prototype, 'games').and.callFake(loaderSpy.games)
        spyOn(DataLoader.prototype, 'companies').and.callFake(loaderSpy.companies)

        queriesProvider = new QueriesProvider()
    })


    it("checks games was called", () => {
        queriesProvider.getGames(params)
        expect(loaderSpy.games).toHaveBeenCalledWith(params.search, params.limit)
    });

    it("checks companies was called", () => {
        queriesProvider.getCompanies(params)
        expect(loaderSpy.companies).toHaveBeenCalledWith(params.search, params.limit)
    });
})
