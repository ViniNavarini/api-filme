const express = require("express");
const router = express.Router();
const AwardsService = require("../services/AwardsService");

router.get("/awards", async (req, res) => {
  try {
    this.awardsService = new AwardsService();
    const result = await this.awardsService.readAwardsDatabase();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
