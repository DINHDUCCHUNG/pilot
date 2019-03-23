const express = require("express");

const path = require("path");

const bodyParser = require("body-parser");

const fs = require("fs");

const mongoose = require("mongoose");

const questionModel = require('./model');

mongoose.connect("mongodb://localhost:27017/quyetde", error => {
  if (error) {
    throw error;
  }
  console.log("Connect to Mongodb success!");

  const server = express();
  server.use(express.static("public"));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  //route
  server.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + "/public/index.html"));
  });

  server.get("/random-question", async (req, res) => {
    try{
      const randomQuestion = await questionModel.aggregate([
      {$sample: {size: 1}}
    ]);
    console.log(randomQuestion);
    res.status(200).json(randomQuestion[0]);
    } catch(error){
      res.status(500).end(error.message);
    }

    // const questions =  await questionModel.find();
    // let randomIndex = Math.floor(Math.random() * questions.length);
    // questionModel.findOne({id: randomIndex},(err, data)=>{
    //  if (err) {
    //    throw err;
    //  }
    //  res.status(200).json(data);
    // }); 

    // fs.readFile("./data.json", (err, data) => {
    //   if (err) {
    //     res.status(500).send("Internal server error");
    //   }
    //   const questions = JSON.parse(data);
    //   const randomIndex = Math.floor(Math.random() * questions.length);
    //   const randomQuestion = questions[randomIndex];

    //   res.status(200).json(randomQuestion);
    // });
  });

  server.get("/get-question-by-id", async (req, res) => {
    const questionId = req.query.questionId;
    const question = await questionModel.findById(questionId).exec();
    console.log(question.id);
    res.status(200).json(question);
    


  //   console.log(req.query);
  //   const questionId = req.query.questionId;

  //   fs.readFile("./data.json", (error, data) => {
  //     if (error) {
  //       res.status(500).send("Internal server error");
  //     }
  //     const questions = JSON.parse(data);
  //     let selectQuestion;
  //     for (let item of questions) {
  //       if (item.id === Number(questionId)) {
  //         selectQuestion = item;
  //         break;
  //       }
  //     }
  //     if (selectQuestion) {
  //       res.status(200).json(selectQuestion);
  //     } else {
  //       res.status(200).json({ message: "Question not found" });
  //     }
  //   });
});

  server.get("/create-question", (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname + "/public/create-question.html"));
  });
  // const newQuestion = {
  //     id: "",
  //     content: "",
  //     yes: 0,
  //     no: 0,
  //     createdAt: "",
  // };
  // id, content, yes, no, createdAt

  server.post("/create-question", async (req, res) => {
    const newQuestion = {
        content: req.body.content,
    };

    const result = await questionModel.create(newQuestion);
    console.log(result);
    res.status(201).json({
        id: result._id,
    });

    // console.log(req.body);
    // fs.readFile("./data.json", (error, data) => {
    //   if (error) {
    //     res.status(500).send("Internal server error");
    //   }

    //   const questions = JSON.parse(data);
    //   console.log(typeof questions);
    //   questions.push({
    //     id: questions.length,
    //     content: req.body.content,
    //     yes: 0,
    //     no: 0,
    //     createdAt: new Date().toLocaleString()
    //   });

    //   fs.writeFile("./data.json", JSON.stringify(questions), error => {
    //     if (error) {
    //       res.status(500).send("Internal server error");
    //     }
    //   });
    //   res.status(201).json({
    //     id: questions.length - 1
    //   });
    // });
  });


  server.post("/vote/:questionId/:vote", async (req, res) => {
      
    const { questionId, vote } = req.params;

    const existedQuestion = await questionModel.findById(questionId).exec();
    if(!existedQuestion){
      res.status(404).end('Question not found');
    }
    else{
      await questionModel.findByIdAndUpdate(questionId,{$inc: {[vote]: 1}}).exec();
      res.status(200).end('Update Question');
    }

    // console.log(questionId, vote);

    // fs.readFile("./data.json", (error, data) => {
    //   if (error) {
    //     res.status(500).send("Internal server error");
    //   }
    //   const questions = JSON.parse(data);
    //   let updateQuestion;
    //   for (let item of questions) {
    //     if (item.id === Number(questionId)) {
    //       vote === "yes" ? (item.yes += 1) : (item.no += 1);
    //       break;
    //     }
    //   }

    //   fs.writeFile("./data.json", JSON.stringify(questions), err => {
    //     if (err) {
    //       res.status(500).send("Internal server error");
    //     }
    //     res.status(200).send("Update question success");
    //   });
    // });
  });

  server.get("/result/:questionId", (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname + "/public/vote-result.html"));
  });

  server.listen(3000, error => {
    if (error) {
      throw error;
    }
    console.log("Server listen on port 3000.....");
  });
});
