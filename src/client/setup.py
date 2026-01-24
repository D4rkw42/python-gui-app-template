# Funções executadas ao iniciar o aplicativo

import os
import json

from client import __version__

from client.settings import *

from client.utils import OpenJsonConfig
from client.utils.math.numeric import GenerateHexadecimalStr

# Função de setup inicial
def Setup():
    # Cria diretórios essenciais
    CreateDirectories()

    # Atualização ou criação de manifest
    Manifest()

# Cria os diretórios essenciais para o funcionamento do aplicativo
def CreateDirectories():
    for dir in APPLICATION_DIRS:
        path = os.getcwd() + dir
        os.makedirs(path, exist_ok=True)

# Manifest do aplicativo

# Atualiza ou cria o manifest.json do aplicativo
def Manifest():
    manifest_file = os.getcwd() + ("/manifest.json" if not DEBUG else "/data/client/manifest.json")
    manifest_exists = os.path.exists(manifest_file)

    # Cria um novo manifest se ele não existe
    if not manifest_exists:
        manifest_template = os.getcwd() + "/config/client/templates/manifest.json.tpl"

        with open(manifest_template, "r") as template:
            with open(manifest_file, "w") as manifest_new:
                manifest_new.write(template.read())

    # Sempre tenta atualizar as informações do Manifest
    UpdateManifest(manifest_file)


# Atualiza o manifest com as informações necessárias
def UpdateManifest(manifest_file: str):
    manifest = OpenJsonConfig(manifest_file)

    # Gera dados dinâmicos caso não existam
    if manifest["installID"] != "" and manifest["version"] != "":
        return

    manifest["installID"] = "00" + GenerateHexadecimalStr(8)
    manifest["version"] = __version__

    with open(manifest_file, "w") as file:
        json.dump(manifest, file, indent=2)
