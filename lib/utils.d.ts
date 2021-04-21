/**
 * Curries a function with two arguments and flip them
 * @param fn
 */
export declare const curryTwoFlip: <A, B, R>(fn: (a: A, b: B) => R) => (b: B) => (a: A) => R;
/**
 * Performs left-to-right function composition
 * @param fn1
 * @param fns
 */
export declare const pipe: <A extends any[], R extends any>(fn1: (...args: A) => R, ...fns: ((a: R) => R)[]) => (...args: A) => R;
/**
 * Converts a hexadecimal string to an array of 8-bit unsigned integer values
 * @param hexString
 */
export declare const parseHexStringToBuffer: (hexString: string) => number[];
/**
 * Converts Utf-8 string to array of 8-bit unsigned integer values
 * @param utf8String
 */
export declare const utf8ToBuffer: (utf8String: string) => number[];
/**
 * Complements message to block's length
 * @param buffer
 */
export declare const complementMessage: (buffer: number[]) => number[];
/**
 * Truncates padded bits
 * @param buffer
 */
export declare const truncateMessage: (buffer: number[]) => number[];
/**
 * Converts Utf-8 string to Base-64 string
 * @param utf8String
 */
export declare const utf8ToBase64: (utf8String: string) => string;
/**
 * Converts Base-64 string to Utf-8 string
 * @param base64String
 */
export declare const base64ToUtf8: (base64String: string) => string;
/**
 * Converts array of 8-bit unsigned integer values to Base-64 string
 * @param buffer
 */
export declare const bufferToBase64: (buffer: number[]) => string;
/**
 * Converts Base-64 string to array of 8-bit unsigned integer values
 * @param base64String
 */
export declare const base64ToBuffer: (base64String: string) => number[];
/**
 * Split message to 128-bit chunks
 * @param buffer
 */
export declare const splitMessage: (buffer: number[]) => number[][];
/**
 * Joins 128-bit chunks into message
 * @param buffers
 */
export declare const joinMessage: (buffers: number[][]) => number[];
/**
 * Encrypts Utf-8 string message and returns encrypted message in Base-64
 * @param message Utf-8 string
 * @param masterKey Base-64 string
 *
 */
export declare const encryptString: (message: string, masterKey: string) => string;
/**
 * Decrypts encrypted message in Base-64 and returns Utf-8 string message
 * @param message Base-64 string
 * @param masterKey Base-64 string
 */
export declare const decryptString: (message: string, masterKey: string) => string;
/**
 * Generates 256-bit masterKey in Base-64
 */
export declare const generateKey: () => string;
