# Interface principal da janela

from PySide6.QtWidgets import QVBoxLayout, QWidget
from client.core.interface import QSSLoader, ApplicationRouter

from client.interface.auth import Auth
from client.interface.home import Home

class Interface(QVBoxLayout):
    def __init__(self, parent: QWidget):
        super().__init__(parent)

        # Carregamento da estilização
        QSSLoader.LoadStyleSheet(parent, "assets/client/stylesheets/Interface.qss")

        ApplicationRouter.setParent(self) # Linkagem do router com a interface principal

        # Seção para adicionar rotas
        ApplicationRouter.CreateRoute(Auth, "auth") # Aba auth (autenticação)
        ApplicationRouter.CreateRoute(Home, "home") # Aba home (principal)

        # Seleciona a aba home por padrão
        ApplicationRouter.ChangeRoute("home")
