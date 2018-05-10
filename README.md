
  
Lisk HD Key  
============  
[![npm version](https://badge.fury.io/js/%40lisk-builders%2Flisk-hd-key.svg)](https://badge.fury.io/js/%40lisk-builders%2Flisk-hd-key)<br>
A Typescript based module that provides addition functionality for the Key Derivation in the Lisk ecosystem.

Installation
------------

    npm i --save @lisk-builders/lisk-hd-key


Examples
-----

**getPublicKey(path, seed)**
In this example we will get the public key for a Lisk address. The function should get the hexadecimal value of the given BIP39 seed.

`seed`   A 256 bits hexadecimal string.
> 06bae687f0250ab9533be2ac9717ae2a802d69c97d5..

`path`  Derived from [BIP0044](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) we use the same pattern. Extra information on the what and why of the parameter can be found on the given url.

> m / purpose' / coin_type' / account' / change / address_index


**Usage**

```js
const { getPublicKey } = require('lisk-hd-key');

const bip39 = require('bip39');
const path = "m/44'/134'/0'/0'";

// sunny settle rent arrive coast emotion twice outdoor erupt scale once reason
const seed = bip39.generateMnemonic();

// 18e48e187b700d4596983f2efaf64f63c31ff13b4537abea1157bdf45c1fc9e5c5d8a817048616d24dcd0b7ae638df786cec2dc0749f6847724905988ae56b0e
const hexSeed = bip39.mnemonicToSeedHex(seed);

// 9a51f1f85e894c612d65daf43996e843b665e5db622d57657ab842dd7efc8bcb
const publicKey = getPublicKey(path, hexSeed);
```
<br>

**signTransaction( seed, path, transaction )**
In this example we will sign a transaction. Signing a transaction means that nobody can alter the content of the transaction without invalidating your signature.

`seed`  A 256 bits hexadecimal string.
> 06bae687f0250ab9533be2ac9717ae2a802d69c97d5..

`path`  Derived from [BIP0044](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) we use the same pattern. Extra information on the what and why of the parameter can be found on the given url.
  
> m / purpose' / coin_type' / account' / change / address_index  
  
  
`transaction`  
This parameter is a [Lisk transaction object](https://lisk.io/documentation/the-lisk-protocol/transactions). It can have the same properties as a transaction described in the given url.  
  
**Usage**  
  
```js  
const { signTransaction } = require('lisk-hd-key');  
  
const bip39 = require('bip39');  
const path = "m/44'/134'/0'/0'";  
  
const unsignedTransaction = {  
   "amount": "25",  
   "recipientId": "1L",  
    "timestamp": 1525977822,  
    "type": 0,  
    "fee": "20000000",  
    "asset": {  
       "data": "Custom message to show i have signed the transaction."  
    }  
};  
  
// sunny settle rent arrive coast emotion twice outdoor erupt scale once reason  
const seed = bip39.generateMnemonic();  
  
// 18e48e187b700d4596983f2efaf64f63c31ff13b4537abea1157bdf45c1fc9e5c5d8a817048616d24dcd0b7ae638df786cec2dc0749f6847724905988ae56b0e  
const hexSeed = bip39.mnemonicToSeedHex(seed);  
  
/*  
{  
    path: 'm/44\'/134\'/0\'/0\'',  
    privateKey: 'b28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a219a51f1f85e894c612d65daf43996e843b665e5db622d57657ab842dd7efc8bcb',  
    publicKey: '9a51f1f85e894c612d65daf43996e843b665e5db622d57657ab842dd7efc8bcb',  
    address: '8963080315629587796L'  
}  
*/  
const signedTransaction = signTransaction(hexSeed, path, unsignedTransaction)  
```  
  
Tests  
-----  
```  
npm test  
```  
  
References  
----------  
  
 - Universal private key derivation - [SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md)  
 - Hierarchical Deterministic Wallets- [BIP-0032](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)  
 - Multi-Account Hierarchy for Deterministic Wallets - [BIP-0044](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
