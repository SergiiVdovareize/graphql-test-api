const IgdbDataLoader = require('../src/igdb-data-loader')
const CoursesLoader = require('../src/courses-loader')
const QueriesProvider = require('../src/queries-provider')

describe('QueriesProvider tests', () => {
    let loaderSpy
    let queriesProvider

    describe('Courses Data tests', () => {
        beforeAll(() => {
            loaderSpy = jasmine.createSpyObj('loader', ['single', 'list', 'updateTopic'])
            spyOn(CoursesLoader.prototype, 'single').and.callFake(loaderSpy.single)
            spyOn(CoursesLoader.prototype, 'list').and.callFake(loaderSpy.list)
            spyOn(CoursesLoader.prototype, 'updateTopic').and.callFake(loaderSpy.updateTopic)

            queriesProvider = new QueriesProvider()
        })

        it("checks getCourse was called", () => {
            queriesProvider.getCourse({id: 1})
            expect(loaderSpy.single).toHaveBeenCalledWith(1)
        })

        it("checks getCourses without topic was called", () => {
            queriesProvider.getCourses({})
            expect(loaderSpy.list).toHaveBeenCalled()
        })

        it("checks getCourses with topic was called", () => {
            queriesProvider.getCourses({topic: 'node'})
            expect(loaderSpy.list).toHaveBeenCalledWith('node')
        })
    })

    describe('Igdb Data tests', () => {
        const params = {
            search: 'term',
            limit: 10,
        }

        beforeAll(() => {
            loaderSpy = jasmine.createSpyObj('loader', ['games', 'companies'])
            spyOn(IgdbDataLoader.prototype, 'games').and.callFake(loaderSpy.games)
            spyOn(IgdbDataLoader.prototype, 'companies').and.callFake(loaderSpy.companies)

            queriesProvider = new QueriesProvider()
        })

        it("checks games was called", () => {
            queriesProvider.getGames(params)
            expect(loaderSpy.games).toHaveBeenCalledWith(params.search, params.limit)
        })

        it("checks companies was called", () => {
            queriesProvider.getCompanies(params)
            expect(loaderSpy.companies).toHaveBeenCalledWith(params.search, params.limit)
        })
    })
})
