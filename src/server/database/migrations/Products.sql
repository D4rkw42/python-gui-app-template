CREATE TABLE IF NOT EXISTS Products (
    id varchar(100) NOT NULL,
    is_activated boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id)
);
