const mongoose = require('mongoose');
const Candidates = require('../models/candidate');
const TestScore = require('../models/test_score');


module.exports.candidate = async (req, res) => {
    const post = await Candidates.find()
    res.send(post);
}

module.exports.createCandidate = async (req, res) => {
    try {
        const post = await Candidates.create({
            name: req.body.name,
            email: req.body.email
        })
        res.json({ post });
    } catch (error) {
        if (error.message.indexOf("11000") != -1) {
            res.json({
                message: "email id already exist"
            })
        }

    }
}

module.exports.testScore = async (req, res) => {
    try {
        var email = req.body.email;
        var name = req.body.name;
        var first_round = req.body.first_round;
        var second_round = req.body.second_round;
        var third_round = req.body.third_round;
        var total = first_round + second_round + third_round;
        var query = { "email": email, "name": name };
        Candidates.find(query, async (error, results) => {
            if (error) {
                return res.status(400).json({
                    message: error.message || "something went wromg try again"

                })

            } else {
                if (results.length > 0) {

                    try {
                        const post = await TestScore.create({
                            name: name,
                            email: email,
                            first_round: first_round,
                            second_round: second_round,
                            third_round: third_round,
                            totalMarks: total
                        })

                        res.status(200).json({
                            post
                        })
                    } catch (error) {
                        return res.status(400).json({
                            message: error.message || "something went wromg try again"

                        })
                    }


                } else {
                    res.json({
                        message: "either email id or user name is not availaible plz check again"
                    });
                }
            }
        })

    } catch (error) {
        console.log("akash login");
        return res.status(400).json({
            message: error.message || "something went wromg try again"

        })
    }

}

module.exports.allStudent = async (req, res) => {

    const testScore = await TestScore.aggregate([
        { '$sort': { 'totalMarks': -1 } }, { $limit: 1 }])

    if (testScore.length > 0) {
        var email = testScore[0].email;
        var name = testScore[0].name;
        var totalMarks = testScore[0].totalMarks;
    }

    const averageScore = await TestScore.aggregate([
        {
            $group: {
                _id: null,
                first_round_average: { $avg: "$first_round" },
                second_round_average: { $avg: "$second_round" },
                third_round_average: { $avg: "$third_round" }

            }
        }
    ])
    if (averageScore.length > 0) {
        var average_FR = averageScore[0].first_round_average;
        var average_SR = averageScore[0].second_round_average;
        var average_TR = averageScore[0].third_round_average;
    }
    res.json({
        name,
        email,
        message: `${name} have the highest mark ${totalMarks}`,
        averageOfAllCandidates: [{
            firstRound_average: average_FR,
            secondRound_average: average_SR,
            thirdRound_average: average_TR
        }]

    })
}
