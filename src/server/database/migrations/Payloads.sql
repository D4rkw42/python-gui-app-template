CREATE TABLE IF NOT EXISTS Payloads (
    product_install_id varchar(255),
    token varchar(255) NOT NULL,
    expires_at varchar(255) NOT NULL,
    PRIMARY KEY (product_install_id)
);
