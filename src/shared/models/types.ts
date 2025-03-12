import { abi } from '../api';

type ContractFunctionNames = (typeof abi)[number]['name'];

export type { ContractFunctionNames };
