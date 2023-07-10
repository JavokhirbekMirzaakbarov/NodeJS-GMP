const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = () => {
  readline.question(`Enter a string or done to stop:\n`, (input) => {
    if (input.toLowerCase() === "done") {
      readline.close();
      return;
    }
    console.log(`${input.split("").reverse().join("")}`);
    promptUser();
  });
};

promptUser();
