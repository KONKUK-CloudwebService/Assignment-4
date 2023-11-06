-- migrate:up
CREATE TABLE parks 
(
  id INT NOT NULL AUTO_INCREMENT,                        
  name VARCHAR(50) NOT NULL,                             
  parks_image VARCHAR(1000) NULL,    
  latitude DECIMAL(10, 8) NOT NULL,  -- 휴식처 위치_위도 저장
  longitude DECIMAL(11, 8) NOT NULL, -- 휴식처 위치_경도 저장
  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)                                       
);

-- migrate:down
DROP TABLE parks;

