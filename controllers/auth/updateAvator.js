const fs = require("fs/promises");
const path = require("path");

const User = require("../../models/user");
const { jimp } = require('../../helpers/avatarsJimp');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const {path: tempUpload, originalname} = req.file;
    const {_id} = req.user;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    const img = path.resolve("public", avatarURL);
    jimp(img);

    res.json({ avatarURL });
}

module.exports = updateAvatar;