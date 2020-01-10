const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "af1cb253e4934db3a7e78a48e0e0c5ca"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.CELEBRITY_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall
};
