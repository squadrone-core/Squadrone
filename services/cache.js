const mongoose = require('mongoose');
const redis = require('redis');
const keys = require('../config/prod');
const client = redis.createClient(keys.redisUrl);
const util = require('util');
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};


mongoose.Query.prototype.exec = async function () {
    console.log(this.useCache);
    if(!this.useCache) {
        return exec.apply(this,arguments);
    }
    const query = this.getQuery();
    const key = {...query, ...{ collection: this.mongooseCollection.name } };
    const cachedData = await client.hget(this.hashKey,JSON.stringify(key));
    if(cachedData) {
        const data = JSON.parse(cachedData);
        return Array.isArray(data) ? data.map((d)=> new this.model(d)) : new this.model(data);
    }
    const data = await exec.apply(this,arguments);
    client.hset(this.hashKey,JSON.stringify(key),JSON.stringify(data),'EX',10);
    return data;
};


module.exports = {
    cleanCache(key){
        client.del(JSON.stringify(key));
    }
};