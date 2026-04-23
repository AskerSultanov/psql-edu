import transformObj from "../../../transformObj.js";

var saveReportToDb = async function (dbClient, { skus, ...totals }) {
  var pipeline = `INSERT INTO reports (${transformObj(Object.keys(totals), false)}, skus)
                                VALUES (${transformObj(Object.values(totals))}, ('${JSON.stringify(skus)}')) ;`;
  var { rows } = await dbClient.query(pipeline);

  return rows;
};

export default saveReportToDb;
