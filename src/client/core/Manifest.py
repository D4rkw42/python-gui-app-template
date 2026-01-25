# Manifesto do aplicativo

from __future__ import annotations

import os
import json

from client import __version__

from client.settings import *

from client.utils import OpenJsonConfig
from client.utils.math.numeric import GenerateHexadecimalStr

class Manifest:
    data = None

    @property
    def info(self) -> dict[str, str]:
        if self.data:
            return self.data
        
        raise RuntimeError("Manifest not initialized.")

    # Obtém o manifesto do aplicativo. Cria um novo caso não exista
    @staticmethod
    def Load(manifest: Manifest):
        manifest_file = "/manifest.json" if not DEBUG else "/data/client/manifest.json"
        manifest_file_path = os.getcwd() + manifest_file

        manifest_exists = os.path.exists(manifest_file_path)

        # Cria um novo manifest se ele não existe
        if not manifest_exists:
            manifest_template = os.getcwd() + "/templates/client/manifest.json.tpl"

            with open(manifest_template, "r") as template:
                with open(manifest_file_path, "w") as manifest_new:
                    manifest_new.write(template.read())

        # Sempre tenta atualizar as informações do Manifest
        Manifest.UpdateManifest(manifest_file)

        # atualiza o manifest na memória
        manifest.data = OpenJsonConfig(manifest_file)

    # Atualiza o arquivo do manifest com as informações necessárias
    @staticmethod
    def UpdateManifest(manifest_file: str):
        manifest = OpenJsonConfig(manifest_file)

        # Gera dados dinâmicos caso não existam

        if manifest["installID"] == "" or manifest["version"] == "":
            manifest["installID"] = "00" + GenerateHexadecimalStr(8)
            manifest["version"] = __version__

        manifest["mode"] = "development" if manifest["mode"] == "" else manifest["mode"]

        with open(os.getcwd() + manifest_file, "w") as file:
            json.dump(manifest, file, indent=2)

manifest = Manifest()
