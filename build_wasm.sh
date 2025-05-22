#!/bin/bash

# Build script to compile FAAC to WebAssembly using Emscripten
set -e

cd faac
bash ./bootstrap
cd ..

# Create build directory
mkdir -p wasm_build
cd wasm_build

# Configure with Emscripten
emconfigure ../faac/configure \
  --host=wasm32-unknown-emscripten \
  --prefix=$(pwd)/install \
  --disable-shared \
  --enable-static

# Build with Emscripten
emmake make -j4

# Create WASM exports for the API functions
cd libfaac
emcc -O3 \
  .libs/libfaac.a \
  -o libfaac.js \
  -s WASM=1 \
  -s EXPORTED_FUNCTIONS="['_faacEncOpen', '_faacEncGetCurrentConfiguration', '_faacEncSetConfiguration', '_faacEncGetDecoderSpecificInfo', '_faacEncEncode', '_faacEncClose', '_faacEncGetVersion', '_malloc', '_free']" \
  -s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap', 'setValue', 'getValue', 'UTF8ToString', 'stringToUTF8', 'writeArrayToMemory', 'ALLOC_NORMAL', 'HEAP8', 'HEAP16', 'HEAP32', 'HEAPU8', 'HEAPU16', 'HEAPU32', 'HEAPF32', 'HEAPF64']" \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s MODULARIZE=1 \
  -s EXPORT_NAME="FAAC" \
  -s ENVIRONMENT='web,worker' \
  --no-entry

echo "WebAssembly build complete. Output files are in the wasm_build/libfaac directory."

cd ../..
mkdir -p dist
cp wasm_build/libfaac/libfaac.js dist/
cp wasm_build/libfaac/libfaac.wasm dist/
