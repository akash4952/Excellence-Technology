const express=require('express');
const router=express.Router();
const controller=require('../controller/post.controller');


router.get('/candidate',controller.candidate);
router.post('/candidate',controller.createCandidate);

router.post("/testscore",controller.testScore);

router.get("/allStudents",controller.allStudent);

module.exports=router;