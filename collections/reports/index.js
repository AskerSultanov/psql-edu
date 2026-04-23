import getReportById from "./services/getReportFromDb.js";
import saveReportToDb from "./services/saveReportToDb.js";
import deleteReportFromDb from "./services/deleteReportFromDb.js";
import deleteAllReportsByUserId from "./services/deleteAllReportsByUserId.js";

export default { saveReportToDb, getReportById, deleteReportFromDb, deleteAllReportsByUserId };
