import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";
import secp from "ethereum-cryptography/secp256k1.js";

const PRIVATE_KEY =
    "df87cd899d86aeddba5ebedd5f961d2973b199e8434cbb309bf038a867f5a43e";

const messageHash = keccak256(utf8ToBytes(""));
console.log(`Message Hash: ${toHex(messageHash)}`);

const [signTransaction, recoveryBit] = await secp.sign(
    messageHash,
    PRIVATE_KEY,
    {
        recovered: true,
    }
);
console.log(`Sign Transaction: ${toHex(signTransaction)}`);

// const publicKey = secp.recoverPublicKey(
//     messageHash,
//     signTransaction,
//     recoveryBit
// );
// console.log(`Public key: ${toHex(publicKey)}`);

// const isSigned = secp.verify(signTransaction, messageHash, publicKey);
// console.log(`Is Signed: ${isSigned}`);
