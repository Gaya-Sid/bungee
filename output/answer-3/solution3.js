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
 teamsAndCards
}