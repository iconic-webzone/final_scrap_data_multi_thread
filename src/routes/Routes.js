import express from "express";
const Router = express.Router();
import { upload } from "../middleware/multer.js";
import extractEmailFromUrl from "../controller/extractEmailFromCsv.js";
import downloadCsv from "../controller/downloadCsv.js";

Router.post("/", upload.single("csvFile"),extractEmailFromUrl);
Router.get("/", downloadCsv )

export default Router ;