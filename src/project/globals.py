# variáveis globais do projeto
from PySide6.QtWidgets import QApplication

from project.interface import PySide6Window
from project.app import App

# PySide6
pyside6_application: QApplication = QApplication() # app principal do PySide6
pyside6_window: PySide6Window = PySide6Window() # janela principal do projeto

# aplicativo
app: App = App()
