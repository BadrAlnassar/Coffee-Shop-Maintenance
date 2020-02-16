const { Engineer } = require("../entities/Engineer")
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createEngineer: async(req, res) => {
        let body = req.body;
        let engineer = new Engineer(body.name, body.phoneNumber, body.email, body.hash);
        try {
            engineer = await Engineer.createEngineer(engineer);
            return res.json({
                success: 1,
                data: engineer
            });
        } catch (e) {
            return res.status(500).json({
                success: 0,
                message: e
            });
        }
    },
    retrieveEngineer: async(req, res) => {
        try {
            let engineer = await Engineer.find();
            return res.json({
                success: 1,
                data: engineer
            });
        } catch (e) {
            return res.status(500).json({
                success: 0,
                message: e
            });
        }
    },
    retrieveEngineerById: async(req, res) => {
        let body = req.body;
        try {
            let engineer = await Engineer.findOne({
                where: { id: body.id }
            });
            return res.json({
                success: 1,
                data: engineer
            });
        } catch (e) {
            return res.status(500).json({
                success: 0,
                message: e
            });
        }
    },
    retrieveEngineerByEmail: async(req, res) => {
        let body = req.body;
        try {
            let engineer = await Engineer.findOne({
                where: { email: body.email }
            });
            return res.json({
                success: 1,
                data: engineer
            });
        } catch (e) {
            return res.status(500).json({
                success: 0,
                message: e
            });
        }
    },
    login: async (req, res) => {
        let body = req.body;
        let engineer = await Engineer.findOne({
            where: { email: body.email }
        });
            const result = compareSync(body.hash, engineer.hash);
            if (result){
              const jsonToken = sign({ result: engineer }, "qwe123", {
                  expiresIn: "2h"
              });
              return res.json({
                  success: 1,
                  message: "login successfully",
                  token: jsonToken
              });
            } else {
                return res.json({
                  success: 0,
                  data: "invalid email or password"
                });
            }
        
    } // sign out just delete the token from the front-end. 
}