import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { BigNumber, ethers, utils } from "ethers";
import { Interface } from "ethers/lib/utils";
import { DataBaseService } from "src/modules/database/database.service";

@Injectable()
export class CrawlerArbService {
  private fromBlock: number = 57638503;
  constructor(private configService: ConfigService, private databaseService: DataBaseService) {
    // this.getLogs(57638503, 57638503);
    // this.getLastBlockNumber();
  }

  toHexNumber(number: number) {
    const str = BigNumber.from(number).toHexString();
    return str.trim().replace(/^0x([0]+)(.*)/, '0x$2');
  }

  async getLastBlockNumber(): Promise<number> {
    const rs = await this.requestBlockChainByAxios(
      [],
      'eth_blockNumber',
      this.configService.get('arb_grpc', 'https://virulent-clean-snowflake.arbitrum-goerli.quiknode.pro/8605aa5a72bf9a507a88ea2d5c58c0952315b1d9')
    );
    return parseInt(rs, 16);
  }

  async loadBlock() {
    const lastBlockNumber = await this.getLastBlockNumber();
    console.log('load block', lastBlockNumber);
    while (true) {
      try {
        const toBlock = Math.min(this.fromBlock + 5, lastBlockNumber);
        await this.getLogs(this.fromBlock, toBlock);
        this.fromBlock = toBlock;
        if (lastBlockNumber <= this.fromBlock) {
          break;
        }
      } catch (error) {
        console.log('error', error);
        break;
      }
    }
  }

  // 57638503

  async requestBlockChainByAxios(params: any[], method: string, url: string) {
    const raw = JSON.stringify({
      "method": method,
      "params": params,
      "id": Math.round(Math.random() * 50) + Math.round(Math.random() * 50),
      "jsonrpc": "2.0"
    });
    const res = await axios({
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: raw,
    })
    const logs = res.data?.result;
    return logs;
  }

  async getLogs(from: number, to: number) {
    const eventInterfaces = [`OwnershipTransferred(address,address)`];
    const inter: Interface = new ethers.utils.Interface(JSON.stringify([{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]))
    console.log('load from block', from, to);
    const logs = await this.requestBlockChainByAxios(
      [
        {
          "fromBlock": this.toHexNumber(from),
          "toBlock": this.toHexNumber(to),
          "topics": eventInterfaces.map((e) => utils.id(e)),
        }
      ],
      'eth_getLogs',
      this.configService.get('arb_grpc', 'https://virulent-clean-snowflake.arbitrum-goerli.quiknode.pro/8605aa5a72bf9a507a88ea2d5c58c0952315b1d9')
    );


    for (const log of logs) {
      try {
        const logDescription = inter.parseLog(log);
        await this[`handler${logDescription.name}`](logDescription.args);
      } catch (error) {

      }
    }

  }

  async handlerOwnershipTransferred(args: string[]) {
    console.log('args: ', args);
  }
}