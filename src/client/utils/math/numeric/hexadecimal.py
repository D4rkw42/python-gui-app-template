# Funções para manipulação de hexadecimal

from random import randint

# Gera uma cadeia de caracteres de hexadecimal
def GenerateHexadecimalStr(length: int) -> str:
    if length < 1:
        raise ValueError("Length should be at least 1.")
    
    chars = [
        "0", "1", "2", "3",
        "4", "5", "6", "7",
        "8", "9", "A", "B",
        "C", "D", "E", "F"
    ]

    hex = ""

    for i in range(length):
        index = randint(0, 15)
        hex += chars[index]

    return hex
