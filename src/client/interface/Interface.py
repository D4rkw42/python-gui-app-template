# interface principal da janela

from PySide6.QtWidgets import QVBoxLayout, QWidget
from client.utils.interface import QSSLoader, ApplicationRouter

from client.interface.home import Home

class Interface(QVBoxLayout):
    def __init__(self, parent: QWidget):
        super().__init__(parent)

        # carregamento da estilização
        QSSLoader.LoadStyleSheet(parent, "assets/client/stylesheets/Interface.qss")

        ApplicationRouter.setParent(self) # linkagem do router com a interface principal

        # seção para adicionar rotas
        ApplicationRouter.create_route(Home, "Home") # aba home (principal)
