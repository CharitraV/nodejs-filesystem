const express = require("express");
const app = express();
const fs = require("fs");
const port = 2525;
const path = require("path");
const outputFolder = "./output";

//post method
app.post("/createFiles", (req, res) => {
  const fs = require("fs");

  const currentTime = new Date();
  const year = currentTime.getFullYear().toString();
  const month = (currentTime.getMonth() + 1).toString();
  const date = currentTime.getDate().toString();
  const hrs = currentTime.getHours().toString();
  const mins = currentTime.getMinutes().toString();
  const secs = currentTime.getSeconds().toString();

  const dateTimeForFileName = `${year}-${month}-${date}-${hrs}_${mins}_${secs}.txt`;

  const filePath = path.join(outputFolder, dateTimeForFileName);

  console.log(dateTimeForFileName);
  console.log(filePath);

  //creating the file
  fs.writeFile(filePath, currentTime.toISOString(), (err) => {
    if (err) {
      console.error("Failed to create the file");
    } else {
      console.log("file is created successfully");
    }
  });

  res.send(`File created successfully at:${filePath}`);
});

// Get method
app.get("/readFiles", (req, res) => {
  //reading the file directory
  fs.readdir(outputFolder, (err, data) => {
    if (err) {
      res.status(500).send(`Error reading the file ${err}`);
    } else {
      console.log("File data:", data);
      //sending the list of files to json response
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`server is running on port${port} `);
});
