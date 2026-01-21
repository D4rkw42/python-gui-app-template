CREATE TABLE IF NOT EXISTS Products (
    build_id varchar(100),
    owner_id varchar(100) NOT NULL,
    project_name varchar(100) NOT NULL,
    install_id varchar(100) DEFAULT "none",
    fingerprint varchar(255) DEFAULT "none",
    is_activated boolean DEFAULT false,
    PRIMARY KEY (build_id)
);
