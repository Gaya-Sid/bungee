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


module.exports = {
  occupationByAge
};
