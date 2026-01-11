CREATE TABLE IF NOT EXISTS Licenses (
    product_build_id varchar(100),
    product_key varchar(100) NOT NULL,
    public_secret_key VARCHAR(255) NOT NULL,
    private_secret_key VARCHAR(255) NOT NULL,
    salt varchar(255) NOT NULL,
    PRIMARY KEY (product_build_id)    
);
