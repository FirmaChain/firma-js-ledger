export interface LedgerWalletInterface {
  getAddress(): Promise<string>;
  sign(message: string): Promise<Uint8Array>;
  getPublicKey(): Promise<Uint8Array>;
  showAddressOnDevice(): Promise<void>;
}

export type getAddressCallbackType = () => Promise<string>;
export type signCallbackType = (message: string) => Promise<Uint8Array>;
export type getPublicKeyCallbackType = () => Promise<Uint8Array>;
export type showAddressOnDeviceCallbackType = () => void;

export class FirmaBridgeLedgerWallet implements LedgerWalletInterface {

  private getAddressCallback: getAddressCallbackType | undefined;
  private signCallback: signCallbackType | undefined;
  private getPublicKeyCallback: getPublicKeyCallbackType | undefined;
  private showAddressOnDeviceCallback: showAddressOnDeviceCallbackType | undefined;

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
    return this.getPublicKeyCallback!();
  }

  async getAddress(): Promise<string> {
    return this.getAddressCallback!();
  }

  async sign(message: string): Promise<Uint8Array> {
    return this.signCallback!(message);
  }
}