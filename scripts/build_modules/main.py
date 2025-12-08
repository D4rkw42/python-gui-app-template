import sys, os, time

# flushing
os.system("cls")

# switch with your favorite version of MSVC
TARGET_COMPILER = "Visual Studio 17 2022"

# select your Python executable
PYTHON_EXECUTABLE = "C:\\Program Files\\Python314\\Python.exe"

# generates stubs for IDE's
def gen_stubs():
    print("[build_modules]: Generating stubs for modules...")

    # pybind11-stubgen
    status_code = os.system("pybind11-stubgen security -o bin/modules")
    os.system("cls")

    # verifying exit code
    if status_code == 0:
        print("[build_modules]: Success while generating subs!")
    else:
        print('[build_modules]: Failure while generating subs! Perhaps you need to run "poetry run build BUILD_TYPE" or "poetry run compile BUILD_TYPE" before. If it keeps crashing, be sure you downloaded every dependency of poetry (production and dev).')

# overall build command
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
            return print(f"[build_modules]: Error while running command: {cmd}")
    
    os.system("cls")
    print("[build_modules]: Success while buildind modules!")

    gen_stubs() # generating stubs

# command to build every module
def build():
    print("[build_modules]: Building configuration...")

    # verifies if compiler is Visual Studio
    if not "Visual Studio" in TARGET_COMPILER:
        return print("[build_modules]: Invalid compiler, must be MSVC!")

    # verifies if build type was provided
    try:
        build_type = sys.argv[1]
    except:
        return print("[build_module]: No build type was provided!")

     # verifies if build_type is valid
    if build_type in ["release", "debug"]:
        return build_command(build_type.capitalize())
        
    print("[build_modules]: Invalid build type!")

# command to compile build configuration
def compile():
    print("[build_modules]: Compiling build configuration...")

    # verifies if compiler is Visual Studio
    if not "Visual Studio" in TARGET_COMPILER:
        return print("[build_modules]: Invalid compiler, must be MSVC!")

    # verifies if build type was provided
    try:
        build_type = sys.argv[1]
    except:
        return print("[build_modules]: No build type was provided!")

    # verifies if build_type is valid
    if build_type in ["release", "debug"]:
        status_code = os.system(f"cmake --build build --config {build_type.capitalize()}")
    else:
        return print("[build_modules]: Invalid build type!")
    
    os.system("cls")

    if status_code == 0:
        print("[build_modules]: Compiled!")
        gen_stubs() # generating stubs
    else:
        print("[build_modules]: There is no existing configuration.")

# command to clear build configuration
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
