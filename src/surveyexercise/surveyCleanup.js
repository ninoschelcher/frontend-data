const surveyData = data
const surveyQuestion = "lievelingskleur";

const getSpecificAnswer = (surveyData, surveyQuestion) => {
  let specificAnswers = [];
  surveyData.map(surveyData => specificAnswers.push(surveyData[surveyQuestion]))
  return specificAnswers;
}

const removeFaultyAnswers = (specificAnswers) => {
  const faultyFilter = specificAnswers.filter(answer => {
    return answer !== '' && answer !== '/' && answer !== '0';
  });
  return faultyFilter;
}

const formatAnswers = (correctedAnswers) => {
  let rightAnswers = [];
  let wrongAnswers = [];

  const allWrittenColours = {
    legergroen: '#54552B',
    staal: '#5D6565',
    grijs: '#b8b8b8',
    zwart: '#000000',
    rood: '#FF0101',
    geel: '#F7F700'
  }

  const writtenColours = Object.keys(allWrittenColours)

  correctedAnswers.map(answer => {
    answer = answer.split('.').join("");
    answer = answer.split(" ")[0];
    answer = answer.toLowerCase();

    if (writtenColours.includes(answer)) {
    wrongAnswers.push(allWrittenColours[answer]);
    } else {
      if (answer.charAt(0) != '#') {
        answer = '#' + answer;
      }
      if (answer.length > 4 && answer.length < 7) {
        answer = answer.slice(0, 4);
      }
      rightAnswers.push(answer);
    }
  });

  const cleanedData = wrongAnswers.concat(rightAnswers).sort();
  return cleanedData;
}

const showCircles = (formattedAnswers) => {
  formattedAnswers.map(answer => {
    const block = document.createElement('div');
    const favouriteColour = document.createElement('div');
    const colourCode = document.createElement('p');

    block.className = 'circle';
    colourCode.innerText = answer;
    favouriteColour.className = 'favouritecolour'
    favouriteColour.style.backgroundColor = answer;
    if (answer === '#ffffff') {
      favouriteColour.style.border = "3px solid black";
    }

    document.querySelector('.overview').appendChild(block);
    block.appendChild(colourCode);
    block.appendChild(favouriteColour);
  })
}

const cleanData = getSpecificAnswer(surveyData, surveyQuestion);
const faultyAnswers = removeFaultyAnswers(cleanData);
const formattedAnswers = formatAnswers(faultyAnswers);
const finishedData = showCircles(formattedAnswers);
