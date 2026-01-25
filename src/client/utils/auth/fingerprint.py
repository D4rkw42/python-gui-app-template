# Funções de construção do fingerprint do aplicativo

import hashlib as hash
import unicodedata, base64

from wmi import WMI

# Classe de geração e validação de fingerprints
class Fingerprint:
    _wmi = WMI()
    
    def __init__(self):
        # Valores nulos ou inválidos por padrão
        self.computer_system = None
        self.base_board = None
        self.bios = None

        # Tentativa de obter os dados do computador/sistema
        try:
            self.computer_system = self._wmi.Win32_ComputerSystemProduct()
        except:
            pass
        
        # Tentativa de obter os dados da placa-mãe
        try:
            self.base_board = self._wmi.Win32_BaseBoard()
        except:
            pass

        # Tentativa de obter os dados do BIOS
        try:
            self.bios = self._wmi.Win32_Bios()
        except:
            pass
    
    # Obtém os dados do computador/sistema
    @property
    def computer_system_info(self) -> dict[str, str]:
        computer_system_info = { "system_uuid": "Invalid", "product_name": "Invalid" }

        if not self.computer_system:
            return computer_system_info
        
        if len(self.computer_system) == 0:
            return computer_system_info
        
        uuid = self.computer_system[0].UUID
        name = self.computer_system[0].Name

        computer_system_info["system_uuid"] = Fingerprint.FieldDataAssert(uuid, computer_system_info["system_uuid"])
        computer_system_info["product_name"] = Fingerprint.FieldDataAssert(name,  computer_system_info["product_name"])

        return computer_system_info

    # Obtém os dados da placa-mãe
    @property
    def base_board_info(self) -> dict[str, str]:
        base_board_info = { "serial_number": "Invalid" }

        if not self.base_board:
            return base_board_info
        
        if len(self.base_board) == 0:
            return base_board_info
        
        serial_number = self.base_board[0].SerialNumber

        base_board_info["serial_number"] = Fingerprint.FieldDataAssert(serial_number, base_board_info["serial_number"])

        return base_board_info

    # Obtém os dados do BIOS
    @property
    def bios_info(self) -> dict[str, str]:
        bios_info = { "vendor": "Invalid", "version": "Invalid", "release_date": "Invalid" }

        if not self.bios:
            return bios_info
        
        if len(self.bios) == 0:
            return bios_info

        vendor = self.bios[0].Manufacturer
        version = self.bios[0].SMBIOSBIOSVersion
        release_date = self.bios[0].ReleaseDate

        bios_info["vendor"] = Fingerprint.FieldDataAssert(vendor, bios_info["vendor"])
        bios_info["version"] = Fingerprint.FieldDataAssert(version, bios_info["version"])
        bios_info["release_date"] = Fingerprint.FieldDataAssert(release_date, bios_info["release_date"])

        return bios_info
    
    # Assers para validação de dados advindos do firmware
    @staticmethod
    def FieldDataAssert(data: str | None, default: str) -> str:
        return data if (data and data != "") else default
    
    # Cria um hash string de um fingerprint
    @staticmethod
    def MakeHashString(fingerprint: Fingerprint) -> str:
        computer_system_info = fingerprint.computer_system_info
        base_board_info = fingerprint.base_board_info
        bios_info = fingerprint.bios_info

        fingerprint_hash = ""

        # Variáveis auxiliares para criação do hash

        overall_info = [computer_system_info, base_board_info, bios_info] # aglutinação de todos os dados
        overall_length = sum(len(info) for info in overall_info) # length total considerando todos os dados

        index = 0 # contador para separador

        # Captura de todas as informações
        for info in overall_info:
            # Captura de cada trecho de informação
            for key in info:
                # Bloco de informação
                # Normalize destrói ambiguidades entre caracteres parecidos com codificação parecida no Unicode ou aglutinação de símbolos como único código
                fingerprint_str = unicodedata.normalize("NFKC", info[key])

                # Gera hash do bloco e converte para Base85
                hex_hash= hash.sha256(fingerprint_str.encode("utf-8")).digest()
                base85_hash = base64.b85encode(hex_hash).decode()

                fingerprint_hash += base85_hash

                # Adiciona separador
                if index != overall_length - 1:
                    fingerprint_hash += "."
                    index += 1

        return fingerprint_hash

    # Verifica e retorna em porcentagem a similaridade entre um fingerprint e um hash de fingerprint (0 - 1)
    @staticmethod
    def AnalyseFingerprintHash(fingerprint: Fingerprint, hash: str) -> float:
        test_hash = Fingerprint.MakeHashString(fingerprint)

        # Separação dos blocos de informação
        hash_blocks = hash.split(".")
        test_hash_blocks = test_hash.split(".")

        # Obtém a quantidade de informações existentes
        secure_size = len(hash_blocks) if len(hash_blocks) < len(test_hash_blocks) else len(test_hash_blocks) # Tamanho seguro para análise (captura o menor)
        eval_size = len(hash_blocks) if len(hash_blocks) > len(test_hash_blocks) else len(test_hash_blocks) # Tamanho para resultado (considera diferença por quantidade de informação - captura o maior)

        similar = 0

        for i in range(secure_size):
            if hash_blocks[i] == test_hash_blocks[i]:
                similar += 1
        
        return similar / eval_size
