// Part A: Run with: node task.js "Complete JavaScript assignment"
const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.log('Usage: node task.js "Your task title"');
  process.exitCode = 1;
} else {
  console.log(`New task: ${title}`);
}
