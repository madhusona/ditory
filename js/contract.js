if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
   
} else {
    
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/"));
    
}




window.ethereum.enable();
//web3.eth.defaultAccount = '0x57054C1C6BA9b9cAdCb8AA5D7aB06FDd8EC1A8c1';
web3.eth.defaultAccount =web3.eth.accounts[0]
const myContract = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_no",
				"type": "uint256"
			},
			{
				"name": "_certificatehash",
				"type": "string"
			}
		],
		"name": "setCertificate",
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
		"name": "certificateAccts",
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
		"inputs": [
			{
				"name": "_no",
				"type": "uint256"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
], '0x85573a2afd73a062104892B2c0583F2f98eDA06A', {

gasPrice: '20000000000' 
});

//console.log(myContract.methods.getCertificate(1).call());
