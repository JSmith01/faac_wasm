# FAAC WASM build

Compiles FAAC to WASM with emscripten. Has to be cloned with Linux-style line endings (otherwise compilation fails). Linux needs `automake`, `automake`, and `libtool` to be installed, and emscripten env vars
have to be initialized before starting a build.

To start a build:
```bash
npm run build
```

The build should work fine on WSL + Ubuntu (checked with 24.04).

To have the example up and running, start the web server:
```bash
npm start
```

Then proceed to [localhost:3000/example/](http://localhost:3000/example/) in a web browser.

For code example please check `example` directory here. Mind that it is AI generated code.


## Licenses

MIT
(C) 2025 Dmitry Zlygin

FAAC is distributed under LGPL-2.1, (C) 2001 M. Bakker
