# criação dinâmica de layouts do QT

from typing import Type, Self
from PySide6.QtWidgets import QLayout, QWidget

# wrapper para criar QLayouts
class QLayoutWrapper(QWidget):
    def __init__(self, LayoutType: Type[QLayout], *args):
        super().__init__()
        self.m_layout = LayoutType(self, *args)

    # função auxiliar para adicionar widgets externamente no layout
    def AddWidget(self, widget: QWidget):
        self.m_layout.addWidget(widget)

    # função para adicionar o próprio layout dentro do layout pai
    def Add(self, layout: QLayout) -> Self:
        layout.addWidget(self)
        return self
