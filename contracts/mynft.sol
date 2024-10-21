// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract MyNFT is ERC721URIStorage, Ownable(msg.sender) {

    uint public price = 100000000000000000;
    uint256 public tokenCounter = 0;
    mapping(address => uint256) public addressToTokenId;
    
    constructor() ERC721("Ryno NFT", "RYD") {}

    function mintNFT(address recipient, string memory tokenURI) public payable returns(uint256)
    {
        tokenCounter = tokenCounter + 1;
        _mint(recipient, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
        addressToTokenId[msg.sender] = tokenCounter;
        return tokenCounter;
    }

    function viewTokenCounter() public view returns(uint){
        return tokenCounter;
    }

    function withdrawAll() external payable onlyOwner {
        uint256 balance = address(this).balance;
        uint256 balanceOne = balance;
        ( bool transferOne, ) = payable(0xd5AFC45D9b5AAA56923A33419C63C04032fFB6D9).call{value: balanceOne}("");
        require(transferOne, "Transfer failed.");
    }
}