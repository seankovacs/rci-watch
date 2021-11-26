const groupBy = (x, f) =>
  x.reduce((a, b) => {
    var _f;

    return (a[(_f = f(b))] || (a[_f] = [])).push(b), a;
  }, {});

exports.groupBy = groupBy;
