const MongoClient = require('../api/dbConnect');
const { config } = require('../config');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const client = await MongoClient;

    const db = await client.db(config.MONGO_DB);
    const importConditions = await db.collection("importConditions").findOne({ $or:[
        {Commodity: req.body.Commodity}, {SourceCountry: req.body.SourceCountry}, {TariffCode: req.body.TariffCode}]
    });
    console.log(req.body.Commodity);
    const responseMessage = importConditions;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}