Lisk HD Key
=====

Key Derivation for Lisk coin
------------

[SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) - Specification

Installation
------------

    npm i --save lisk-hd-key


Usage
-----

**example:**

```js
const { getDerivedPathData, getMasterKeyFromSeed } = require('lisk-hd-key');
const bip39 = require('bip39');

const seed = bip39.generateMnemonic();
console.log(seed);
// => sunny settle rent arrive coast emotion twice outdoor erupt scale once reason

const hexSeed = bip39.mnemonicToSeedHex(seed);
console.log(hexSeed);
// => 18e48e187b700d4596983f2efaf64f63c31ff13b4537abea1157bdf45c1fc9e5c5d8a817048616d24dcd0b7ae638df786cec2dc0749f6847724905988ae56b0e

const { key, chainCode } = getMasterKeyFromSeed(hexSeed);
console.log(key.toString('hex'), chainCode.toString('hex'));
// => eaeedf945650419e6b4aeddf31209ba1239e42caf924e03fdc5fe14ba84dc5ff
// => 55bddb0fb8273f603eee5e2f8727628848039013a5a00ef6a425385c8d1a7eaf

const path = "m/44'/134'/0'/0'";
const data = getDerivedPathData(path, hexSeed);
console.log(data);
// =>
// {
//    path: 'm/44\'/134\'/0\'/0\'',
//    privateKey: 'b28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a219a51f1f85e894c612d65daf43996e843b665e5db622d57657ab842dd7efc8bcb',
//    publicKey: '9a51f1f85e894c612d65daf43996e843b665e5db622d57657ab842dd7efc8bcb',
//    address: '8963080315629587796L'
//  }

```
Tests
-----
```
npm test
```

References
----------
[SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md)

[BIP-0032](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

[BIP-0044](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)