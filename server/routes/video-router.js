const VideoData = require("../db/models/video-insertion");

const insertData = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Select a square",
    });
  }

  const video = new VideoData();
  // video.incidentData.push(body);
  video.drawnData = body;

  if (!video) {
    return res.status(400).json({ success: false });
  }

  console.log("inserting some data");
  video
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: video._id,
        message: "Inserted",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        err,
        message: "Not Inserted",
      });
    });
};

const getData = async (req, res) => {
  console.log("getting some data");
  await VideoData.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!data.length) {
      return res.status(404).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: data });
  }).catch((err) => console.log(err));
};

const deleteAllData = async (req, res) => {
  // TO BE REMOVED IN PRODUCTION
  console.log("deleted some data");
  await VideoData.deleteMany({}, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: data });
  });
};

module.exports = {
  insertData,
  getData,
  deleteAllData,
};
