if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
   
} else {
    
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/"));
    
}





web3.eth.defaultAccount = web3.eth.accounts[0];
const myContract = new web3.eth.Contract([
{
"constant": false,
"inputs": [
    {
        "name": "CI",
        "type": "uint256"
    },
    {
        "name": "UI",
        "type": "uint256"
    },
    {
        "name": "i",
        "type": "address"
    },
    {
        "name": "CH",
        "type": "string"
    }
],
"name": "createCertificate",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [
    {
        "name": "",
        "type": "uint256"
    }
],
"name": "certificates",
"outputs": [
    {
        "name": "",
        "type": "uint256"
    }
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "getAllCertificates",
"outputs": [
    {
        "name": "",
        "type": "uint256[]"
    }
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [
    {
        "name": "CI",
        "type": "uint256"
    }
],
"name": "getCertificate",
"outputs": [
    {
        "name": "UI",
        "type": "uint256"
    },
    {
        "name": "i",
        "type": "address"
    },
    {
        "name": "CH",
        "type": "string"
    }
],
"payable": false,
"stateMutability": "view",
"type": "function"
}
], '0x701e9d6781e8e53ce24d19c31c64f4fc821951fa', {

gasPrice: '20000000000' 
});

//console.log(myContract.methods.getCertificate(1).call());