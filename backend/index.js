const oracledb = require("oracledb");

async function checkConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "seankovacs",
      password: "3zhBpnVi7YbLMigS5NZ0WQO5",
      connectString: "oracle.cise.ufl.edu:1521/orcl",
    });
    console.log("connected to database");
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();
