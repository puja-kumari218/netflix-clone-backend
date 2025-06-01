import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../utils/db.js";

const random = asyncHandler(async (req, res) => {
  try {
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

const movies = asyncHandler(async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

export { random, movies };
