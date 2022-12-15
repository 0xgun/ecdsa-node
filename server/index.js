const secp = require("ethereum-cryptography/secp256k1");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
    "0454a25b2b8d83dd00943ca35d0c4a92634a9012d0a08414d107f9b35cbea2eea8204a4d077cbc12940143d582bce2bd799ef40aa99f11209df78691d5ae8154e1": 100,
    "049b7e1c6b8b59c352790b3577085f3594f872103e1aea3d90c9b9ae18cc93648a2e417e08c16b2b66d4342256bf2a5e92945d8d825b32554dc01ca66cbbbdbc1a": 50,
    "04459896377c710e5303b6518d669f5e18242f2592d3cc7f66fcbb1b5f2ec8c321dd8ac74f2cdb22c40cd1110795eed66bac3d5057503991ebcecf0a367de05c8a": 75,
};

app.get("/balance/:publicKey", (req, res) => {
    const { publicKey } = req.params;
    const balance = balances[publicKey] || 0;
    res.send({ balance });
});

app.post("/send", (req, res) => {
    const { sender, messageHex, signTransactionHex, recipient, amount } =
        req.body;

    setInitialBalance(sender);
    setInitialBalance(recipient);

    const isSigned = secp.verify(signTransactionHex, messageHex, sender);

    if (isSigned) {
        if (balances[sender] < amount) {
            res.status(400).send({ message: "Not enough funds!" });
        } else {
            balances[sender] -= amount;
            balances[recipient] += amount;
            res.send({
                balance: balances[sender],
                message: "Transaction Completed!",
            });
        }
    } else {
        res.status(400).send({
            message: "Transaction is not signed by this sender public key.",
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
