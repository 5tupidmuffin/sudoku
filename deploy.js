const ghPages = require("gh-pages");

ghPages.publish("public", (err) => {
  if (err) {
    throw err;
  }
});

console.log("deployed oh github pages");
