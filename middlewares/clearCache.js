const { cleanCache } = require('../services/cache');

module.exports = async (req,res,next) => {
  await next();
  cleanCache(req.user.id);
};