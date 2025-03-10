import { ByteArray, Signature } from 'viem';

type SignatureRequest = {
  message: string;
  signature: `0x${string}` | ByteArray | Signature;
  expectedAddress: string;
};

type SignatureResponse = {
  isValid: boolean;
  recoveredAddress: string;
};

export type { SignatureRequest, SignatureResponse };
