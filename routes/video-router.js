const VideoData = require("../db/models/video-insertion");

const insertData = (req, res) => {
  const data = req.body.data;
  const hash = req.body.hash;
  const vidLink = req.body.video;

  if (!data) {
    return res.status(400).json({
      success: false,
      error: "Select a square",
    });
  }

  const video = new VideoData();
  // video.incidentData.push(body);
  video.drawnData = data;
  video.hash = hash;
  video.videoLink = vidLink;

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

const getRoomData = async (req, res) => {
  const hash = req.params.hash;

  await VideoData.find({ hash: hash }, (err, data) => {
    if (err) throw err;
    return res.json({ success: true, data: data });
  }).catch((err) => console.log(err));
};

module.exports = {
  insertData,
  getData,
  deleteAllData,
  getRoomData,
};
