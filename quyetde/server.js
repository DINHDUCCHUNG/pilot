const express = require('express');

const path = require('path');

const bodyParser  = require('body-parser');

const fs = require('fs');
const server = express();
server.use(express.static('public'));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());


//route
server.get('/',(req, res)=>{
    res.status(200).sendFile(path.resolve(__dirname+'/public/home.html'));
});

server.get('/create-question',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname+'/public/create-question.html'));
})
// const newQuestion = {
//     id: "",
//     content: "",
//     yes: 0,
//     no: 0,
//     createdAt: "",
// };
// id, content, yes, no, createdAt

server.post('/create-question',(req,res)=>{
    console.log(req.body);
    fs.readFile('./data.json',(error, data)=>{
        if(error){
            res.status(500).send('Internal server error');
        }

        const questions = JSON.parse(data);
        console.log(typeof questions);
        questions.push({
            id: questions.length,
            content: req.body.content,
            yes: 0,
            no: 0,
            createdAt: new Date().toLocaleString(),
        });

        fs.writeFile('./data.json', JSON.stringify(questions),(error)=>{
            if(error){
                res.status(500).send('Internal server error');
            }
            res.status(201).end('Success');
        });
    });
});
server.get('/vote/:questionId/:vote',async(req, res)=>{
    const {questionId, vote} = req.params;

    console.log(questionId,vote);

    fs.readFile('./data.json',(error, data)=>{
        if(error){
            res.status(500).send('Internal server error');
        }
        const questions = JSON.parse(data);
        let updateQuestion;
        for(let item of questions){
            if(item.id === Number(questionId)){
                vote ==='yes' ? item.yes +=1: item.no+=1;
                break;
            }
        }

        fs.writeFile('./data.json',JSON.stringify(questions), (err)=>{
            if(err){
                res.status(500).send('Internal server error');
            }
            res.status(200).send('Update question success');
        });
    });
});

server.get('/result/:questionId',(req, res)=>{
    res.status(200).sendFile(path.resolve(__dirname+'/public/vote-result.html'));
});

server.get('/get-question-by-id',(req, res)=>{
    console.log(req.query);
    const questionId = req.query.questionId;

    fs.readFile('./data.json',(error, data)=>{
        if(error){
            res.status(500).send('Internal server error');
        }
        const questions = JSON.parse(data);
        let selectQuestion;
        for(let item of questions){
            if(item.id ===Number(questionId)){
                selectQuestion = item;
                break;
            }
        }
        if(selectQuestion){
            res.status(200).json(selectQuestion);
        }else{
            res.status(200).json({message:'Question not found'});
        }
    });
});

server.listen(3000,(error)=>{
    if(error){
        throw error;
    }
    console.log('Server listen on port 3000');
});
