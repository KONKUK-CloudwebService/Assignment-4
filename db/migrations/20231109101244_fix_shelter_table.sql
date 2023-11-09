-- migrate:up
ALTER TABLE shelters -- shelter 두 컬럼 삭제
DROP COLUMN hospital_name,
DROP COLUMN is_available;

-- migrate:down
DROP TABLE shelters;

