import { writeFileSync } from "node:fs";

var users = [
  {
    userId: "asdfsd324231",
    login: "asker",
    passwd: "sdfds3431",
    schemaVersion: 1,
  },
  {
    userId: "asdfsd324232",
    login: "aida",
    passwd: "sdfds3432",
    schemaVersion: 1,
  },
  {
    userId: "asdfsd324233",
    login: "salima",
    passwde: "sdfds3433",
    schemaVersion: 1,
  },
];

var reportsQueue = [1, 2, 4];

var foo = (data) => {
  var result = "";

  for (var i = 0; i < data.length; i++) {
    var str = "(";
    var arr = "{";

    if (typeof data[i] === "object" && data[i] !== null) {
      var valuesCount = 0;
      var values = Object.values(data[i]);

      for (var k = 0; k < values.length; k++) {
        if (typeof values[k] === "string") {
          str += "'" + values[k] + "'";
        } else {
          str += values[k];
        }

        if (valuesCount < values.length - 1) {
          str += ", ";
        }

        valuesCount++;
      }

      if (i < data.length - 1) {
        str += "), \n";
      } else {
        str += ")\n";
      }
    }

    result += str;
  }

  // writeFileSync("text.txt", result, "utf-8");
  return result;
};

var foo1 = (arr) => "'{ " + arr.join(",") + " }'";

console.log(reportsQueue.join(","));

export default foo;
