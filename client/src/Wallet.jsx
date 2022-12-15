import server from "./server";

function Wallet({ transactionData, setTransactionData, balance, setBalance }) {
    async function onChange(evt) {
        const { name, value } = evt.target;

        if (name == "publicKey" && value) {
            const {
                data: { balance },
            } = await server.get(`balance/${value}`);
            setBalance(balance);
        } else if (name == "publicKey" && !value) {
            setBalance(0);
        }

        setTransactionData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Sender Public Key
                <input
                    placeholder="Type an address, for example: 0x1"
                    value={transactionData.publicKey}
                    onChange={onChange}
                    name="publicKey"
                ></input>
            </label>
            <label>
                Message Hex
                <input
                    placeholder="Type an address, for example: 0x1"
                    value={transactionData.messageHex}
                    onChange={onChange}
                    name="messageHex"
                ></input>
            </label>
            <label>
                Sign Transaction Hex
                <input
                    placeholder="Type an address, for example: 0x1"
                    value={transactionData.signTransactionHex}
                    onChange={onChange}
                    name="signTransactionHex"
                ></input>
            </label>

            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
