//	@ghasemkiani/blockchain-info/client

import fetch from "isomorphic-fetch"

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base"

class Client extends Obj {
	async toFetch(path, data) {
		let url = this.url + path;
		if(data) {
			url += "?";
			url += Object.entries(data).map(bi => bi.map(encodeURIComponent).join("=")).join("&");
		}
		let rsp = await fetch(url);
		let json = await rsp.json();
		return json;
	}
	async toGetAddressBalance(address) {
		let json = await this.toFetch(`/rawaddr/${address}`, {offset: 0, limit: 0});
		let balance = json.final_balance * 1e-8;
		return balance;
	}
}
cutil.extend(Client.prototype, {
	url: "https://blockchain.info",
});

export {Client};
