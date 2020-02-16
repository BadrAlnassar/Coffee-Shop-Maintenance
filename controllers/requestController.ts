import { getManager } from "typeorm";
const { Request } = require("../entities/Request");
const { Engineer } = require("../entities/Engineer");
const { Shop } = require("../entities/Shop");

module.exports = {
        createRequest: async(req, res) => {
            let body = req.body;
            let request = new Request(body.problemType, body.comment, body.shopId, body.engineerId);
            try {
                request = await Request.save(request);
                return res.json({
                    success: 1,
                    data: request
                });
            } catch (e) {
                return res.status(500).json({
                    success: 0,
                    message: e
                });
            }
        },
        retrieveRequest: async(req, res) => {
            try {
                let request = await Request.createQueryBuilder("request")
                    .leftJoinAndSelect("request.shop", "shop")
                    .leftJoinAndSelect("request.engineer", "engineer")
                    .getMany();
                return res.json({
                    success: 1,
                    data: request
                });
            } catch (e) {
                return res.status(500).json({
                    success: 0,
                    message: e
                });
            }
        },
        retrieveRequestById: async(req, res) => {
            let body = req.body;
            try {
                let request = await Request.findOne({
                    where: { id: body.id }
                });
                return res.json({
                    success: 1,
                    data: request
                });
            } catch (e) {
                return res.status(500).json({
                    success: 0,
                    message: e
                });
            }
        },
        retrieveRequestByEngineerId: async(req, res) => {
            try {
                let engineer = await Engineer.createQueryBuilder("engineer")
                    .leftJoinAndSelect("engineer.requests", "request")
                    .where({
                        id: req.body.engineerId
                    }).getOne();                
                return res.json({
                    success: 1,
                    data: engineer.requests
                });
            } catch (e) {
                return res.status(500).json({
                    success: 0,
                    message: e
                });
            }
        },
        retrieveRequestByShopId: async(req, res) => {
            try {
                let shop = await Shop.createQueryBuilder("shop")
                    .leftJoinAndSelect("shop.requests", "request")
                    .where({
                        id: req.body.shopId
                    }).getOne();                
                return res.json({
                    success: 1,
                    data: shop.requests
                });
            } catch (e) {
                return res.status(500).json({
                    success: 0,
                    message: e
                });
            }
        },
        changeRequestStatus: async(req, res) => {
            try {
                let request = await Request.getRequest(req.body.id);
                request.status = req.body.status;
                let manager = getManager().getRepository(Request);                
                await manager.update(req.body.id, request);
                return res.json({
                    success: 1,
                    data: request
                });;
            } catch (e) {
                return res.status(500).json({
                    success: 0,
                    message: e
                });
            }
        }
}