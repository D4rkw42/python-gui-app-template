# loader para arquivos QSS

from PySide6.QtWidgets import QWidget

# carrega dinamicamente os estilos para um widget
class QSSLoader:
    @staticmethod
    def LoadStyleSheet(widget: QWidget, file: str):
        with open(file) as f:
            style = f.read()
            widget.setStyleSheet(style)
