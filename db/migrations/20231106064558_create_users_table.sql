-- migrate:up
CREATE TABLE users 
(
  id BIGINT NOT NULL AUTO_INCREMENT,                        
  name VARCHAR(50) NOT NULL,                             
  email VARCHAR(200) NOT NULL,
  profile_image VARCHAR(1000) NULL,    
  password VARCHAR(200) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,  -- 사용자 위치_위도 저장
  longitude DECIMAL(11, 8) NOT NULL, -- 사용자 위치_경도 저장
  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)                                       
);

-- migrate:down
DROP TABLE users;

