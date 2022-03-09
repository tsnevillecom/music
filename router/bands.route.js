const express = require("express");
const router = new express.Router();
const authenticate = require("../middleware/auth");

import { getBands, seedBands, getBand } from "../controllers/bands.controller";

router.get("/", authenticate, getBands);
router.get("/seed", authenticate, seedBands);
router.get("/:slug", authenticate, getBand);

module.exports = router;
