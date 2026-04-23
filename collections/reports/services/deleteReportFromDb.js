var deleteReportFromDb = async (client, userId, reportId) => {
  var pipeline = `DELETE FROM reports WHERE user_id = '${userId}' AND report_id = ${reportId};`;

  var result = await client.query(pipeline);
  return result.rowCount > 0;
};

export default deleteReportFromDb;
