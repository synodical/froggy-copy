const express = require("express");
const { request } = require("http");
const Yarn = require("../models").Yarn;
const Pattern = require("../models").Pattern;
const Image = require("../models").Image;
const router = express.Router();
const Fiber = require("../models").Fiber;

router.post("/", async (req, res, next) => {
  let resJson = { status: "N" };
  //console.log(req.body);
  const { yarn } = req.body;

  if (yarn === undefined) {
    return res.json(resJson);
  }
  const {
    gauge_divisor,
    grams,
    id,
    machine_washable,
    name,
    yardage,
    yarn_company,
    yarn_fibers,
  } = req.body.yarn;
  let yarn_company_name, yarn_company_url;
  if (yarn_company !== undefined) {
    yarn_company_name = yarn_company.name;
    yarn_company_url = yarn_company.url;
  }
  try {
    const yarnId = yarn.id;
    const exYarn = await Yarn.findOne({ where: { raverlyId: yarnId } });
    if (exYarn) {
      return res.json(resJson);
    }
    const insertResult = await Yarn.create({
      gaugeDivisor: gauge_divisor,
      grams: grams,
      raverlyId: id,
      machineWashable: machine_washable,
      name: name,
      yardage: yardage,
      yarnCompanyName: yarn_company_name,
      yarnCompanyUrl: yarn_company_url,
    });

    for (let photo of yarn.photos) {
      const imageInsertResult = await Image.create({
        targetType: "yarn",
        targetId: insertResult.dataValues.id,
        squareUrl: photo.square_url,
        mediumUrl: photo.medium_url,
        shelvedUrl: photo.shelved_url,
      });
    }
    for (let yarnFiber of yarn_fibers) {
      await Fiber.create({
        raverlyId: yarnFiber.id,
        typeId: yarnFiber.fiber_type.id,
        name: yarnFiber.fiber_type.name,
        animalFiber: yarnFiber.fiber_type.animal_fiber,
        vegetableFiber: yarnFiber.fiber_type.vegetable_fiber,
        yarnId: id,
      });
    }
    resJson["status"] = "Y";
    return res.json(resJson);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
