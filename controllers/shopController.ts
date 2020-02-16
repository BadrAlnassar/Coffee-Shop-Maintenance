import { getManager } from "typeorm";
import { EngineerRating } from "../entities/EngineerRating";
import { Engineer } from "../entities/Engineer";
const { Shop } = require("../entities/Shop")
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
        
    },
    changeLocation: async(req, res) => {
        try {
            let shop = await Shop.getShop(req.body.id);
            shop.location = req.body.location;
            let manager = getManager().getRepository(Shop);                
            await manager.update(req.body.id, shop);
            return res.json({
                success: 1,
                data: shop
            });;
        } catch (e) {
            return res.status(500).json({
                success: 0,
                message: e
            });
        }
    },
    rateEngineer: async(req , res) => {
        let body = req.body;
        let rating = new EngineerRating();
        rating.rating = body.rating;
        let shop = new Shop(undefined, undefined, undefined, undefined, undefined, undefined);
        shop.id = body.shopId;
        rating.shop = shop;
        let engineer = new Engineer(undefined, undefined, undefined, undefined);
        engineer.id = body.engineerId;
        rating.engineer = engineer;
            try {
                rating = await EngineerRating.save(rating);
                engineer = await Engineer.createQueryBuilder("engineer")
                    .leftJoinAndSelect("engineer.ratings", "rating")
                    .where({
                        id: body.engineerId
                    }).getOne();
                let sum = 0;
                
                engineer.ratings.forEach(el => {
                    sum += el.rating;
                })
                
                if (engineer.ratings.length != 0) {                    
                    engineer.rating = sum / engineer.ratings.length;
                    delete engineer.ratings;
                    let manager = getManager().getRepository(Engineer);              
                    await manager.update(body.engineerId, engineer);
                }
                return res.json({
                    success: 1,
                    data: rating
                });
            } catch (e) {
                return res.status(500).json({
                    success: 0,
                    message: e
                });
            }
    }
    // sign out just delete the token from the front-end. 
}