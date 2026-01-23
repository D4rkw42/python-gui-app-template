# módulo para gerenciar várias rotas dentro do app

from typing import Type
from PySide6.QtWidgets import QStackedLayout, QLayout

from client.core.interface import QLayoutWrapper

# Gerencia troca de rotas (abas) dentro da aplicação
class QRouter(QStackedLayout):
    def __init__(self):
        super().__init__()
        
        self.num_of_routes = 0
        self.routes = {}
    
    # cria uma nova rota como um layout para o router
    def CreateRoute(self, LayoutType: Type[QLayout], id: str, *args):
        self.routes[id] = self.num_of_routes
        self.num_of_routes += 1

        QLayoutWrapper(LayoutType, *args).Add(self)

    # muda o layout exibido no topo
    def ChangeRoute(self, id: str):
        self.setCurrentIndex(self.routes[id])

# QRouter para gerenciamento de rotas
ApplicationRouter: QRouter = QRouter()
