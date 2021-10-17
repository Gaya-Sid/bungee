const groupByDecade = crimeData => {
  let decadeSum = {};
  crimeData.forEach((cv, i) => {
    const getDecade = year => {
      return parseInt(Number(year) / 10) * 10;
    };

    let currentDecade = getDecade(cv.Year);

    if (i == 0) {
      decadeSum[Number(cv.Year)] = {};
      decadeSum[" "] = currentDecade;
      decadeSum[currentDecade].Population = 0;
      decadeSum[currentDecade].Violent = 0;
      decadeSum[currentDecade].Property = 0;
      decadeSum[currentDecade].Murder = 0;
      decadeSum[currentDecade].Forcible_Rape = 0;
      decadeSum[currentDecade].Robbery = 0;
      decadeSum[currentDecade].Aggravated_assault = 0;
      decadeSum[currentDecade].Burglary = 0;
      decadeSum[currentDecade].Larceny_Theft = 0;
      decadeSum[currentDecade].Vehicle_Theft = 0;
    }

    if (decadeSum.hasOwnProperty(currentDecade.toString())) {
      decadeSum[currentDecade][" "] = currentDecade;
      decadeSum[currentDecade].Population = Number(cv.Population);
      decadeSum[currentDecade].Violent += Number(cv.Violent);
      decadeSum[currentDecade].Property += Number(cv.Property);
      decadeSum[currentDecade].Murder += Number(cv.Murder);
      decadeSum[currentDecade].Forcible_Rape += Number(cv.Forcible_Rape);
      decadeSum[currentDecade].Robbery += Number(cv.Robbery);
      decadeSum[currentDecade].Aggravated_assault += Number(
        cv.Aggravated_assault
      );
      decadeSum[currentDecade].Burglary += Number(cv.Burglary);
      decadeSum[currentDecade].Larceny_Theft += Number(cv.Larceny_Theft);
      decadeSum[currentDecade].Vehicle_Theft += Number(cv.Vehicle_Theft);
    } else {
      decadeSum[Number(cv.Year)] = {};
      decadeSum[currentDecade][" "] = currentDecade;
      decadeSum[currentDecade].Population = Number(cv.Population);
      decadeSum[currentDecade].Violent = Number(cv.Violent);
      decadeSum[currentDecade].Property = Number(cv.Property);
      decadeSum[currentDecade].Murder = Number(cv.Murder);
      decadeSum[currentDecade].Forcible_Rape = Number(cv.Forcible_Rape);
      decadeSum[currentDecade].Robbery = Number(cv.Robbery);
      decadeSum[currentDecade].Aggravated_assault = Number(
        cv.Aggravated_assault
      );
      decadeSum[currentDecade].Burglary = Number(cv.Burglary);
      decadeSum[currentDecade].Larceny_Theft = Number(cv.Larceny_Theft);
      decadeSum[currentDecade].Vehicle_Theft = Number(cv.Vehicle_Theft);
    }
  });
  return decadeSum;
};

const occupationByAge = data => {
  let occupations = [...new Set(data.map(cv => cv.occupation))].sort();
  let result = {};

  occupations.map(occupation => {
    result[occupation] = {};
    result[occupation].occupation = occupation;
    result[occupation].minAge = 500;
    result[occupation].maxAge = 0;
    data.filter(cv => {
      if (cv.occupation == occupation) {
        if (result[occupation].minAge > cv.age) {
          result[occupation].minAge = cv.age;
        }
        if (result[occupation].maxAge < cv.age) {
          result[occupation].maxAge = cv.age;
        }
      }
    });
  });

  return result;
  
};

const teamsAndCards = teamData => {
  const result = teamData.reduce((acc, cv) => {
    
    if(acc.hasOwnProperty(cv.Team)){
      acc[cv.Team]['Yellow Cards'] += Number(cv['Yellow Cards']);
      acc[cv.Team]['Red Cards'] += Number(cv['Red Cards']);

    }else {
      acc[cv.Team] = {};
      acc[cv.Team].Team = cv.Team; 
      acc[cv.Team]['Yellow Cards'] = cv['Yellow Cards'];
      acc[cv.Team]['Red Cards'] = cv['Red Cards'];
    }

    return acc

  }, {})
  return Object.entries(result)
  .sort((a,b) =>  {
    if(Number(b[1]['Red Cards']) > Number(a[1]['Red Cards'])) return 1;
    if(Number(b[1]['Red Cards']) < Number(a[1]['Red Cards'])) return -1;
    if(Number(b[1]['Yellow Cards']) > Number(a[1]['Yellow Cards'])) return 1;
    if(Number(b[1]['Yellow Cards']) < Number(a[1]['Yellow Cards'])) return -1;
  } );
}

module.exports = {
  groupByDecade,
  occupationByAge,
  teamsAndCards
};
