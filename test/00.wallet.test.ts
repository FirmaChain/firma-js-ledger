import { expect } from 'chai';

import TransportHID from "@ledgerhq/hw-transport-node-hid";
import { FirmaWebLedgerWallet } from "../sdk/FirmaLedgerWallet";

describe('[00. Wallet Test]', () => {

	it('LedgerWallet getAddress', async () => {
		let webLedgerWallet = new FirmaWebLedgerWallet(TransportHID);

		let address = await webLedgerWallet.getAddress();
		console.log(address);
	});
});