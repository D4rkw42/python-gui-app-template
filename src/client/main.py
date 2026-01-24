from PySide6.QtCore import QTimer, QElapsedTimer

from client.setup import Setup

from client.settings import *
from client.globals import *

# entry point
def Main():
    # Inicialização do aplicativo (funções essenciais)
    Setup()

    # Inicialização do aplicativo
    app.Init()

    # Execução do projeto
    pyside6_window.show() # invoca a janela principal

    # Definição do loop principal
    clock = QElapsedTimer()
    timer = QTimer()

    # Callback do timeout, passando dt em milisegundos
    def timeout_callback():
        dt = clock.restart() * 0.001
        app.Update(dt)

    timer.setInterval(APP_UPDATE_COOLDOWN)
    timer.timeout.connect(timeout_callback)

    clock.start()
    timer.start()

    pyside6_application.exec() # Executa o aplicativo do PySide6

    # Finalização do app
    app.Quit()

# Chamada inicial ao executar o projeto
if __name__ == "__main__":
    Main()
