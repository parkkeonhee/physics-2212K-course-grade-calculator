/* global $*/

var lectureTotal = labGrade();
var labTotal = lectureGrade();

var courseTotal = ((lectureTotal + labTotal) / 10);

console.log("Actual course grade: " + courseTotal);

// Parse to int so switch case statement can be used.
courseTotal = parseInt(courseTotal, 10);

var courseLetterGrade = letterGrade(courseTotal);

console.log("Integer course grade: " + courseTotal);
$(".h").append("You got an " + courseLetterGrade);

function letterGrade(courseTotal) {
  var letterGrade = "";
  switch (courseTotal) {
    case 100:
    case 99:
    case 98:
    case 97:
      letterGrade = "A+";
      break;
    case 96:
    case 95:
    case 94:
    case 93:
    case 92:
    case 91:
    case 90:
      letterGrade = "A";
      break;
    default:
      letterGrade = "F";
  }
  return letterGrade;
}

function lectureGrade() {
  var examGrades = [100, 95, 100, 100];
  var homeworkTotal = 100;
  var attendanceTotal = 200;
  var quizTotal = 85;

  var examTotal = 0;
  examGrades.forEach(function(examGrades) {
    examTotal += examGrades;
  });
  var lectureTotal = examTotal + homeworkTotal + attendanceTotal + quizTotal;

  return lectureTotal;
}

function labGrade() {
  var labAttendanceTotal = 55;
  var labHomeworkTotal = 52;

  var lab0 = 15; // Excel Skills Refresher

  var lastAssessmentTest = 15;

  var labExperiments = [12, 12, 13, 15, 15, 15, 15, 15, 15, 15, 15];

  var lowestLabGrade = labExperiments[0];
  var lowestLabGradeIndex = 0;

  var lowestLabGradeReplaced = lab0;


  // Find lowest grade
  for (var i = 1; i < labExperiments.length; i++) {
    if (lowestLabGrade >= labExperiments[i]) {
      lowestLabGrade = labExperiments[i];
      lowestLabGradeIndex = i;
    }
  }

  // Delete lowest grade
  labExperiments.splice(lowestLabGradeIndex, 1);


  // Restart
  lowestLabGrade = labExperiments[0];
  lowestLabGradeIndex = 0;

  // Find lowest grade
  for (var i = 1; i < labExperiments.length; i++) {
    if (lowestLabGrade >= labExperiments[i]) {
      lowestLabGrade = labExperiments[i];
      lowestLabGradeIndex = i;
    }
  }

  // Replace lowest grade
  labExperiments.splice(lowestLabGradeIndex, 1, lab0);

  var labExperimentTotalGrades = 0;

  // Add lab assessment test grade
  labExperiments.splice(labExperiments.length, 0, lastAssessmentTest);

  // Add up the lab experiment grades
  labExperiments.forEach(function(labExperiments) {
    labExperimentTotalGrades += labExperiments;
  });

  // Average for lab experiment after dropping 1 lowest and replacing lowest with 15 (max) points.
  var labExperimentAverageGrade = (labExperimentTotalGrades / labExperiments.length);

  // Making it 20% like on the syllabus
  var labAverageGrade = (labExperimentAverageGrade + (labAttendanceTotal / 11) + (labHomeworkTotal / 11)) * 8;
  
  return labAverageGrade;
}