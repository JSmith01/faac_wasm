declare namespace FAAC {
  // Memory access methods provided by Emscripten
  function _malloc(size: number): number;
  function _free(ptr: number): void;
  function setValue(ptr: number, value: any, type: string): void;
  function getValue(ptr: number, type: string): any;
  function UTF8ToString(ptr: number): string;
  
  // Direct memory access
  const HEAP8: Int8Array;
  const HEAP16: Int16Array;
  const HEAP32: Int32Array;
  const HEAPU8: Uint8Array;
  const HEAPU16: Uint16Array;
  const HEAPU32: Uint32Array;
  const HEAPF32: Float32Array;
  const HEAPF64: Float64Array;
  
  // Function wrappers
  function cwrap(
    name: string,
    returnType: string | null,
    argTypes: (string | null)[],
    opts?: { async?: boolean }
  ): Function;
  
  // FAAC Constants (from faaccfg.h)
  const MPEG2 = 1;
  const MPEG4 = 0;
  const MAIN = 1;
  const LOW = 2;
  const SSR = 3;
  const LTP = 4;
  const FAAC_INPUT_NULL = 0;
  const FAAC_INPUT_16BIT = 1;
  const FAAC_INPUT_24BIT = 2;
  const FAAC_INPUT_32BIT = 3;
  const FAAC_INPUT_FLOAT = 4;
  const SHORTCTL_NORMAL = 0;
  const SHORTCTL_NOSHORT = 1;
  const SHORTCTL_NOLONG = 2;
  
  // Stream format enums
  const RAW_STREAM = 0;
  const ADTS_STREAM = 1;
}

// FAAC configuration structure
export interface FaacEncConfiguration {
  version: number;
  name: string;
  copyright: string;
  mpegVersion: number;
  aacObjectType: number;
  jointmode: number;
  allowMidside: number;
  useLfe: number;
  useTns: number;
  bitRate: number;
  bandWidth: number;
  quantqual: number;
  outputFormat: number;
  psymodellist: number;
  psymodelidx: number;
  inputFormat: number;
  shortctl: number;
  channel_map: number[];
  pnslevel: number;
}

// FAAC functions
export interface FaacFunctions {
  faacEncOpen(
    sampleRate: number,
    numChannels: number,
    inputSamplesPtr: number,
    maxOutputBytesPtr: number
  ): number;
  
  faacEncGetCurrentConfiguration(
    hEncoder: number
  ): number;
  
  faacEncSetConfiguration(
    hEncoder: number,
    config: number
  ): number;
  
  faacEncEncode(
    hEncoder: number,
    inputBuffer: number,
    samplesInput: number,
    outputBuffer: number,
    bufferSize: number
  ): number;
  
  faacEncClose(
    hEncoder: number
  ): number;
  
  faacEncGetVersion(): number;
  
  faacEncGetDecoderSpecificInfo(
    hEncoder: number,
    ppBuffer: number,
    pSizeOfDecoderSpecificInfo: number
  ): number;
}

// Main module interface
declare function FAAC(): Promise<typeof FAAC & FaacFunctions>;

declare global {
  interface Window {
    FAAC: typeof FAAC;
    faacEncOpen: FaacFunctions['faacEncOpen'];
    faacEncGetCurrentConfiguration: FaacFunctions['faacEncGetCurrentConfiguration'];
    faacEncSetConfiguration: FaacFunctions['faacEncSetConfiguration'];
    faacEncEncode: FaacFunctions['faacEncEncode'];
    faacEncClose: FaacFunctions['faacEncClose'];
    faacEncGetVersion: FaacFunctions['faacEncGetVersion'];
    faacEncGetDecoderSpecificInfo: FaacFunctions['faacEncGetDecoderSpecificInfo'];
  }
}

export default FAAC;