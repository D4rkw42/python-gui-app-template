import os, sys
import json
import re

template_source = "/build/template"
build_config = "/config/client/build.json"
templates = "/templates/client"

template_source_path = os.getcwd() + template_source
build_config_path = os.getcwd() + build_config

# Regex Patterns
property_pattern = r"\{\{ (.+) \}\}"
property_sub_pattern = r"\{\{ .+ \}\}"

# Obtém todas as propriedades necessárias para o building

# Verifica se algum argumento foi passado
if len(sys.argv) < 2:
    raise RuntimeError("You need to provide the required properties.")

properties = {}

# Parse de todas as propriedades
for i in range(1, len(sys.argv)):
    prop_raw = sys.argv[i]

    # Validação de propriedade
    if not "=" in prop_raw:
        raise RuntimeError(f"Invalid property format for {prop_raw}.")
    
    props = prop_raw.removeprefix("--").split("=")
    
    # Salva as propriedades no dicionário
    property_name = props[0]
    property_value = props[1]

    properties[property_name] = property_value

# Faz o build dos arquivos especificados no config
def BuildTemplateFiles():
    if not os.path.exists(template_source_path):
        raise RuntimeError("Template Source doesn't exist.")
    
    # Arquivo de configuração para substituições
    with open(build_config_path, "r") as file:
        config = json.load(file)
        override_files = config["override"]

        for origin in override_files:
            template = override_files[origin]

            # Modela o arquivo segundo o template
            BuildFile(origin, template)

# Cria o arquivo através do template
def BuildFile(origin: str, template: str):
    template_file = os.getcwd() + templates + template
    target_file = os.getcwd() + template_source + origin

    with open(template_file, "r") as file:
        content = file.read()
        required_props = GetRequiredProperties(content)

        for prop in required_props:
            values = prop.split(" ")

            prop_name = values[0]
            prop_type = values[1]

            # Verifica se a propriedade foi passada pelo chamador
            if not prop_name in properties:
                raise RuntimeError(f'Missing "{prop_name}" property for "{template}" template file.')
            
            prop_sub = properties[prop_name]

            # Parsing de tipos para o Python gerado
            if prop_type == "str":
                prop_sub = f'\"{prop_sub}\"'
            elif prop_type == "int":
                prop_sub = str(int(prop_sub))
            elif prop_type == "float":
                prop_sub = str(float(prop_sub))
            elif prop_type == "bool":
                prop_sub = "True" if prop_sub == "true" else prop_sub
                prop_sub = "False" if prop_sub == "false" else prop_sub

            # Substituição no ponto requerido
            content = re.sub(property_sub_pattern, prop_sub, content, 1)

        # Salva o arquivo gerado
        with open(target_file, "w") as file:
            file.write(content)

# Obtém as propriedades requeridas para o build
def GetRequiredProperties(file_content: str) -> list[str]:
    return re.findall(property_pattern, file_content)

if __name__ == "__main__":
    BuildTemplateFiles()
