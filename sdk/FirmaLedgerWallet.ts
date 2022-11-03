import { Secp256k1Signature } from "./secp256k1signature";

import CosmosApp from ".";
import { LedgerWalletInterface } from "..";

export class FirmaWebLedgerWallet implements LedgerWalletInterface {

  public constructor(transportHID: any) {
    this.transportHID = transportHID;
  }

  private transportHID: any;
  private cosmosApp: CosmosApp | undefined;
  private path: number[] = [44, 7777777, 0, 0, 0];

  async showAddressOnDevice() {

    try {

      await this.connectLedger();

      const response = await this.cosmosApp!.showAddressAndPubKey(this.path, "firma");
      console.log(response);

      this.closeLedger();

    } catch (error) {
      this.closeLedger();
    }

  }

  async getAddressAndPublicKey(): Promise<{ address: string, publicKey: Uint8Array }> {

    try {
      await this.connectLedger();

      const response = await this.cosmosApp!.getAddressAndPubKey(this.path, "firma");

      this.closeLedger();

      if (response.return_code !== 0x9000) {
        console.log(`Error [${response.return_code}] ${response.error_message}`);
        return { address: "", publicKey: new Uint8Array() };
      }

      console.log(response);
      return { address: response.bech32_address, publicKey: response.compressed_pk };

    } catch (error) {
      this.closeLedger();
      return { address: "", publicKey: new Uint8Array() };
    }
  }


  async getPublicKey(): Promise<Uint8Array> {

    try {

      await this.connectLedger();

      const response1 = await this.cosmosApp!.publicKey(this.path);

      this.closeLedger();

      if (response1.return_code !== 0x9000) {
        throw new Error(`Error [${response1.return_code}] ${response1.error_message}`);
      }

      return response1.compressed_pk;
    } catch (error) {
      this.closeLedger();
      return new Uint8Array();
    }
  }

  public async getAddress(): Promise<string> {

    try {
      await this.connectLedger();

      const response = await this.cosmosApp!.getAddressAndPubKey(this.path, "firma");

      this.closeLedger();

      if (response.return_code !== 0x9000) {
        console.log(`Error [${response.return_code}] ${response.error_message}`);
        return "";
      }

      console.log(response);
      return response.bech32_address;

    } catch (error) {
      this.closeLedger();
      return ""
    }

  }

  private async closeLedger() {
    try {
      this.cosmosApp?.transport.close();
      this.isOpen = false;
    } catch (error) {
      console.log("connect fail : " + error);
      this.isOpen = false;
      throw error;
    }
  }

  private isOpen: boolean = false;

  private async connectLedger() {
    try {

      if (this.isOpen)
        return;

      let transport = await this.transportHID.create();

      if (transport != null) {
        console.log("[Ledger] transport.deviceModel : " + transport.deviceModel!.id);
        console.log("[Ledger] transport.deviceModel : " + transport.deviceModel!.productName);

        this.cosmosApp = new CosmosApp(transport);

        this.isOpen = true;

        console.log("[Ledger] connect success");
      }
    } catch (error) {
      console.log("connect fail : " + error);
      this.isOpen = false;
      throw error;
    }
  }

  async sign(message: string): Promise<Uint8Array> {
    try {

      await this.connectLedger();

      let response = await this.cosmosApp!.sign(this.path, message);
      console.log(response);

      //if(response.signature == null)
      //return new Uint8Array();

      let secp256k1 = Secp256k1Signature.fromDer(response.signature).toFixedLength();
      this.closeLedger();

      return Buffer.from(secp256k1);

    } catch (error) {
      this.closeLedger();
      return new Uint8Array();
    }
  }
}