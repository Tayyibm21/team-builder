const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager").default;

//  Starter questions
const teamRole = [
  {
    type: "list",
    name: "role",
    message: "Which employee role do you want to add?",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

// Questions to be rendered depending on the role chosen
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter employee name:",
  },

  {
    type: "input",
    name: "id",
    message: "Enter employee ID:",
  },

  {
    type: "input",
    name: "email",
    message: "Enter employee email:",
  },

  {
    type: "input",
    name: "officeNumber",
    message: "Enter manager's office number:",
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter employee name:",
  },

  {
    type: "input",
    name: "id",
    message: "Enter employee ID:",
  },

  {
    type: "input",
    name: "email",
    message: "Enter employee email:",
  },

  {
    type: "input",
    name: "github",
    message: "Enter engineer's github:",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter employee name:",
  },

  {
    type: "input",
    name: "id",
    message: "Enter employee ID:",
  },

  {
    type: "input",
    name: "email",
    message: "Enter employee email:",
  },

  {
    type: "input",
    name: "school",
    message: "Enter Intern's school:",
  },
];

const continueQuestion = {
  type: "confirm",
  message: "Do you want to add another employee?",
  name: "quit",
};

let employeeArray = [];

// Function to start run the application
const start = async () => {
  let inProgress = true;

  while (inProgress) {
    const { role } = await inquirer.prompt(teamRole);

    if (role === "Manager") {
      const { name, id, email, officeNumber } = await inquirer.prompt(
        managerQuestions
      );
      const employee = new Manager(name, id, email, officeNumber);
      employeeArray.push(employee);
    } else if (role === "Engineer") {
      const { name, id, email, github } = await inquirer.prompt(
        engineerQuestions
      );
      const employee = new Engineer(name, id, email, github);
      employeeArray.push(employee);
    } else if (role === "Intern") {
      const { name, id, email, school } = await inquirer.prompt(
        internQuestions
      );
      const employee = new Intern(name, id, email, school);
      employeeArray.push(employee);
    }

    const { quit } = await inquirer.prompt(continueQuestion);

    if (!quit) {
      inProgress = false;
    }
  }
  writeToFile("../src/index.Html", generateTeam(employeeArray));
};

const generateCards = (team) => {
  let cards = [];
  for (let i = 0; i < team.length; i++) {
    const employeeArray = team[i];
    switch (employeeArray.getRole()) {
      case "Manager":
        const manager = new Manager(
          employeeArray.id,
          employeeArray.name,
          employeeArray.email,
          employeeArray.officeNumber
        );
        cards.push(generateManagerCard(manager));
        break;
      case "Engineer":
        const engineer = new Engineer(
          employeeArray.id,
          employeeArray.name,
          employeeArray.email,
          employeeArray.github
        );
        cards.push(generateEngineerCard(engineer));
        break;
      case "Intern":
        const intern = new Intern(
          employeeArray.id,
          employeeArray.name,
          employeeArray.email,
          employeeArray.school
        );
        cards.push(generateInternCard(intern));
        break;
    }
  }
  return cards.join(``);
};

let generateManagerCard = (Manager) => {
  return `
  <div class="card employee-card mr-1 mt-3">
  <div class="card-header">
    <h3 class="card-title"> ${Manager.getId()} </h3>
    <h4 class="card-title">Manager</h4>
  </div>
  <div class="card-body">
    <ul class="list-group">
      <li class="list-group-item">
        <span class="material-icons"></span>ID: ${Manager.getName()}
      </li>
      <li class="list-group-item text-dark">
        <span class="material-icons"></span> Email:
        <a href="mailto:{{ email }}"> ${Manager.getEmail()} </a>
      </li>
      <li class="list-group-item">
        <span class="material-icons"></span> Office Number:
        ${Manager.getOfficeNumber()}
      </li>
    </ul>
  </div>
</div>`;
};

let generateEngineerCard = (Engineer) => {
  return `
  <div class="card employee-card mr-1 mt-3">
  <div class="card-header">
    <h2 class="card-title"> ${Engineer.getId()} </h2>
    <h4 class="card-title">Engineer</h4>
  </div>
  <div class="card-body">
    <ul class="list-group">
      <li class="list-group-item">
        <span class="material-icons">ID: ${Engineer.getName()} </span> 
      </li>
      <li class="list-group-item text-dark">
        <span class="material-icons"></span> Email:
        <a href="mailto:{{ email }}"> ${Engineer.getEmail()} </a>
      </li>
      <li class="list-group-item text-dark">
        <span class="material-icons"></span> GitHub:
        <a href="https://github.com/{{ github }}" target="_blank"
          > ${Engineer.getGithub()} </a
        >
      </li>
    </ul>
  </div>
</div>`;
};

let generateInternCard = (Intern) => {
  return `
  <div class="card employee-card mr-1 mt-3">
  <div class="card-header">
    <h2 class="card-title"> ${Intern.getId()} </h2>
    <h4 class="card-title">Intern</h4>
  </div>
  <div class="card-body">
    <ul class="list-group">
      <li class="list-group-item">
        <span class="material-icons">ID: ${Intern.getName()} </span> 
      </li>
      <li class="list-group-item text-dark">
        <span class="material-icons"></span> Email:
        <a href="mailto:{{ email }}"> ${Intern.getEmail()} </a>
      </li>
      <li class="list-group-item">
        <span class="material-icons"></span> School: ${Intern.getSchool()}
      </li>
    </ul>
  </div>
</div>`;
};

const generateTeam = (employeeArray) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,700;0,900;1,100;1,200;1,600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="./styles.css" />
    <title>My Team</title>
  </head>
  <body>
    <header class="header">
      <div class="container-fluid">
        <div class="row">
            <h1 class="text-center">
              <i class=></i> Team builder
            </h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="row">
        <div
          class="team-area col-12 d-flex flex-wrap justify-content-between p-3"
        > ${generateCards(employeeArray)}</div>
      </div>
    </div>
  </body>
</html>
`;
};

const writeToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.log(error.message);
  }
};

start();