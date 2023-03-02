const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();

console.log('privateKey:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log("publicKey:",toHex(publicKey));

const address = "0x"+ toHex(keccak256(publicKey)).slice(-20);

console.log("Address:", address);