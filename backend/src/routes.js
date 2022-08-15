import { Router } from "express";
import {
  selectLocalizations,
  selectLocalization,
  insertLocalization,
  updateLocalization,
  deleteLocalization,
} from "./controler/localization.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    msg: "API Rodando ",
  });
});

router.get("/localizations", selectLocalizations);
router.get("/localization/:key", selectLocalization);
router.post("/localization", insertLocalization);
router.put("/localization", updateLocalization);
router.delete("/localization/:key", deleteLocalization);

export default router;
