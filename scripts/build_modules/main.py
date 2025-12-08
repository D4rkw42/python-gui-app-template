import sys, os, time

# flushing
os.system("cls")

# switch with your favorite version of MSVC
TARGET_COMPILER = "Visual Studio 17 2022"

# select your Python executable
PYTHON_EXECUTABLE = "C:\\Program Files\\Python314\\Python.exe"

def build_command(build_type: str):
    # generates all module source from CMakeLists.txt
    commands = [
        "mkdir build",
        f'cmake . -G "{TARGET_COMPILER}" -B build -DPython_EXECUTABLE="${PYTHON_EXECUTABLE}" -DCMAKE_BUILD_TYPE={build_type}',
        f"cmake --build build --config {build_type}"
    ]

    # running every command
    for cmd in commands:
        os.system("cls")

        print("[build_modules]: ", cmd) # view
        status_code = os.system(cmd)

        time.sleep(0.2)

        # error handling
        if status_code != 0:
            return print(f"[build_modules]: Error while running command: ${status_code}")
    
    os.system("cls")
    print("[build_modules]: Success while buildind modules!")

def build():
    if not "Visual Studio" in TARGET_COMPILER:
        return print("[build_modules]: Inavalid compiler, must be MSVC!")

    try:
        build_type = sys.argv[1]
    except:
        return print("[build_module]: No build type was configured!")

    if build_type in ["release", "debug"]:
        return build_command(build_type.capitalize())
        
    print("[build_modules]: Inavalid build type!")

def compile():
    print("[build_modules]: Compiling build configuration...")

    try:
        build_type = sys.argv[1]
    except:
        return print("[build_modules]: No build type was configured!")

    if build_type in ["release", "debug"]:
        status_code = os.system(f"cmake --build build --config {build_type.capitalize()}")
    else:
        return print("[build_modules]: Invalid build type!")
    
    os.system("cls")

    if status_code == 0:
        print("[build_modules]: Compiled!")
    else:
        print("[build_modules]: There is no existing configuration.")

def clear():
    print("[build_modules]: Clearing /build...")

    status_code = os.system("rmdir build /s /q")
    os.system("cls")

    if status_code == 0:
        print("[build_modules]: Cleared.")
    else:
        print("[build_modules]: /build already cleared!")

if __name__ == "__main__":
    clear()
    build()
