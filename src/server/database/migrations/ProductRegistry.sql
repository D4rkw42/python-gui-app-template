CREATE TABLE IF NOT EXISTS ProductRegistry (
    product_id varchar(100) NOT NULL,
    MAC_address varchar(255),
    CPU_uuid varchar(255),
    PRIMARY KEY (product_id)
);
