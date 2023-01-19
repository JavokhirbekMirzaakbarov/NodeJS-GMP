import readline from "readline";

readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = async () => {
  const input = await readline.question(`Enter a string or done to stop:\n`);

  if (input.toLowerCase() === "done") readline.close();

  console.log(`${input.split("").reverse().join("")}`);
  promptUser();
};

promptUser();
