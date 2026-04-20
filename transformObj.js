var transformObj = (data, isValues = true) => {
  var str = "";
  var count = 0;

  for   (var val of data) {
    if (typeof val === "string") {
      if (isValues) {
        str += "'" + val + "'";
      } else {
        str += val;
      }
    } else if (typeof val === "object" && val !== null) {
      if (isValues) {
        str += "'" + JSON.stringify(val) + "'";
      } else {
        str += val;
      }
    } else {
      str += val;
    }

    if (count < data.length - 1) {
      str += ",";
    }

    count++;
  }
  return str;
};

export default transformObj;
