const ParkDao = require("../dao/index")

class ParkService{

    parkDao
    constructor() {
        this.parkDao = new ParkDao();
    }

    // 공원 장소 저장 , 여기서 validate로 null값 허용하지 않는 데이터 있는지 확인
    async savePark(data){
        try{
            if(data.id == null || data.latitude == null || data.longitude == null){
                throw("저장할 데이터가 부족합니다.");
            }
            const result = await this.parkDao.save(data);
            return result;
        }catch(err){
            throw err;
        }
    }

    // 모든 공원 정보 조회
    async findAllPark(){
        try{
            const result = await this.parkDao.findAll();
            return result;
        }catch(err){
            throw err;
        }
    }
    // 공원 장소 수정
    async updatePark(data){
        try{
            if(data.id == null || data.latitude == null || data.longitude == null){
                throw("잘못된 업데이트 값입니다.");
            }
            const result = await this.parkDao.update(data);
            return result;
        }catch(err){
            throw err;
        }
    }

    // 공원 위치를 기반으로 조회
    async findParkById(park_id){
        try{
            const result = await this.parkDao.findById(park_id);
            return result;
        }catch(err){
            throw err;
        }
    }
    

    // 공원 이름으로 검색
    async findParkByName(park_name){
        try{
            const [result] = await this.parkDao.findByName(park_name);
            return result;
        }catch(err){
            throw err;
        }
    }


    // 공원 데이터 삭제(db + s3), img_url과 parks_id가 필요하고 validate로 현재 그 데이터 있는지 찾아야함.
    async deletePark(){
        try{
            const result = await this.parkDao.deleteParkData();
            return result;
            //this.parkDao.deletePicture();
        }catch(err){
            throw err;
        }
    }

    // 공원 데이터 위도, 경도로 검색
    async findParkByPos(latitude,longitude){
        try{
            const [result] = await this.parkDao.findByPos(latitude,longitude);
            return result;
        }catch(err){
            throw(result);
        }
    }

    
}

module.exports = ParkService;