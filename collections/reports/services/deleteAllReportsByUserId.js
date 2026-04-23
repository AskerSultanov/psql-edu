var deleteAllReportsByUserId = async (client, userId) => {
  var pipeline = `DELETE FROM reports WHERE user_id = '${userId}' ;`;
  var result = await client.query(pipeline);
  return result.rowCount > 0;
};
export default deleteAllReportsByUserId;
