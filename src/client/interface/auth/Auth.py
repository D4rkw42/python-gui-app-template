# interface da rota home do GUI App

from PySide6.QtWidgets import QVBoxLayout, QWidget
from client.core.interface import QSSLoader

class Auth(QVBoxLayout):
    def __init__(self, parent: QWidget):
        super().__init__(parent)

        # carregamento da estilização
        QSSLoader.LoadStyleSheet(parent, "assets/client/stylesheets/auth/Auth.qss")
