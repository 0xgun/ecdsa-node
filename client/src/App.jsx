import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
    const [balance, setBalance] = useState(0);
    const [transactionData, setTransactionData] = useState({
        publicKey: "",
        messageHex: "",
        signTransactionHex: "",
    });

    return (
        <div className="app">
            <Wallet
                balance={balance}
                setBalance={setBalance}
                transactionData={transactionData}
                setTransactionData={setTransactionData}
            />
            <Transfer
                setBalance={setBalance}
                transactionData={transactionData}
                setTransactionData={setTransactionData}
            />
        </div>
    );
}

export default App;
