const Router = require("express");
const ParkService = require("../service/index");
const CreateParkDTO = require("../dto/createParkDTO");
class ParkController{
    parkService
    router;
    path = "/park"

    constructor() {
        this.router = Router();
        this.parkService = new ParkService();
        this.init();
    }
    init() {
        this.router.get("", this.provideDataToAllParks.bind(this)); // 모든 공원 정보 제공
        this.router.post("",this.createNewPark.bind(this));
        this.router.put("/:id",this.updateParkData.bind(this));
        this.router.delete("/:id",this.deleteParkData.bind(this));
        this.router.get("/by-position",this.provideParkDataByPosition.bind(this)); // query string 사용 예) 위동 =10 & 경도 =20
        this.router.get("/:name",this.provideParkDataByName.bind(this));
    }

    // 모든 데이터 조회
    async provideDataToAllParks(req,res,next){
        try{
            const result = await this.parkService.findAllPark();
            res.send(result);
        }catch(err){
            next(err);
        }
    }

    // 데이터 추가
    async createNewPark(req,res,next){
        try{
            const createParkDTO = new CreateParkDTO(req.body);
            const result = await this.parkService.savePark(createParkDTO);
            res.status(200).json(result);
        }catch(err){
            next(err);
        }
    }

    // name을 받아서 데이터 조회
    async provideParkDataByName(req,res,next){
        try{
            const {name} = req.params;
            const result = await this.parkService.findParkByName(name);
            res.send(result);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    // 위치를 받아서 데이터 조히
    async provideParkDataByPosition(req,res,next){
        try{
            const latitude = req.query.latitude;
            const longitude = req.query.longitude;
            const result = await this.parkService.findParkByPos(latitude,longitude);
            res.send(result);
        }catch(err){
            next(err);
        }
    }

    // 데이터 삭제
    async deleteParkData(req,res,next){
        try{
            const {id} = req.params;
            const result = await this.parkService.deletePark(id);
            res.send(result);
        }catch(err){
            next(err);
        }
    }


    // 데이터 수정
    async updateParkData(req,res,next){
        try{
            const {id} = req.params;
            const tmp = {id : id};
            const data = Object.assign({},tmp,req.body);
            const result = await this.parkService.updatePark(data);
            res.send(result);
        }catch(err){
            next(err);
        }
    }
}
const parkController = new ParkController();
module.exports = parkController;