"use strict";
import { Buffer } from 'buffer'
import { TextEncoder } from 'text-encoding'
Object.defineProperty(exports, "__esModule", { value: true });
const grasshopper_1 = require("./grasshopper");
/**
 * Curries a function with two arguments and flip them
 * @param fn
 */
exports.curryTwoFlip = (fn) => (b) => (a) => fn(a, b);
/**
 * Performs left-to-right function composition
 * @param fn1
 * @param fns
 */
exports.pipe = (fn1, ...fns) => {
    const piped = fns.reduce((prevFn, nextFn) => (value) => nextFn(prevFn(value)), value => value);
    return (...args) => piped(fn1(...args));
};
/**
 * Converts a hexadecimal string to an array of 8-bit unsigned integer values
 * @param hexString
 */
exports.parseHexStringToBuffer = (hexString) => {
    const list = hexString.match(/.{1,2}/g);
    return list ? list.map(s => Number(`0x${s}`)) : [];
};
/**
 * Converts Utf-8 string to array of 8-bit unsigned integer values
 * @param utf8String
 */
exports.utf8ToBuffer = (utf8String) => {
    const textEncoder = new TextEncoder();
    const buffer = textEncoder.encode(utf8String);
    return Array.from(buffer);
};
/**
 * Complements message to block's length
 * @param buffer
 */
exports.complementMessage = (buffer) => {
    const mapping = (_, ind) => (ind === 0 ? 128 : 0);
    const lengthModulo = buffer.length % 16;
    return lengthModulo === 0
        ? buffer.concat(Array(16)
            .fill(0)
            .map(mapping))
        : buffer.concat(Array(16 - lengthModulo)
            .fill(0)
            .map(mapping));
};
/**
 * Truncates padded bits
 * @param buffer
 */
exports.truncateMessage = (buffer) => {
    const index = buffer.lastIndexOf(128);
    return buffer.slice(0, index);
};
/**
 * Converts Utf-8 string to Base-64 string
 * @param utf8String
 */
exports.utf8ToBase64 = (utf8String) => Buffer.from(utf8String).toString('base64');
/**
 * Converts Base-64 string to Utf-8 string
 * @param base64String
 */
exports.base64ToUtf8 = (base64String) => Buffer.from(base64String, 'base64').toString();
/**
 * Converts array of 8-bit unsigned integer values to Base-64 string
 * @param buffer
 */
exports.bufferToBase64 = (buffer) => Buffer.from(buffer).toString('base64');
/**
 * Converts Base-64 string to array of 8-bit unsigned integer values
 * @param base64String
 */
exports.base64ToBuffer = (base64String) => Array.from(Buffer.from(base64String, 'base64'));
/**
 * Split message to 128-bit chunks
 * @param buffer
 */
exports.splitMessage = (buffer) => {
    const chunksNumber = Math.floor(buffer.length / 16);
    return Array(chunksNumber)
        .fill(0)
        .map((val, ind) => buffer.slice(ind * 16, (ind + 1) * 16));
};
/**
 * Joins 128-bit chunks into message
 * @param buffers
 */
exports.joinMessage = (buffers) => buffers.flat();
/**
 * Encrypts Utf-8 string message and returns encrypted message in Base-64
 * @param message Utf-8 string
 * @param masterKey Base-64 string
 *
 */
exports.encryptString = (message, masterKey) => {
    const masterKeyBuffer = exports.base64ToBuffer(masterKey);
    const curriedEncrypt = exports.curryTwoFlip(grasshopper_1.encrypt)(masterKeyBuffer);
    const complemented = exports.pipe(exports.utf8ToBuffer, exports.complementMessage)(message);
    const split = exports.splitMessage(complemented);
    const encrypted = split.map(curriedEncrypt);
    const joined = exports.joinMessage(encrypted);
    return exports.bufferToBase64(joined);
};
/**
 * Decrypts encrypted message in Base-64 and returns Utf-8 string message
 * @param message Base-64 string
 * @param masterKey Base-64 string
 */
exports.decryptString = (message, masterKey) => {
    const masterKeyBuffer = exports.base64ToBuffer(masterKey);
    const curriedDecrypt = exports.curryTwoFlip(grasshopper_1.decrypt)(masterKeyBuffer);
    const buffer = exports.base64ToBuffer(message);
    const split = exports.splitMessage(buffer);
    const decrypted = split.map(curriedDecrypt);
    const truncated = exports.pipe(exports.joinMessage, exports.truncateMessage)(decrypted);
    return exports.pipe(exports.bufferToBase64, exports.base64ToUtf8)(truncated);
};
/**
 * Generates 256-bit masterKey in Base-64
 */
exports.generateKey = () => {
    const buffer = Array(32)
        .fill(0)
        .map(v => Math.floor(Math.random() * 255));
    return exports.bufferToBase64(buffer);
};
