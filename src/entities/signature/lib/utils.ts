import { ByteArray, recoverMessageAddress, Signature } from 'viem';
import { SignatureResponse } from '../model';

const verifySignature = async (
  message: string,
  signature: `0x${string}` | ByteArray | Signature,
  expectedAddress: string,
): Promise<SignatureResponse> => {
  try {
    const recoveredAddress = await recoverMessageAddress({
      message,
      signature: signature,
    });

    const isValid = expectedAddress.toLowerCase() === recoveredAddress.toLowerCase();

    return { isValid: isValid, recoveredAddress: recoveredAddress };
  } catch (error) {
    console.error('Ошибка проверки подписи:', error);
    throw new Error('Ошибка проверки подписи');
  }
};

export { verifySignature };
