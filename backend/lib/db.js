const oracledb = require("oracledb");

async function getDBConnection(user, pass, cs) {
  try {
    return await oracledb.getConnection({
      user: user,
      password: pass,
      connectString: cs,
    });
  } catch (err) {
    console.error(`Could not establish DB connection. ${err.message}`);
    return null;
  }
}

async function cleanUpDBConnection(conn) {
  if (conn) {
    try {
      await conn.close();
    } catch {}
  }
}

exports.getDBConnection = getDBConnection;
exports.cleanUpDBConnection = cleanUpDBConnection;
