CREATE TABLE IF NOT EXISTS AuthInfo (
    product_id varchar(255) NOT NULL,
    auth_key varchar(255),
    expires_at varchar(100),
    PRIMARY KEY (product_id)
);
