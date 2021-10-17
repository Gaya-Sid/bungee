const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");
const { Parser } = require("json2csv");

const question1 = path.join(__dirname, "./input/question-1/main.csv");
const question2 = path.join(__dirname, "./input/question-2/main.csv");
const question3 = path.join(__dirname, "./input/question-3/main.csv");
const answer1 = path.join(__dirname, "./output/answer-1/");
const answer2 = path.join(__dirname, "./output/answer-2/");
const answer3 = path.join(__dirname, "./output/answer-3/");

const {groupByDecade} = require('./output/answer-1/solution1');
const {occupationByAge} = require('./output/answer-2/solution2');
const {teamsAndCards} = require('./output/answer-3/solution3');


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
      solution3 = teamsAndCards(teamData).reduce((acc, cv) => {
        acc[cv[0]] = {};
        acc[cv[0]] = cv[1];
        return acc
      }, {});
      const fields = ["Team","Yellow Cards","Red Cards"];
      saveData(solution3, answer3, fields);
    });

}

main();

const saveData = (result, path , fields) => {
  
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
