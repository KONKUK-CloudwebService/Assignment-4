const parkController = require("../controller");

class CreateParkDTO{
    name;
    parks_image;
    latitude;
    longitude;
    constructor(park){
        this.name = park.name;
        this.parks_image = park.parks_image;
        this.latitude = park.latitude;
        this.longitude = park.longitude;
    }
}

module.exports = CreateParkDTO;