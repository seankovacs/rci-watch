const hotMarketQuery = `WITH dataset AS (
    SELECT RE.START_PERIOD, Z.MAJOR_METRO, Z.STATE, AVG(Z.LONGITUDE) AS LONGITUDE, AVG(Z.LATITUDE) AS LATITUDE, SUM(RE.MEDIAN_DAYS_ON_MARKET * RE.HOMES_SOLD) / SUM(RE.HOMES_SOLD) AS MEDIAN_DOM, SUM(RE.SOLD_ABOVE_LIST_PCT * RE.HOMES_SOLD) / SUM(RE.HOMES_SOLD) AS  WEIGHTED_SOLD_ABOVE_LIST    FROM REALESTATE RE
    INNER JOIN ZIPCODE_LOOKUP Z
        ON RE.ZIP_CODE = Z.ZIP_CODE
    WHERE
        RE.START_PERIOD BETWEEN TO_DATE(:startDate,'YYYY-MM-DD HH24:MI:SS') AND TO_DATE(:endDate,'YYYY-MM-DD HH24:MI:SS')
        AND ((:swlat < :nelat AND Z.LATITUDE BETWEEN :swlat AND :nelat) OR (:swlat > :nelat AND Z.LATITUDE BETWEEN :nelat AND :swlat))
        AND ((:swlng < :nelng AND Z.LONGITUDE BETWEEN :swlng AND :nelng) OR (:swlng > :nelng AND Z.LONGITUDE BETWEEN :nelng AND :swlng))
    GROUP BY RE.START_PERIOD, Z.MAJOR_METRO, Z.STATE
),
output AS (
    SELECT 
        START_PERIOD
        ,MAJOR_METRO
        ,STATE
        ,LONGITUDE
        ,LATITUDE
        ,MEDIAN_DOM
        ,MEDIAN_DOM - LAG(MEDIAN_DOM) OVER(PARTITION BY MAJOR_METRO ORDER BY START_PERIOD) AS DELTA_MEDIAN_DOM
        ,WEIGHTED_SOLD_ABOVE_LIST
        ,WEIGHTED_SOLD_ABOVE_LIST - LAG(WEIGHTED_SOLD_ABOVE_LIST) OVER(PARTITION BY MAJOR_METRO ORDER BY START_PERIOD) AS DELTA_WEIGHTED_SOLD_ABOVE_LIST
    FROM dataset
    ORDER BY MAJOR_METRO, STATE, START_PERIOD DESC
)
SELECT
    MAJOR_METRO
    ,STATE
    ,AVG(LONGITUDE) AS LONGITUDE
    ,AVG(LATITUDE) AS LATITUDE
    ,AVG(DELTA_MEDIAN_DOM) AS AVG_DELTA_MEDIAN_DOM
    ,AVG(DELTA_WEIGHTED_SOLD_ABOVE_LIST) * 100 AS DELTA_WEIGHTED_SOLD_ABOVE_LIST
    ,(AVG(DELTA_MEDIAN_DOM) * -1 * 0.5) + (AVG(DELTA_WEIGHTED_SOLD_ABOVE_LIST) * 100 * 0.5) AS HOT_SCORE
FROM output
GROUP BY MAJOR_METRO, STATE
ORDER BY HOT_SCORE DESC`;

const inventoryAgeQuery = (cities) => `SELECT RE.START_PERIOD, Z.MAJOR_METRO, Z.STATE, SUM(RE.MEDIAN_DAYS_ON_MARKET * RE.HOMES_SOLD) / SUM(RE.HOMES_SOLD) AS MEDIAN_DOM
    FROM REALESTATE RE
    INNER JOIN ZIPCODE_LOOKUP Z
        ON RE.ZIP_CODE = Z.ZIP_CODE
    WHERE
    RE.START_PERIOD BETWEEN TO_DATE(:startDate,'YYYY-MM-DD HH24:MI:SS') AND TO_DATE(:endDate,'YYYY-MM-DD HH24:MI:SS')
        AND Z.MAJOR_METRO IN(${cities})
    GROUP BY RE.START_PERIOD, Z.MAJOR_METRO, Z.STATE
    ORDER BY Z.MAJOR_METRO, Z.STATE, RE.START_PERIOD`;

exports.hotMarketQuery = hotMarketQuery;
exports.inventoryAgeQuery = inventoryAgeQuery;