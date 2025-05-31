import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../utils/db.js";
import { comparePassword, hashPassword, generateToken } from "../utils/lib.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send("Please enter email");
  }

  if (!password) {
    return res.status(400).send("Please enter your password");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.hashedPassword);

  if (!isMatch) {
    return res.status(401).send("Invalid email or password");
  }

  // generate a JWT token
  const token = generateToken(user.id);

  return res.json({
    message: "Login successful",
    token: token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email) {
    return res.status(404).send("Please enter email");
  }

  if (!name) {
    return res.status(404).send("Please enter your name");
  }

  if (!password) {
    return res.status(404).send("Please enter your password");
  }

  const users = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (users) {
    return res
      .status(401)
      .send("Email already exists, please enter a different email!");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      hashedPassword: hashedPassword,
    },
  });

  if (!user) {
    return res.status(500).send("Something went wrong!");
  }

  return res.json({
    message: "Register successful",
  });
};

export { login, register };
