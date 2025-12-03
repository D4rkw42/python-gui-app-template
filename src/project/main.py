from PySide6.QtCore import QTimer, QElapsedTimer

from project.settings import *
from project.globals import *

# entry point
def main():
    # inicialização do app
    app.init()

    # execução do projeto
    pyside6_window.show() # invoca a janela principal

    # definição do loop principal
    clock = QElapsedTimer()
    timer = QTimer()

    # callback do timeout, passando dt em milisegundos
    def timeout_callback():
        dt = clock.restart() * 0.001
        app.update(dt)

    timer.setInterval(APP_UPDATE_COOLDOWN)
    timer.timeout.connect(timeout_callback)

    clock.start()
    timer.start()

    pyside6_application.exec() # executa o aplicativo do PySide6

    # finalização do app
    app.quit()

# chamada inicial ao executar o projeto
if __name__ == "__main__":
    main()
