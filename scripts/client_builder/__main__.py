# Compilação do projeto client com Nuitka

import os
import subprocess

compile_command = "poetry run python -m nuitka --msvc=latest --standalone --follow-imports --enable-plugin=pyside6 --output-dir=build --output-filename=program.exe build/template"

# Compila o projeto Client com Nuitka
def BuildProgram():
    print("[scripts.project] Compiling Client Project...")
    print("[scripts.project]: " + compile_command)

    os.system(compile_command)

    print("[scripts.project] Compiled successfully!")

# Executa o projeto Client compilado
def ExecuteProgram():
    print("[scripts.project]: Starting program.exe...")
    subprocess.call(["./build/template.dist/program"])

if __name__ == "__main__":
    BuildProgram()
    ExecuteProgram()
