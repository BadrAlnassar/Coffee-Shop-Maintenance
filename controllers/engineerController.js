const { Shop } = require("../entities/Engineer")
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createShop: async(req, res) => {
        let body = req.body;
        let shop = new Shop(body.name, body.location, body.ownerName,
                            body.ownerPhoneNumber, body.email, body.hash);
        try {
            shop = await Shop.createShop(shop);
            return res.json({
                success: 1,
                data: shop
            });
        } catch (e) {
            return res.status(500).json({
                success: 0,
                message: e
            });
        }
    },
    retrieveShops: async(req, res) => {
        try {
            let shop = await Shop.find();
            return res.json({
                success: 1,
                data: shop
            });
        } catch (e) {
            return res.status(500).json({
                success: 0,
                message: e
            });
        }
    },
    retrieveShopsById: async(req, res) => {
        let body = req.body;
        try {
            let shop = await Shop.findOne({
                where: { id: body.id }
            });
            return res.json({
                success: 1,
                data: shop
            });
        } catch (e) {
            return res.status(500).json({
                success: 0,
                message: e
            });
        }
    },
    retrieveShopsByEmail: async(req, res) => {
        let body = req.body;
        try {
            let shop = await Shop.findOne({
                where: { email: body.email }
            });
            return res.json({
                success: 1,
                data: shop
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
        let shop = await Shop.findOne({
            where: { email: body.email }
        });
            const result = compareSync(body.hash, shop.hash);
            if (result){
              const jsonToken = sign({ result: shop }, "qwe123", {
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