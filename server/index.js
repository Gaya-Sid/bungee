const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");
const { Parser } = require("json2csv");
const express = require("express");
const app = express();

const home = path.join(__dirname, "../public/index.html");
const question1 = path.join(__dirname, "../input/question-1/main.csv");
const question2 = path.join(__dirname, "../input/question-2/main.csv");
const question3 = path.join(__dirname, "../input/question-2/main.csv");
const answer1 = path.join(__dirname, "../output/answer-1/");
const answer2 = path.join(__dirname, "../output/answer-2/");
const answer3 = path.join(__dirname, "../output/answer-3/");

const { groupByDecade, 
        occupationByAge,
        teamsAndCards } = require("./solution");

let solution1;
let solution2;
let solution3;

function main() {
  csv()
    .fromFile(question1)
    .then(crimeData => {
      solution1 = groupByDecade(crimeData);
      const fields = [" ","Population","Violent","Property","Murder","Forcible_Rape","Robbery","Aggravated_assault","Burglary","Larceny_Theft","Vehicle_Theft"];
      saveData(solution1, answer1, fields);
    });

  csv()
    .fromFile(question2)
    .then(occupationData => {
      solution2 = occupationByAge(occupationData);
      const fields = ["occupation","minAge","maxAge"];
      saveData(solution2, answer2, fields);
    });

  csv()
    .fromFile(question3)
    .then(teamData => {
      solution3 = teamsAndCards(teamData);
      // const fields = ["occupation","minAge","maxAge"];
      // saveData(solution2, answer2, fields);
    });

}

main();


const saveData = (result, path , name, fields) => {
  
  const opts = { fields };
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(Object.values(result));
    
    fs.writeFile(  path + "main" +".csv", csv, "utf8", err => {
      if (err) {
      console.error(err);
      }
  })
  } catch (err) {
    console.error(err);
  }
 
};


app.use(express.static("public"));

// solution1
app.get("/solution1", function(req, res) {
  res.json(solution1)
});

// solution2
app.get("/solution2", function(req, res) {
  res.json(solution2)
});

// solution3
app.get("/solution2", function(req, res) {
  res.json(solution2)
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at : http://127.0.0.1:${PORT}/solution1`);
});
