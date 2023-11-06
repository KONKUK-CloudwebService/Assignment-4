-- migrate:up
CREATE TABLE shelters -- 보호소 위치 저장
(
    id            BIGINT NOT NULL AUTO_INCREMENT,
    phone_number  BIGINT NOT NULL,            -- 01011111111
    address       VARCHAR(500) NOT NULL,      -- 위치 정보
    hospital_name VARCHAR(500) NOT NULL,      -- 병원 이름
    is_available  BOOLEAN NOT NULL DEFAULT 1, -- 정상운영 : 1(true), 폐업 or 말소 : 0(false)
    latitude      DECIMAL(10, 8) NOT NULL,    -- 사용자 위치_위도 저장
    longitude     DECIMAL(11, 8) NOT NULL,    -- 사용자 위치_경도 저장
    likes         BIGINT NOT NULL,            -- 좋아요 수
    created_at    DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    updated_at    DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE shelters;

