# Definições do provider e http response para a API de autenticação

from typing import TypedDict, Any

from client.core.auth import Payload

# Informações para ativação do app
class ActivateAppProps(TypedDict):
    activate: dict[str, str]
    buildID: str
    installID: str
    fingerprint: str

# Resposta do servidor à ativação do app
class ActivateAppResponse(TypedDict):
    message: str
    payload: Payload
    token: str

# Informações para refresh de payload
class RefreshPayloadProps(TypedDict):
    payload: Payload
    installID: str
    fingerprint: str

# Resposta do servidor ao refresh do payload
class RefreshPayloadResponse(TypedDict):
    message: str
    payload: Payload
    token: str

# Resposta de erro de requisição do servidor
class RequestParsingError(TypedDict):
    message: str
    description: dict[str, Any]

# Resposta de erro de response do servidor
class ResponseError(TypedDict):
    message: str

# Provider para a API de autenticação
class AuthAPIProvider:
    # Requisição de ativação do App
    @staticmethod
    def ActivateApp(props: ActivateAppProps) -> ActivateAppResponse:
        raise

    # Requisição de refresh do App
    @staticmethod
    def RefreshPayload(props: RefreshPayloadProps) -> RefreshPayloadResponse:
        raise
