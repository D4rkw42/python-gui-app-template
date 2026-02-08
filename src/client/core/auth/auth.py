# Módulo de autenticação

from client.core.auth import REQUIRE_LICENSE

# Gerencia os processos de autenticação
class Auth:
    # Verifica se a licença está ativa
    @staticmethod
    def IsLicenseActive():
        pass

    # Verifica se o software é licenciável
    @staticmethod
    def SoftwareHasLicense():
        return REQUIRE_LICENSE
