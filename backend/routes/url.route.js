import { Router } from "express";
import { handlePostUrl, handleGetShortId, handleGetAllShortId, handleDeleteUrl } from "../controllers/url.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.route("/url/postUrl").post(isAuthenticated, handlePostUrl);

router.route("/:shortId").get(isAuthenticated, handleGetShortId);

router.route("/url/get").get(isAuthenticated, handleGetAllShortId);

router.route("/url/:shortId").delete(isAuthenticated, handleDeleteUrl); // For deleting the URL

export default router;
