# FAAC WebAssembly Microphone Recording Example

This example demonstrates how to use the FAAC (Free Advanced Audio Coder) library compiled to WebAssembly to encode live microphone audio to AAC format directly in the browser.

## Features

- Records audio from your microphone
- Processes the audio in real-time
- Encodes PCM audio to AAC format using the FAAC library (WebAssembly)
- Provides an audio visualizer
- Allows downloading the resulting AAC file

## How To Use

1. Make sure you have already built the FAAC library to WebAssembly using the `build_wasm.sh` script in the project root
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, etc.)
3. Click "Start Recording" and allow microphone access when prompted
4. Speak into your microphone
5. Click "Stop Recording" when finished
6. Click "Download AAC" to download the encoded AAC file

## How It Works

This example:

1. Loads the FAAC WebAssembly module
2. Captures audio using the Web Audio API and MediaStream Recording API
3. Processes audio frames through a ScriptProcessorNode
4. Converts audio samples from 32-bit float to 16-bit PCM
5. Passes the PCM data to the FAAC encoder via WebAssembly
6. Collects the encoded AAC frames
7. Adds ADTS headers to make the AAC stream playable
8. Creates a downloadable file when recording is complete

## Browser Compatibility

This example requires a modern browser with support for:
- Web Audio API
- MediaStream Recording API
- WebAssembly
- ES6 JavaScript features

## Notes

- The AAC file is created with ADTS (Audio Data Transport Stream) headers to make it playable in most media players
- The sample rate is fixed at 48kHz with 1 channels (mono)
- Audio quality settings can be adjusted in the `setupFaacEncoder` function