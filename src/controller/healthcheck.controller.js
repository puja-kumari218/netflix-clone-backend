import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
  return res.send("Server is working fine !");
});

export { healthcheck };
