# Prepara o template de build do client

import os, shutil

origin = "/src/client"
destine = "/build/template"

# Copia a source do client para uma pasta no build
def MakeTemplate():
    origin_path = os.getcwd() + origin
    destine_path = os.getcwd() + destine

    # Cria pasta build caso ela não exista
    if not os.path.exists("build"):
        os.mkdir("build")

    # Deleta sourde antiga
    if (os.path.exists(destine_path)):
        shutil.rmtree(destine_path, ignore_errors=True)

    shutil.copytree(origin_path, destine_path)

if __name__ == "__main__":
    MakeTemplate()
