const dataSource = require("../../appDataSource");
const CustomException = require("../../../utils/handler/customException");
const { DATABASE_ERROR } = require("../../../utils/baseResponseStatus");

class ParkDao{
    // 공원 장소 저장
    async save(data){
        try{
            const result = await dataSource.query(
                `
                INSERT INTO parks(
                name,
                parks_image, 
                latitude,
                longitude
                ) VALUES (?, ?, ?, ?)
                `,
                [data.name, data.parks_image, data.latitude,data.longitude]
            
            );
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
    }
    // 공원 장소 수정
    async update(data){
        try{
            const result = await dataSource.query(
                `
                UPDATE parks p
                SET p.name = ?,p.latitude = ? , p.longitude = ?, p.parks_image = ?
                WHERE p.id = ?
                `,
                [data.name,data.latitude,data.longitude,data.parks_image,data.id]
            );
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }

    }
    // 공원 위치를 기반으로 조회
    async findByPos(latitude,longitude){
        try{
            const result = await dataSource.query(
                `
                SELECT
                    name,
                    latitude,
                    longitude
                FROM
                    parks p
                WHERE
                    p.latitude = ? AND p.longitude = ?
                `, [latitude,longitude]
            )
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
    }

    // 공원 이름으로 검색, 없으면 빈 값으로 나옴
    async findByName(name){
        try{
            const result = await dataSource.query(
                `
                SELECT
                    name,
                    latitude,
                    longitude
                FROM
                    parks 
                WHERE
                    name = ?
                `, [name]
            )
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
    }

    // 공원 데이터 삭제
    async deleteParkData(park_id){
        try{
            const result = await dataSource.query(
                `
                DELETE p
                FROM parks p
                WHERE p.id = ?
                `,
                [parks_id]
            );
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
    }

    // 모든 공원 정보 조회
    async findAll(){
        try{
            const result = await dataSource.query(
                `
                SELECT
                    name,
                    latitude,
                    longitude
                FROM
                    parks p
                `
            );
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
    }

    // 아이디 기반으로 검색
    async findById(park_id){
        try{
            const result = await dataSource.query(
                `
                SELECT
                    name,
                    latitude,
                    longitude
                FROM
                    parks 
                WHERE
                    id = ?
                `, [park_id]
            )
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
    }

    // 사진 삭제
    async deletePicture(img_url){
        try{
            await deleteImageFromS3(s3Image[0].img_url);
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
    }

}

module.exports = ParkDao;