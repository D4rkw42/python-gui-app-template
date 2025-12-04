from PySide6.QtWidgets import QMainWindow, QWidget
from PySide6.QtGui import QIcon

from project.settings import *

from .Interface import Interface

# janela principal do programa
class PySide6Window(QMainWindow):
    def __init__(self):
        super().__init__()

        # definição do nome do app na janela
        self.setWindowTitle(APP_NAME)

        # definição do ícone do app na janela
        icon = QIcon("assets/favicon.ico")
        self.setWindowIcon(icon)

        # tamanho min/inicial da janela
        self.setMinimumSize(MIN_WIDTH, MIN_HEIGHT)
        self.resize(INITIAL_WIDTH, INITIAL_HEIGHT)

        # definição de container principal
        container = QWidget()
        self.setCentralWidget(container)

        # definição da interface principal
        Interface(container)
