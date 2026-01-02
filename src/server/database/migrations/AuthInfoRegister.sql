CREATE TABLE IF NOT EXISTS AuthInfoRegister (
    onwerId varchar(100) NOT NULL,
    uniqueAppId varchar(255),
    authkey varchar(255),
    activated boolean
)
