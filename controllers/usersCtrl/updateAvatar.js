const {User} = require('./../../models/user');
const path  = require('path');
const fs  = require('fs/promises');
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next)=>{

  try {
    const {path: tempUpload, originalname} = req.file;
    const {_id} = req.user;

    try {
        const resultUpload = path.join(avatarsDir, originalname);
        const imgAvatar = await Jimp.read(tempUpload);
        imgAvatar.resize(250, 250).write(resultUpload);
        await fs.rename(tempUpload, resultUpload);
   
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }

    const avatarURL = path.join('public', 'avatars', originalname);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.status(200).json({
        status: "OK",
        code: 200,
        data: {
            avatarURL
        }
        });


  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
