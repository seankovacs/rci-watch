const express = require("express");
var bodyParser = require("body-parser");
var GeoJSON = require("geojson");
const { hashRows, md5Hash, citiesToSQLIN } = require("./lib/utils");
const { getDBConnection, cleanUpDBConnection } = require("./lib/db");
const {
  hotMarketQuery,
  inventoryAgeQuery,
  medianSalesVsWageDataQuery,
  medianSalesVsUnemploymentDataQuery
} = require("./queries");

const ORACLE_USER = "seankovacs";
const ORACLE_PW = "3zhBpnVi7YbLMigS5NZ0WQO5";
const ORACLE_CS = "oracle.cise.ufl.edu:1521/orcl";
const HASH_SECRET = "CIS4301";
const PORT = 5000;

const app = express();
app.use(bodyParser.json());

// CORS stuff
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Payload {ok: true/false, error?, data?}

function standardError(res, error) {
  return res.status(400).json({ ok: false, error });
}

// login
app.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const md5Password = md5Hash(password, HASH_SECRET);

  const db = await getDBConnection(ORACLE_USER, ORACLE_PW, ORACLE_CS);
  if (!db) {
    return standardError(res, "Couldn't establish a DB connection.");
  }

  try {
    const retval = await db.execute(
      `SELECT id, email FROM users WHERE email = :e AND password = :p`,
      { e: email, p: md5Password }
    );
    var result = hashRows(retval);
  } catch (e) {
    var error = e;
  } finally {
    await cleanUpDBConnection(db);
    if (error) return standardError(res, error.message);
    const user = result[0];
    return res.json({ ok: true, data: user ?? null });
  }
});

// hot market
app.get("/hot-market", async function (req, res) {
  const { start, end, ne_lat, ne_lng, sw_lat, sw_lng } = req.query;
  const startDateClean = start ?? "2021-05-01";
  const endDateClean = end ?? "2021-07-01";
  const nelatClean = ne_lat ?? 24.46;
  const nelngClean = ne_lng ?? -87.5;
  const swlatClean = sw_lat ?? 31.05;
  const swlngClean = sw_lng ?? -80;

  const db = await getDBConnection(ORACLE_USER, ORACLE_PW, ORACLE_CS);
  if (!db) {
    return standardError(res, "Couldn't establish a DB connection.");
  }

  try {
    const retval = await db.execute(hotMarketQuery, {
      startDate: startDateClean,
      endDate: endDateClean,
      nelng: parseFloat(nelngClean),
      nelat: parseFloat(nelatClean),
      swlng: parseFloat(swlngClean),
      swlat: parseFloat(swlatClean),
    });
    const result = hashRows(retval);
    var geoJSON = GeoJSON.parse(result, { Point: ["latitude", "longitude"] });
  } catch (e) {
    var error = e;
  } finally {
    await cleanUpDBConnection(db);
    if (error) return standardError(res, error.message);
    // console.dir(geoJSON);
    return res.json({ ok: true, data: geoJSON });
  }
});

// inventory age
app.get("/inventory-age", async function (req, res) {
  const { start, end, cities } = req.query;
  const startDateClean = start ?? "2021-05-01";
  const endDateClean = end ?? "2021-07-01";
  const citiesClean =
    citiesToSQLIN(cities) ??
    "(SELECT DISTINCT MAJOR_METRO FROM ZIPCODE_LOOKUP)";

  const db = await getDBConnection(ORACLE_USER, ORACLE_PW, ORACLE_CS);
  if (!db) {
    return standardError(res, "Couldn't establish a DB connection.");
  }

  try {
    // oracledb makes it extra difficult to pass in elements to an IN statement, hence the function. dangerous for production due to sql injection
    const retval = await db.execute(inventoryAgeQuery(citiesClean), {
      startDate: startDateClean,
      endDate: endDateClean,
    });
    var result = hashRows(retval);
  } catch (e) {
    var error = e;
  } finally {
    await cleanUpDBConnection(db);
    if (error) return standardError(res, error.message);
    return res.json({ ok: true, data: result });
  }
});

// wage + realestate
app.get("/average-wealth", async function (req, res) {
  const { start, end, cities } = req.query;
  const startYear = start ?? "2012";
  const endYear = end ?? "2018";
  const citiesClean =
    citiesToSQLIN(cities) ??
    "(SELECT DISTINCT MAJOR_METRO FROM ZIPCODE_LOOKUP)";
  const startYearDate = `${startYear}-01-01`
  const endYearDate = `${endYear}-01-01`

  const db = await getDBConnection(ORACLE_USER, ORACLE_PW, ORACLE_CS);
  if (!db) {
    return standardError(res, "Couldn't establish a DB connection.");
  }

  try {
    // oracledb makes it extra difficult to pass in elements to an IN statement, hence the function. dangerous for production due to sql injection
    const retval = await db.execute(medianSalesVsWageDataQuery(citiesClean), {
      startDate: startYearDate,
      endDate: endYearDate,
      startYear: startYear,
      endYear: endYear,
    });
    var result = hashRows(retval);
  } catch (e) {
    var error = e;
  } finally {
    await cleanUpDBConnection(db);
    if (error) return standardError(res, error.message);
    return res.json({ ok: true, data: result });
  }
});

// unemployment
app.get("/unemployment", async function (req, res) {
  const { start, end, cities } = req.query;
  const startYear = start ?? "2012";
  const endYear = end ?? "2018";
  const citiesClean =
    citiesToSQLIN(cities) ??
    "(SELECT DISTINCT MAJOR_METRO FROM ZIPCODE_LOOKUP)";
  const startYearDate = `${startYear}-01-01`
  const endYearDate = `${endYear}-01-01`

  const db = await getDBConnection(ORACLE_USER, ORACLE_PW, ORACLE_CS);
  if (!db) {
    return standardError(res, "Couldn't establish a DB connection.");
  }

  try {
    // oracledb makes it extra difficult to pass in elements to an IN statement, hence the function. dangerous for production due to sql injection
    const retval = await db.execute(medianSalesVsUnemploymentDataQuery(citiesClean), {
      startDate: startYearDate,
      endDate: endYearDate,
      startYear: startYear,
      endYear: endYear,
    });
    var result = hashRows(retval);
  } catch (e) {
    var error = e;
  } finally {
    await cleanUpDBConnection(db);
    if (error) return standardError(res, error.message);
    return res.json({ ok: true, data: result });
  }
});

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit(0);
});

app.listen(PORT, () => console.log("App listening on port %s!", PORT));
