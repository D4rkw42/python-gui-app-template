# Abre um arquivo de configuração em Json

import os
import json

from typing import Any

def OpenJsonConfig(filepath: str) -> dict[str, Any]:
    path = os.getcwd() + filepath

    try:
        with open(path, "r") as file:
            return json.load(file)
    except:
        raise RuntimeError(f"File {path} does not exist.")
