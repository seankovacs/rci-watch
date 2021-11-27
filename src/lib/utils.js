const moment = require('moment');

const groupBy = (x, f) =>
  x.reduce((a, b) => {
    var _f;

    return (a[(_f = f(b))] || (a[_f] = [])).push(b), a;
  }, {});

const getDates = (start, end) => {
  let fromDate = moment(start)
  let toDate = moment(end)
  let diff = toDate.diff(fromDate, 'months')
  let range = []
  for (let i = 0; i <= diff; i++) {
    range.push(moment(start).add(i, 'months'))
  }
  return range.sort((a,b)=> b - a)
}

const getYears = (min, max) => {
  return Array.from({
    length: max - min + 1
 }, (_, i) => min + i)
}

exports.groupBy = groupBy;
exports.getDates = getDates;
exports.getYears = getYears