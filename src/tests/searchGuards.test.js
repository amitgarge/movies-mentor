import {
  filterValidTMDBMovies,
  isMovieQuery,
  parseMovieNamesFromAIResponse,
} from "../utils/searchGuards";

describe("search guards", () => {
  test("rejects meaningless random-looking queries before AI search", () => {
    expect(isMovieQuery("ghgh")).toBe(false);
    expect(isMovieQuery("xxxx")).toBe(false);
  });

  test("rejects adult-content intent before AI search", () => {
    expect(isMovieQuery("Adult Content")).toBe(false);
    expect(isMovieQuery("adult movies")).toBe(false);
    expect(isMovieQuery("sex movies")).toBe(false);
    expect(isMovieQuery("18+")).toBe(false);
  });

  test("allows normal movie recommendation queries", () => {
    expect(isMovieQuery("latest hindi comedy")).toBe(true);
    expect(isMovieQuery("RRR")).toBe(true);
    expect(isMovieQuery("dark knight")).toBe(true);
  });

  test("rejects apology or non-movie AI responses", () => {
    expect(
      parseMovieNamesFromAIResponse(
        "I'm sorry, but I can't recommend movies for that query.",
      ),
    ).toEqual([]);
  });

  test("sanitizes comma-separated AI movie names", () => {
    expect(
      parseMovieNamesFromAIResponse(
        "1. Inception, The Matrix, Spirited Away, Mad Max: Fury Road",
      ),
    ).toEqual(["Inception", "The Matrix", "Spirited Away", "Mad Max: Fury Road"]);
  });

  test("keeps only usable TMDB movie records", () => {
    const movies = [
      { id: 1, title: "Inception", poster_path: "/poster.jpg", adult: false },
      { id: 2, title: "No Poster", poster_path: null, adult: false },
      { id: 3, title: "Adult Result", poster_path: "/adult.jpg", adult: true },
      { id: null, title: "Missing Id", poster_path: "/missing.jpg" },
    ];

    expect(filterValidTMDBMovies(movies)).toEqual([movies[0]]);
  });
});
