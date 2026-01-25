from PySide6.QtWidgets import QMainWindow, QWidget
from PySide6.QtGui import QIcon

from client.settings import *
from client.core import manifest

from .Interface import Interface

# janela principal do programa
class PySide6Window(QMainWindow):
    def __init__(self):
        super().__init__()

    # Carrega as configurações da janlena
    def Init(self):
        # definição do nome do app na janela
        self.setWindowTitle(DEFAULT_APP_NAME if manifest.info["name"] == "" else manifest.info["name"])

        # definição do ícone do app na janela
        icon = QIcon("assets/client/favicon.ico")
        self.setWindowIcon(icon)

        # tamanho min/inicial da janela
        self.setMinimumSize(MIN_WIDTH, MIN_HEIGHT)
        self.resize(INITIAL_WIDTH, INITIAL_HEIGHT)

        # definição de container principal
        container = QWidget()
        self.setCentralWidget(container)

        # definição da interface principal
        Interface(container)
