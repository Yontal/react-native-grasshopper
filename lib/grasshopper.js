"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// prettier-ignore
/**
 * S-blocks
 */
exports.blocksS = [
    252, 238, 221, 17, 207, 110, 49, 22, 251, 196, 250, 218, 35, 197, 4, 77, 233,
    119, 240, 219, 147, 46, 153, 186, 23, 54, 241, 187, 20, 205, 95, 193, 249, 24, 101,
    90, 226, 92, 239, 33, 129, 28, 60, 66, 139, 1, 142, 79, 5, 132, 2, 174, 227, 106, 143,
    160, 6, 11, 237, 152, 127, 212, 211, 31, 235, 52, 44, 81, 234, 200, 72, 171, 242, 42,
    104, 162, 253, 58, 206, 204, 181, 112, 14, 86, 8, 12, 118, 18, 191, 114, 19, 71, 156,
    183, 93, 135, 21, 161, 150, 41, 16, 123, 154, 199, 243, 145, 120, 111, 157, 158, 178,
    177, 50, 117, 25, 61, 255, 53, 138, 126, 109, 84, 198, 128, 195, 189, 13, 87, 223,
    245, 36, 169, 62, 168, 67, 201, 215, 121, 214, 246, 124, 34, 185, 3, 224, 15, 236,
    222, 122, 148, 176, 188, 220, 232, 40, 80, 78, 51, 10, 74, 167, 151, 96, 115, 30, 0,
    98, 68, 26, 184, 56, 130, 100, 159, 38, 65, 173, 69, 70, 146, 39, 94, 85, 47, 140, 163,
    165, 125, 105, 213, 149, 59, 7, 88, 179, 64, 134, 172, 29, 247, 48, 55, 107, 228, 136,
    217, 231, 137, 225, 27, 131, 73, 76, 63, 248, 254, 141, 83, 170, 144, 202, 216, 133,
    97, 32, 113, 103, 164, 45, 43, 9, 91, 203, 155, 37, 208, 190, 229, 108, 82, 89, 166,
    116, 210, 230, 244, 180, 192, 209, 102, 175, 194, 57, 75, 99, 182
];
// prettier-ignore
/**
 * Inverse S-blocks
 */
exports.invBlocksS = [
    165, 45, 50, 143, 14, 48, 56, 192, 84, 230, 158, 57, 85, 126, 82, 145, 100, 3, 87, 90, 28, 96, 7,
    24, 33, 114, 168, 209, 41, 198, 164, 63, 224, 39, 141, 12, 130, 234, 174, 180, 154, 99, 73, 229,
    66, 228, 21, 183, 200, 6, 112, 157, 65, 117, 25, 201, 170, 252, 77, 191, 42, 115, 132, 213, 195,
    175, 43, 134, 167, 177, 178, 91, 70, 211, 159, 253, 212, 15, 156, 47, 155, 67, 239, 217, 121, 182,
    83, 127, 193, 240, 35, 231, 37, 94, 181, 30, 162, 223, 166, 254, 172, 34, 249, 226, 74, 188, 53,
    202, 238, 120, 5, 107, 81, 225, 89, 163, 242, 113, 86, 17, 106, 137, 148, 101, 140, 187, 119, 60,
    123, 40, 171, 210, 49, 222, 196, 95, 204, 207, 118, 44, 184, 216, 46, 54, 219, 105, 179, 20, 149,
    190, 98, 161, 59, 22, 102, 233, 92, 108, 109, 173, 55, 97, 75, 185, 227, 186, 241, 160, 133, 131,
    218, 71, 197, 176, 51, 250, 150, 111, 110, 194, 246, 80, 255, 93, 169, 142, 23, 27, 151, 125, 236,
    88, 247, 31, 251, 124, 9, 13, 122, 103, 69, 135, 220, 232, 79, 29, 78, 4, 235, 248, 243, 62, 61,
    189, 138, 136, 221, 205, 11, 19, 152, 2, 147, 128, 144, 208, 36, 52, 203, 237, 244, 206, 153, 16,
    68, 64, 146, 58, 1, 38, 18, 26, 72, 104, 245, 129, 139, 199, 214, 32, 10, 8, 0, 76, 215, 116
];
/**
 * Constants for linear transformation
 */
const linearConstants = [148, 32, 133, 16, 194, 192, 1, 251, 1, 192, 194, 16, 133, 32, 148, 1];
/**
 * Nonlinear bijective transformation
 * @param inputData
 * @param blocks
 */
