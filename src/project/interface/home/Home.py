# interface da rota home do GUI App

from PySide6.QtWidgets import QVBoxLayout, QWidget
from project.utils.interface import QSSLoader

class Home(QVBoxLayout):
    def __init__(self, parent: QWidget):
        super().__init__(parent)

        # carregamento da estilização
        QSSLoader.LoadStyleSheet(parent, "assets/stylesheets/home/Home.qss")
