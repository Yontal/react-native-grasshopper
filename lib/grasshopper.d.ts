/**
 * S-blocks
 */
export declare const blocksS: number[];
/**
 * Inverse S-blocks
 */
export declare const invBlocksS: number[];
/**
 * Nonlinear bijective transformation
 * @param inputData
 * @param blocks
 */
export declare const transformationS: (inputData: number[], blocks: number[]) => number[];
/**
 * Modulo 2 round key addition
 * @param inputData
 * @param roundKey
 */
export declare const transformationX: (inputData: number[], roundKey: number[]) => number[];
/**
 * Multiplication in field x^8 + x^7 + x^6 + x + 1
 * @param lhs
 * @param rhs
 */
export declare const galoisMultiply: (lhs: number, rhs: number) => number;
/**
 * Linear feedback shift register
 * @param inputData
 */
export declare const transformationR: (inputData: number[]) => number[];
/**
 * Inverse linear feedback shift register
 * @param inputData
 */
export declare const invTransformationR: (inputData: number[]) => number[];
/**
 * Linear transformation
 * @param inputData
 */
export declare const transformationL: (inputData: number[]) => number[];
/**
 * Inverse linear transformation
 * @param inputData
 */
export declare const invTransformationL: (inputData: number[]) => number[];
/**
 * Getting iteration constants
 * @param inputNumber
 */
export declare const transformationC: (inputNumber: number) => number[];
/**
 * F transformation
 * @param inputData
 * @param key
 */
export declare const transformationF: (inputData: number[], key: number[][]) => number[][];
/**
 * Key deployment
 * @param masterKey
 */
export declare const deployKeys: (masterKey: number[]) => number[][];
/**
 * Encryption
 * @param plainText
 * @param masterKey
 */
export declare const encrypt: (plainText: number[], masterKey: number[]) => number[];
/**
 * Decryption
 * @param cypherText
 * @param masterKey
 */
export declare const decrypt: (cypherText: number[], masterKey: number[]) => number[];
