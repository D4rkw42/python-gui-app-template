import os

# flushing
os.system("cls")

# switch with your favorite version of MSVC
TARGET_COMPILER = "Visual Studio 17 2022"

# select your Python executable
PYTHON_EXECUTABLE = "C:\\Program Files\\Python314\\Python.exe"

def generate_cmake(build_type: str):
    # generates the makefile dependencies from CMakeLists.txt
    commands = [
        "mkdir build",
        f'cmake . -G "{TARGET_COMPILER}" -B build -DPython_EXECUTABLE="${PYTHON_EXECUTABLE}" -DCMAKE_BUILD_TYPE={build_type}'
    ]

    # running every command
    for cmd in commands:
        print("[cmake_gen]: ", cmd) # view
        status_code = os.system(cmd)

        # error handling
        if status_code != 0:
            return print(f"[cmake_gen]: Error while running command: ${status_code}")

# Release case
def gen_release():
    generate_cmake("Release")
    print("[cmake_gen]: Success on Release!")

# Debug case
def gen_debug():
    generate_cmake("Debug")
    print("[cmake_gen]: Success on Debug!")

if __name__ == "__main__":
    gen_release()
