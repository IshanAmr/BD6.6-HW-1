const { getAllMovies, getMovieById } = require("../controllers/index");
const request = require("supertest");
const http = require('http');
const { app } = require("../index");

jest.mock("../controllers", () => {
    const originalModule = jest.requireActual("../controllers");
    return {
        ...originalModule,
        getAllMovies: jest.fn(),
        getMovieById: jest.fn(),
    };
});

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Controller Function tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all movies", () => {
        const mockMovies = [
          {
            'movieId': 1,
            'title': 'Onception',
            'genre': 'Sci-Fi',
            'director': 'Christopher Nolan'
          },
          {
            'movieId': 2,
            'title': 'Bhawshank Redemption',
            'genre': 'Drama',
            'director': 'Frank Darabont'
          }
        ];

        getAllMovies.mockReturnValue(mockMovies);

        const results = getAllMovies();
        expect(results).toEqual(mockMovies);
        expect(results.length).toBe(2);
    });

    it("should return movie given id", () => {
      const mockMovie = 
      {
        'movieId': 1,
        'title': 'Onception',
        'genre': 'Sci-Fi',
        'director': 'Christopher Nolan'
      }

      getMovieById.mockReturnValue(mockMovie);

      const results = getMovieById(1);
      expect(results).toEqual(mockMovie);
  });
});

describe("API Endpoint tests", () => {
    it("GET /movies should get all movies", async () => {
        const mockMovies = [
          {
            'movieId': 1,
            'title': 'Onception',
            'genre': 'Sci-Fi',
            'director': 'Christopher Nolan'
          },
          {
            'movieId': 2,
            'title': 'Bhawshank Redemption',
            'genre': 'Drama',
            'director': 'Frank Darabont'
          }
        ];

        getAllMovies.mockReturnValue(mockMovies);

        const res = await request(server).get("/movies");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ movies: mockMovies });
    });

    it("GET /movies/details/:id should get a movie by ID", async () => {
      const mockMovie = 
      {
        'movieId': 1,
        'title': 'Onception',
        'genre': 'Sci-Fi',
        'director': 'Christopher Nolan'
      };

        getMovieById.mockReturnValue(mockMovie);

        const res = await request(server).get("/movies/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ movie: mockMovie });
    });
});
