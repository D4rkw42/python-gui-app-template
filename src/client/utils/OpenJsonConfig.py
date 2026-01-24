# Abre um arquivo de configuração em Json

import os
import json

from typing import Any

def OpenJsonConfig(filepath: str) -> dict[str, Any]:
    path = os.getcwd() + filepath

    with open(path, "r") as file:
        return json.load(file)
