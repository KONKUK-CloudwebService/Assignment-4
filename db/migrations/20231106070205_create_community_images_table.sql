-- migrate:up
CREATE TABLE community_images -- 커뮤니티 이미지들 
(
    id                  BIGINT NOT NULL AUTO_INCREMENT,
    community_id        BIGINT NOT NULL,
    user_id             BIGINT NOT NULL,
    community_image_url VARCHAR(2000) NULL,
    PRIMARY KEY (id),
    foreign key (community_id) references communities(id),
    foreign key (user_id) references users (id)
);

-- migrate:down
DROP TABLE community_images;


