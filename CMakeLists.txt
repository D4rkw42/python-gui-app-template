cmake_minimum_required(VERSION 3.29.7)

project(
    security-module
    VERSION 1.0.0
    DESCRIPTION "Módulo de segurança de chaves de ativação de autenticação dos projetos de Python GUI"
    HOMEPAGE_URL "https://github.com/D4rkw42/python-gui-app-template"
    LANGUAGES CXX
)

# C++17 standard
set(CMAKE_CXX_STANDARD 17)

# verifying MSVC Compiler
# pybind11 works better with this compiler and may generate undefined behavior without it

if(MSVC)
    message(STATUS "Compiler MSVC detected.")
else()
    message(FATAL_ERROR "This project only works correctly with MSVC compilers!")
endif()

# verifying build type
if(${CMAKE_BUILD_TYPE} STREQUAL "Release")
    set(SECURITY_MODULE_FILE_TYPE release)
elseif(${CMAKE_BUILD_TYPE} STREQUAL "Debug")
    set(SECURITY_MODULE_FILE_TYPE debug)
else()
    message(FATAL_ERROR "Build type invalid!")
endif()

# DISCLAIMERS
message(STATUS "This CMakeLists.txt was made to be integrated with Poetry Python, please be sure you are in this environment!")

# dependencies

include_directories(
    "${CMAKE_CURRENT_SOURCE_DIR}/src/security"
)

# Python
find_package(Python COMPONENTS Interpreter Development REQUIRED)

# pybind11
find_package(pybind11 CONFIG REQUIRED)

# linker

link_directories(${Python_LIBRARY_DIRS})

# sources

file(GLOB AUTH_SOURCES CONFIGURE_DEPENDS ${CMAKE_SOURCE_DIR}/src/security/auth/*.cpp)
file(GLOB KEY_SOURCES CONFIGURE_DEPENDS ${CMAKE_SOURCE_DIR}/src/security/key/*.cpp)

# compile options

add_compile_options(/W4)            # error handling
add_compile_options(/permissive-)   # error handling

# building python modules

# auth module
pybind11_add_module(auth MODULE ${AUTH_SOURCES})

set_target_properties(
    auth PROPERTIES
    PREFIX ""           # no "lib" prefix
    SUFFIX ".pyd"       # extension
    OUTPUT_NAME "auth"  # output file name

    # target output location
    LIBRARY_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/bin/modules/security"
    ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/bin/modules/security"
)

# key module
pybind11_add_module(key MODULE ${KEY_SOURCES})

set_target_properties(
    key PROPERTIES
    PREFIX ""           # no "lib" prefix
    SUFFIX ".pyd"       # extension
    OUTPUT_NAME "key"   # output file name

    # target output location
    LIBRARY_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/bin/modules/security"
    ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/bin/modules/security"
)

# generating python module security

# __init__.py template
configure_file(
    ${CMAKE_SOURCE_DIR}/cmake/modules/security/__init__.py.in
    ${CMAKE_SOURCE_DIR}/bin/modules/security/__init__.py
    COPYONLY
)

# message of template install mode
message(STATUS "It's going to install modules for ${SECURITY_MODULE_FILE_TYPE} templates")

# auth.py template
configure_file(
    ${CMAKE_SOURCE_DIR}/cmake/modules/security/auth.py.${SECURITY_MODULE_FILE_TYPE}.in
    ${CMAKE_SOURCE_DIR}/bin/modules/security/auth.py
    COPYONLY
)

# key.py template
configure_file(
    ${CMAKE_SOURCE_DIR}/cmake/modules/security/key.py.${SECURITY_MODULE_FILE_TYPE}.in
    ${CMAKE_SOURCE_DIR}/bin/modules/security/key.py
    COPYONLY
)
