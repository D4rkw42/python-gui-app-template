# Funções executadas ao iniciar o aplicativo

import os

from client.settings import *
from client.globals import *

from client.core import Manifest, manifest

# Função de setup inicial
def Setup():
    # Cria diretórios essenciais
    CreateDirectories()

    # Carrega o Manifest na memória
    Manifest.Load(manifest)

# Cria os diretórios essenciais para o funcionamento do aplicativo
def CreateDirectories():
    for dir in APPLICATION_DIRS:
        path = os.getcwd() + dir
        os.makedirs(path, exist_ok=True)
