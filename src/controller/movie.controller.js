import lodash from "lodash";
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

const insertFavorite = asyncHandler(async (req, res) => {
  try {
    const { email, movieId } = req.body;

    const existingMovies = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovies) throw new Error("Invalid Id");

    const user = await prisma.user.update({
      where: {
        email: email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

const deleteFavorite = asyncHandler(async (req, res) => {
  try {
    const { email, movieId } = req.query;

    const existingMovies = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovies) throw new Error("Invalid Id");

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const updateFavoritesIds = lodash.without(user?.favoriteIds, movieId);
    const updatedUser = await prisma.user.update({
      where: {
        email: email || "",
      },
      data: {
        favoriteIds: updateFavoritesIds,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});

const getFavorite = asyncHandler(async (req, res) => {
  try {
    const { email } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: user?.favoriteIds,
        },
      },
    });
    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});
const getMovieDetails = asyncHandler(async (req, res) => {
  try {
    const { movieId } = req.params;
    if (typeof movieId !== "string") {
      throw new Error("Invaild ID");
    }
    if (!movieId) {
      throw new Error("Invaild ID");
    }
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw new Error("Invaild ID");
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
});
export { random, movies, insertFavorite, deleteFavorite, getFavorite, getMovieDetails};
