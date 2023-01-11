import React, { useState } from "react";
import Web3 from "web3";
require('dotenv').config();
//const Tx = require('@ethereumjs/tx');

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
    //const [tokenAddress, setTokenAddress]   = useState("");
    //UTHMToken contract address
    const tokenAddress = "0x49DaB8F930F8e3Ee4F722d939F5B20Cf981Bd031";

    //transfer eth from one account to other
    async function transfer(){

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    //web3.eth.wallet.add('e9f79d11f48c68b19ea2e1e9db852e7770ceb265547bb8f0af01698d9a358445');

    console.log("Account : " + account)
     window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        console.log(accounts[0])
       });

       
        //get nonce
        const nonce = await web3.eth.getTransactionCount(Account, "latest");
        //convert Eth to wei
        const value = web3.utils.toWei(transferAmount.toString(), 'Ether');
        //change your token's abi here
        const abi = [
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "cap",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "reward",
                  "type": "uint256"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Approval",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Transfer",
              "type": "event"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
                }
              ],
              "name": "allowance",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "approve",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "balanceOf",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "blockReward",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "burn",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "burnFrom",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "cap",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "decimals",
              "outputs": [
                {
                  "internalType": "uint8",
                  "name": "",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "subtractedValue",
                  "type": "uint256"
                }
              ],
              "name": "decreaseAllowance",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "addedValue",
                  "type": "uint256"
                }
              ],
              "name": "increaseAllowance",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "name",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address payable",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "reward",
                  "type": "uint256"
                }
              ],
              "name": "setBlockReward",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "symbol",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "totalSupply",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "transfer",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "transferFrom",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ];

        const tokenContract = new web3.eth.Contract(abi,tokenAddress);

        const data = tokenContract.methods.transfer(receiverAddress,value).encodeABI();

        //prepare transaction. fields - to, value, gasPrice, gasLimit, nonce
        const transaction = {
            'to': tokenAddress,
            'value':  "0x00", //used only for eth transfer else 0
            'gasLimit': web3.utils.toHex(2100000), //changed after EIP-1559 upgrade 6721975
            'gasPrice': web3.utils.toHex(web3.utils.toWei('6', 'gwei')), //changed after EIP-1559 upgrade 20000000000
            'nonce': nonce,
            'data': data //transaction data
        }

        //create signed transaction
        const signTrx = await web3.eth.accounts.signTransaction(transaction, PrivateKey);
        // const privateKey1 = Buffer.from(PrivateKey, 'hex')
        // const signTrx = await web3.eth.accounts.signTransaction(transaction, privateKey1);

        // Sign the transaction
        // const tx = new Tx(transaction);
        // tx.sign(privateKey1);

        // const serializedTx = tx.serialize();
        // const rawTransaction = '0x' + serializedTx.toString('hex');

        
        //send signed transaction
        web3.eth.sendSignedTransaction(signTrx.rawTransaction, function(error, hash){
        //web3.eth.sendSignedTransaction(rawTransaction, function(error, hash){
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
                <img src="../logo-uthm-web.png" alt="..." width="400" height="100"></img>
                <h1>UTHMToken Transfer</h1>
            </div>
            {/* <br/>
            
           <div style={{fontSize:"1.2rem"}}>
                Token Address :
            </div>
            <div>
                <input
                    type="text"
                    style={{height:"1.5vw", width:"30vw"}}
                    onChange={(event) =>
                        setTokenAddress(event.target.value)
                    }
                    placeholder="0x0000....."
                />
            </div> */}
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
                        //setTokenAddress("0x49DaB8F930F8e3Ee4F722d939F5B20Cf981Bd031")
                    }
                    placeholder="0.0" 
                /> UTHMToken
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