const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");
const { Parser } = require("json2csv");
const express = require("express");
const app = express();

const home = path.join(__dirname, "../public/index.html");
const question1 = path.join(__dirname, "../input/question-1/main.csv");
const answer1 = path.join(__dirname, "../output/answer-1/");

const { groupByDecade } = require("./solution");


let solution1;

function main() {
  csv()
    .fromFile(question1)
    .then(crimeData => {
      solution1 = groupByDecade(crimeData);
      saveData(groupByDecade(crimeData), "answer1");
    });
}

main();


const saveData = (result, fileName = "data") => {
  
  const fields = [" ","Population","Violent","Property","Murder","Forcible_Rape","Robbery","Aggravated_assault","Burglary","Larceny_Theft","Vehicle_Theft"];
  const opts = { fields };
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(Object.values(result));
    
    fs.writeFile(answer1 + fileName +".csv", csv, "utf8", err => {
      if (err) {
      console.error(err);
      }
  })
  } catch (err) {
    console.error(err);
  }
 
};


app.use(express.static("public"));

// serve index.html
app.get("/solution1", function(req, res) {
  res.json(solution1)
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at : http://127.0.0.1:${PORT}/solution1`);
});
