import { expect } from 'chai';

import TransportHID from "@ledgerhq/hw-transport-node-hid";
import { FirmaWebLedgerWallet } from "../sdk/FirmaLedgerWallet";

describe('[00. Wallet Test]', () => {

	it('LedgerWallet getAddress', async () => {
		let webLedgerWallet = new FirmaWebLedgerWallet(TransportHID);

		//LedgerWallet getAddress:
		//AssertionError: expected '' to equal 'firma14urz73du63l7xz2dnagef2x7k2facdqar5fjfe'

		// need to check 27404 status code
		let address = await webLedgerWallet.getAddress();

		// dev ledger has always same mnemonic,
		expect(address).to.equal("firma14urz73du63l7xz2dnagef2x7k2facdqar5fjfe");
	});

	it('LedgerWallet getAddressAndPublicKey', async () => {
		let webLedgerWallet = new FirmaWebLedgerWallet(TransportHID);

		//LedgerWallet getAddress:
		//AssertionError: expected '' to equal 'firma14urz73du63l7xz2dnagef2x7k2facdqar5fjfe'

		// need to check 27404 status code
		let data = await webLedgerWallet.getAddressAndPublicKey();
		var b64 = Buffer.from(data.publicKey).toString('base64');

		// dev ledger has always same mnemonic,
		expect(data.address).to.equal("firma14urz73du63l7xz2dnagef2x7k2facdqar5fjfe");
		expect(b64).to.equal("AlZuUB4U3ikZMROCo3uzG9oTJhKqLLmtR9mxneBcysIQ");
	});

	it('LedgerWallet getPubKey', async () => {
		let webLedgerWallet = new FirmaWebLedgerWallet(TransportHID);

		let pubkey = await webLedgerWallet.getPublicKey();
		var b64 = Buffer.from(pubkey).toString('base64');

		// dev ledger has always same mnemonic,
		expect(b64).to.equal("AlZuUB4U3ikZMROCo3uzG9oTJhKqLLmtR9mxneBcysIQ");
	});

	it('LedgerWallet showAddressOnDevice', async () => {

		// no feedback from ledger device. just trust device output.
		let webLedgerWallet = new FirmaWebLedgerWallet(TransportHID);
		await webLedgerWallet.showAddressOnDevice();
	});

	it('LedgerWallet sign', async () => {

		let webLedgerWallet = new FirmaWebLedgerWallet(TransportHID);

		let testMessage = '{"account_number":"3211","chain_id":"colosseum-1","fee":{"amount":[{"amount":"200000","denom":"ufct"}],"gas":"200000"},"memo":"","msgs":[{"type":"cosmos-sdk/MsgSend","value":{"amount":[{"amount":"1000000","denom":"ufct"}],"from_address":"firma14urz73du63l7xz2dnagef2x7k2facdqar5fjfe","to_address":"firma1epg9kx7nqz32dykj23p6jreqfh5x0wdy5a43qc"}}],"sequence":"36"}';

		let result = await webLedgerWallet.sign(testMessage);
		var b64 = Buffer.from(result).toString('base64');

		expect(b64).to.equal("rKpq85Z325qeS4YZdDcLZfYV/ISaM8gu2p40q1wxTooI4qojpxw2aoEysFdCEp73+TfgzdOOnuJYKwMpSg10vA==");
	});
});