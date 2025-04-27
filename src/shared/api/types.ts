type CheckUserReq = {
  address: string;
};

type CreateUserReq = {
  eth_address: `0x${string}` | undefined;
  signature: string;
  message: string;
};

export type { CheckUserReq, CreateUserReq };
