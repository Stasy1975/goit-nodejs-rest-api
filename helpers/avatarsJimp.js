const Jimp = require("jimp");

const jimp = async(image) => {
   try {
     const avatar = await Jimp.read(image);
    avatar.resize(250, 250);
    await avatar.writeAsync(image);
   } catch (error) {
    console.log(error)
   }
};

module.exports = jimp;