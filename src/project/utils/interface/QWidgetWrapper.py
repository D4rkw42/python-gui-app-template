# criação dinâmica de layouts do QT

from typing import Type
from PySide6.QtWidgets import QLayout, QWidget

# wrapper para criar QWidgets
class QWidgetWrapper():
    def __init__(self, WidgetType: Type[QWidget], *args):
        super().__init__()
        self.widget = WidgetType(*args)

    # função para adicionar o widget dentro do layout pai
    def add(self, layout: QLayout) -> QWidget:
        layout.addWidget(self.widget)
        return self.widget
