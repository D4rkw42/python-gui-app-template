import os

# flushing
os.system("cls")

def build(build_type: str):
    # generates all module source from CMakeLists.txt
    command = f"cmake --build build --config {build_type}"

    print("[build_modules]: ", command) # view
    status_code = os.system(command)

    # error handling
    if status_code != 0:
        return print(f"[build modules]: Error while running command: ${status_code}")

# Release case
def build_release():
    build("Release")
    print("[build_modules]: Success on Release!")

# Debug case
def build_debug():
    build("Debug")
    print("[build_modules]: Success on Debug!")

if __name__ == "__main__":
    build_release()
