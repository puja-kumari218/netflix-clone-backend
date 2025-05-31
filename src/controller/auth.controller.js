import { asyncHandler } from "../utils/asyncHandler.js";

const login = asyncHandler(async (req, res) => {
  const body = req.body;
  return res.send(body);
});
const register = asyncHandler(async (req, res) => {
  const body = req.body;
  return res.send(body);
});

export { login, register };
