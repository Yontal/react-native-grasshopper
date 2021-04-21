# react-native-grasshopper

Grasshopper GOST 3412-2015 ECB implementation with TypeScript for react native

## Installation


### npm

```sh
npm install react-native-grasshopper
```

## Usage

```js
import { decryptString, encryptString, generateKey } from 'react-native-grasshopper'

const key = generateKey()
const message = 'Hello World!'

const encrypted = encryptString(message, key)
const decrypted = decryptString(encrypted, key)
```