exports.transformationS = (inputData, blocks) => inputData.map(val => blocks[val]);
/**
 * Modulo 2 round key addition
 * @param inputData
 * @param roundKey
 */
exports.transformationX = (inputData, roundKey) => inputData.map((val, ind) => val ^ roundKey[ind]);
/**
 * Multiplication in field x^8 + x^7 + x^6 + x + 1
 * @param lhs
 * @param rhs
 */
exports.galoisMultiply = (lhs, rhs) => {
    let result = 0;
    let modulus = 0x1c3 << 7;
    for (let detector = 0x1; detector !== 0x100; detector <<= 1, lhs <<= 1) {
        if (rhs & detector) {
            result ^= lhs;
        }
    }
    for (let detector = 0x8000; detector !== 0x80; detector >>= 1, modulus >>= 1) {
        if (result & detector) {
            result ^= modulus;
        }
    }
    return result;
};
/**
 * Linear feedback shift register
 * @param inputData
 */
exports.transformationR = (inputData) => {
    const sliced = inputData.slice(0, inputData.length - 1);
    const transformed = inputData.reduce((acc, val, ind) => acc ^ exports.galoisMultiply(val, linearConstants[ind]), 0);
    return [transformed].concat(sliced);
};
/**
 * Inverse linear feedback shift register
 * @param inputData
 */
exports.invTransformationR = (inputData) => {
    const [first, ...rest] = inputData;
    const transformed = rest.concat(first).reduce((acc, val, ind) => acc ^ exports.galoisMultiply(val, linearConstants[ind]), 0);
    return rest.concat(transformed);
};
/**
 * Linear transformation
 * @param inputData
 */
exports.transformationL = (inputData) => inputData.reduce(acc => exports.transformationR(acc), inputData);
/**
 * Inverse linear transformation
 * @param inputData
 */
exports.invTransformationL = (inputData) => inputData.reduce(acc => exports.invTransformationR(acc), inputData);
/**
 * Getting iteration constants
 * @param inputNumber
 */
exports.transformationC = (inputNumber) => {
    const array = Array(16)
        .fill(0)
        .map((v, i) => (i === 15 ? inputNumber : v));
    return exports.transformationL(array);
};
/**
 * F transformation
 * @param inputData
 * @param key
 */
exports.transformationF = (inputData, key) => {
    const curriedTransformationS = utils_1.curryTwoFlip(exports.transformationS)(exports.blocksS);
    const curriedTransformationX = utils_1.curryTwoFlip(exports.transformationX)(key[1]);
    const transformResult = utils_1.pipe(exports.transformationX, curriedTransformationS, exports.transformationL, curriedTransformationX)(inputData, key[0]);
    return [transformResult, key[0]];
};
/**
 * Key deployment
 * @param masterKey
 */
exports.deployKeys = (masterKey) => {
    const iterativeKeys = [masterKey.slice(0, 16), masterKey.slice(16, 32)];
    return Array(4)
        .fill(0)
        .reduce((extAcc, extVal, extInd) => {
        const keyPair = Array(8)
            .fill(0)
            .reduce((intAcc, intVal, intInd) => exports.transformationF(exports.transformationC(8 * extInd + intInd + 1), intAcc), [
            extAcc[extInd * 2],
            extAcc[extInd * 2 + 1],
        ]);
        return extAcc.concat([keyPair[0]]).concat([keyPair[1]]);
    }, iterativeKeys);
};
/**
 * Encryption
 * @param plainText
 * @param masterKey
 */
exports.encrypt = (plainText, masterKey) => {
    const message = [...plainText];
    const roundKeys = exports.deployKeys(masterKey);
    return roundKeys.reduce((acc, val, ind) => {
        const curriedTransformationS = utils_1.curryTwoFlip(exports.transformationS)(exports.blocksS);
        return ind === 9
            ? exports.transformationX(acc, roundKeys[ind])
            : utils_1.pipe(exports.transformationX, curriedTransformationS, exports.transformationL)(acc, roundKeys[ind]);
    }, message);
};
/**
 * Decryption
 * @param cypherText
 * @param masterKey
 */
exports.decrypt = (cypherText, masterKey) => {
    const message = [...cypherText];
    const roundKeys = exports.deployKeys(masterKey);
    return roundKeys.reduceRight((acc, val, ind) => {
        const curriedTransformationS = utils_1.curryTwoFlip(exports.transformationS)(exports.invBlocksS);
        return ind === 0
            ? exports.transformationX(acc, roundKeys[ind])
            : utils_1.pipe(exports.transformationX, exports.invTransformationL, curriedTransformationS)(acc, roundKeys[ind]);
    }, message);
};
