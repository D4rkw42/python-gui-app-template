# Módulo de manipulação de payload

from typing import TypedDict
from enum import Enum

# Status de análise do Payload
class PayloadStatus(Enum):
    VALID = 0 # Payload válido e ativo
    EXPIRED = 1 # Payload válido e expirado
    INVALID = 2 # Payload inválido (corrompido ou adulterado)

# Representação do payload
class Payload(TypedDict):
    installID: str
    mode: str
    launchedAt: str
    expiresAt: str
    algorithm: str
    encoding: str

# Gerenciamento de payloads
class PayloadManager:
    # Lê o payload na memória
    @staticmethod
    def OpenPayload() -> Payload:
        raise
    
    # Salva o payload na memória
    @staticmethod
    def SavePayload(payload: Payload):
        pass

    # Lê o payload token na memória
    @staticmethod
    def ReadPayloadToken() -> str:
        raise

    # Salva o payload token na memória
    @staticmethod
    def SavePayloadToken(token: str):
        pass

    # Verifica o status da licença
    @staticmethod
    def VerifyPayloadStatus() -> PayloadStatus:
        return PayloadStatus.INVALID
