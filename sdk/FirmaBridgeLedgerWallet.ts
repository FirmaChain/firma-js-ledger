export interface LedgerWalletInterface {
  getAddress(): Promise<string>;
  sign(message: string): Promise<Uint8Array>;
  getPublicKey(): Promise<Uint8Array>;
  getAddressAndPublicKey(): Promise<{ address: string, publicKey: Uint8Array }>;
  showAddressOnDevice(): Promise<void>;
}

export type getAddressAndPublicKeyCallbackType = () => Promise<{ address: string, publicKey: Uint8Array }>;
export type getAddressCallbackType = () => Promise<string>;
export type signCallbackType = (message: string) => Promise<Uint8Array>;
export type getPublicKeyCallbackType = () => Promise<Uint8Array>;
export type showAddressOnDeviceCallbackType = () => void;

export class FirmaBridgeLedgerWallet implements LedgerWalletInterface {

  private getAddressAndPublicKeyCallback: getAddressAndPublicKeyCallbackType | undefined;
  private getAddressCallback: getAddressCallbackType | undefined;
  private signCallback: signCallbackType | undefined;
  private getPublicKeyCallback: getPublicKeyCallbackType | undefined;
  private showAddressOnDeviceCallback: showAddressOnDeviceCallbackType | undefined;

  async registerGetAddressAndPublicKeyCallback(callback: getAddressAndPublicKeyCallbackType) {
    this.getAddressAndPublicKeyCallback = callback;
  }

  async registerGetAddressCallback(callback: getAddressCallbackType) {
    this.getAddressCallback = callback;
  }

  async registerGetSignCallback(callback: signCallbackType) {
    this.signCallback = callback;
  }

  async registerGetPublicKeyCallback(callback: getPublicKeyCallbackType) {
    this.getPublicKeyCallback = callback;
  }

  async registerShowAddressOnDevice(callback: showAddressOnDeviceCallbackType) {
    this.showAddressOnDeviceCallback = callback;
  }

  async showAddressOnDevice() {
    this.showAddressOnDeviceCallback!();
  }

  async getPublicKey(): Promise<Uint8Array> {
    return await this.getPublicKeyCallback!();
  }

  async getAddressAndPublicKey(): Promise<{ address: string, publicKey: Uint8Array }> {
    return await this.getAddressAndPublicKeyCallback!();
  }

  async getAddress(): Promise<string> {
    return await this.getAddressCallback!();
  }

  async sign(message: string): Promise<Uint8Array> {
    return await this.signCallback!(message);
  }
}