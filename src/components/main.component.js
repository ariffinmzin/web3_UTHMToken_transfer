import React, { useState } from "react";
import Web3 from "web3";
require('dotenv').config();

//get .env params
const Account       = process.env.REACT_APP_ACCOUNT;
const PrivateKey    = process.env.REACT_APP_PRIVATE_KEY;
const RpcHttpUrl    = process.env.REACT_APP_RPC_HTTP_URL;
//create web3 connection
const web3          = new Web3(new Web3.providers.HttpProvider(RpcHttpUrl));  

function Main(props){
    //set params
    const [receiverAddress, setReceiverAddress] = useState("");
    const [transferAmount, setTransferAmount]   = useState("");

    //transfer eth from one account to other
    async function transfer(){
        //get nonce
        const nonce = await web3.eth.getTransactionCount(Account, "latest");
        //convert Eth to wei
        const value = web3.utils.toWei(transferAmount.toString(), 'Ether');

        //prepare transaction. fields - to, value, gasPrice, gasLimit, nonce
        const transaction = {
            'to': receiverAddress,
            'value': value,
            'gasLimit': 6721975, //changed after EIP-1559 upgrade
            'gasPrice': 20000000000, //changed after EIP-1559 upgrade
            'nonce': nonce
        }

        //create signed transaction
        const signTrx = await web3.eth.accounts.signTransaction(transaction, PrivateKey);
        //send signed transaction
        web3.eth.sendSignedTransaction(signTrx.rawTransaction, function(error, hash){
            if(error){
                console.log('Something went wrong', error);
            } else{
                console.log('transaction submitted ', hash);
                window.alert('Transaction submitted. Hash : '+hash);
            }
        })
    }

    return(
        <div>
            <br/>
            <div style={{color:"blue", fontSize:"1.5rem"}}>
                Welcome to DappBlocks!
            </div>
            <br/>
            <div style={{fontSize:"1.2rem"}}>
                Send to :
            </div>
            <div>
                <input
                    type="text"
                    style={{height:"1.5vw", width:"30vw"}}
                    onChange={(event) =>
                        setReceiverAddress(event.target.value)
                    }
                    placeholder="0x0000....."
                />
            </div>
            <br/>
            <div style={{fontSize:"1.2rem"}}>
                Amount :
            </div>
            <div>
                <input
                    type="text"
                    style={{height:"1.5vw", width:"5vw"}}
                    onChange={(event) =>
                        setTransferAmount(event.target.value)
                    }
                    placeholder="0.0" 
                /> ETH
            </div>
            <br/>
            <div>
                <button
                    type="submit"
                    onClick={() => transfer()}
                >Send</button>
            </div>
        </div>
    );
}

export default Main;