var getReportFromDb = async (client, userId, reportId) => {
  var pipeline = `SELECT * FROM reports AS report WHERE user_id = '${userId}' AND report_id = ${reportId};`;
  console.log({ pipeline });
  var report = await client.query(pipeline);
  return { report: report.rows[0] };
};

export default getReportFromDb;
