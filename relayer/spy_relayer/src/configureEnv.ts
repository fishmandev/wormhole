import { ChainId } from "@certusone/wormhole-sdk";
import { setDefaultWasm } from "@certusone/wormhole-sdk/lib/cjs/solana/wasm";
import * as helpers from "./helpers";
import { logger } from "./helpers";

export type RelayerEnvironment = {
  supportedChains: ChainConfigInfo[];
};

export type ChainConfigInfo = {
  chainId: ChainId;
  chainName: string;
  nodeUrl: string;
  tokenBridgeAddress: string;
  bridgeAddress?: string;
  walletPrivateKey: string;
  terraName: string;
  terraChainId: string;
  terraCoin: string;
  terraGasPriceUrl: string;
  wrappedAsset: string;
};

export var env: RelayerEnvironment;

//Polygon is not supported on local Tilt network atm.
export function loadChainConfig(): boolean {
  setDefaultWasm("node");

  try {
    const supportedChains: ChainConfigInfo[] = [];
    configSol(supportedChains);
    configEth(supportedChains);
    configTerra(supportedChains);
    configBsc(supportedChains);

    if (supportedChains.length === 0) {
      logger.error("loadChainConfig: no chains are enabled!");
      return false;
    }

    env = { supportedChains: supportedChains };
  } catch (e) {
    logger.error("loadChainConfig: failed to load config: %o", e);
    return false;
  }

  logger.debug(
    "loadChainConfig: loaded " +
      env.supportedChains.length +
      " supported chains"
  );
  return true;
}

function configEth(supportedChains: ChainConfigInfo[]) {
  if (!process.env.ETH_NODE_URL) return;

  if (!process.env.ETH_PRIVATE_KEY) {
    throw "Missing environment variable ETH_PRIVATE_KEY";
  }
  if (!process.env.ETH_TOKEN_BRIDGE_ADDRESS) {
    throw "Missing environment variable ETH_TOKEN_BRIDGE_ADDRESS";
  }
  if (!process.env.ETH_WRAPPED_ASSET) {
    throw "Missing environment variable ETH_WRAPPED_ASSET";
  }
  if (process.env.ETH_WRAPPED_ASSET.length != 64) {
    throw "Environment variable ETH_WRAPPED_ASSET is invalid, it must be exactly 32 bytes (64 hex digits)";
  }

  logger.info(
    "loaded ETH parameters: chainId: 2, url: [" +
      process.env.ETH_NODE_URL +
      "], privateKey: [" +
      process.env.ETH_PRIVATE_KEY +
      "], tokenBridgeAddress: [" +
      process.env.ETH_TOKEN_BRIDGE_ADDRESS +
      "], wrappedAsset: [" +
      process.env.ETH_WRAPPED_ASSET +
      "]"
  );

  supportedChains.push({
    chainId: 2,
    chainName: "ETH",
    nodeUrl: process.env.ETH_NODE_URL,
    walletPrivateKey: process.env.ETH_PRIVATE_KEY,
    tokenBridgeAddress: process.env.ETH_TOKEN_BRIDGE_ADDRESS,
    terraName: "",
    terraChainId: "",
    terraCoin: "",
    terraGasPriceUrl: "",
    wrappedAsset: process.env.ETH_WRAPPED_ASSET,
  });
}

function configBsc(supportedChains: ChainConfigInfo[]) {
  if (!process.env.BSC_NODE_URL) return;

  if (!process.env.BSC_PRIVATE_KEY) {
    throw "Missing environment variable BSC_PRIVATE_KEY";
  }
  if (!process.env.BSC_TOKEN_BRIDGE_ADDRESS) {
    throw "Missing environment variable BSC_TOKEN_BRIDGE_ADDRESS";
  }
  if (!process.env.BSC_WRAPPED_ASSET) {
    throw "Missing environment variable BSC_WRAPPED_ASSET";
  }
  if (process.env.BSC_WRAPPED_ASSET.length != 64) {
    throw "Environment variable BSC_WRAPPED_ASSET is invalid, it must be exactly 32 bytes (64 hex digits)";
  }

  logger.info(
    "loaded BSC parameters: chainId: 4, url: [" +
      process.env.BSC_NODE_URL +
      "], privateKey: [" +
      process.env.BSC_PRIVATE_KEY +
      "], tokenBridgeAddress: [" +
      process.env.BSC_TOKEN_BRIDGE_ADDRESS +
      "], wrappedAsset: [" +
      process.env.BSC_WRAPPED_ASSET +
      "]"
  );

  supportedChains.push({
    chainId: 4,
    chainName: "BSC",
    nodeUrl: process.env.BSC_NODE_URL,
    walletPrivateKey: process.env.BSC_PRIVATE_KEY,
    tokenBridgeAddress: process.env.BSC_TOKEN_BRIDGE_ADDRESS,
    terraName: "",
    terraChainId: "",
    terraCoin: "",
    terraGasPriceUrl: "",
    wrappedAsset: process.env.BSC_WRAPPED_ASSET,
  });
}

function configSol(supportedChains: ChainConfigInfo[]) {
  if (!process.env.SOL_NODE_URL) return;

  if (!process.env.SOL_PRIVATE_KEY) {
    throw "Missing environment variable SOL_PRIVATE_KEY";
  }
  if (!process.env.SOL_TOKEN_BRIDGE_ADDRESS) {
    throw "Missing environment variable SOL_TOKEN_BRIDGE_ADDRESS";
  }
  if (!process.env.SOL_BRIDGE_ADDRESS) {
    throw "Missing environment variable SOL_BRIDGE_ADDRESS";
  }

  logger.info(
    "loaded SOL parameters: chainId: 1, url: [" +
      process.env.SOL_NODE_URL +
      "], privateKey: [" +
      process.env.SOL_PRIVATE_KEY +
      "], tokenBridgeAddress: [" +
      process.env.SOL_TOKEN_BRIDGE_ADDRESS +
      "], solBridgeAddress: [" +
      process.env.SOL_BRIDGE_ADDRESS +
      "]"
  );

  supportedChains.push({
    chainId: 1,
    chainName: "SOL",
    nodeUrl: process.env.SOL_NODE_URL,
    walletPrivateKey: process.env.SOL_PRIVATE_KEY,
    tokenBridgeAddress: process.env.SOL_TOKEN_BRIDGE_ADDRESS,
    bridgeAddress: process.env.SOL_BRIDGE_ADDRESS,
    terraName: "",
    terraChainId: "",
    terraCoin: "",
    terraGasPriceUrl: "",
    wrappedAsset: "",
  });
}

function configTerra(supportedChains: ChainConfigInfo[]) {
  if (!process.env.TERRA_NODE_URL) return;

  if (!process.env.TERRA_PRIVATE_KEY) {
    throw "Missing environment variable TERRA_PRIVATE_KEY";
  }
  if (!process.env.TERRA_TOKEN_BRIDGE_ADDRESS) {
    throw "Missing environment variable TERRA_TOKEN_BRIDGE_ADDRESS";
  }
  if (!process.env.TERRA_NAME) {
    throw "Missing environment variable TERRA_NAME";
  }
  if (!process.env.TERRA_CHAIN_ID) {
    throw "Missing environment variable TERRA_CHAIN_ID";
  }
  if (!process.env.TERRA_COIN) {
    throw "Missing environment variable TERRA_COIN";
  }
  if (!process.env.TERRA_TOKEN_BRIDGE_ADDRESS) {
    throw "Missing environment variable TERRA_TOKEN_BRIDGE_ADDRESS";
  }
  if (!process.env.TERRA_GAS_PRICES_URL) {
    throw "Missing environment variable TERRA_GAS_PRICES_URL";
  }

  logger.info(
    "loaded TER parameters: chainId: 3, url: [" +
      process.env.TERRA_NODE_URL +
      "], privateKey: [" +
      process.env.TERRA_PRIVATE_KEY +
      "], tokenBridgeAddress: [" +
      process.env.TERRA_TOKEN_BRIDGE_ADDRESS +
      "], terraName: [" +
      process.env.TERRA_NAME +
      "], terraChainId: [" +
      process.env.TERRA_CHAIN_ID +
      "], coin: [" +
      process.env.TERRA_COIN +
      "], gasPricesUrl: [" +
      process.env.TERRA_GAS_PRICES_URL +
      "]"
  );

  supportedChains.push({
    chainId: 3,
    chainName: "TERRA",
    nodeUrl: process.env.TERRA_NODE_URL,
    walletPrivateKey: process.env.TERRA_PRIVATE_KEY,
    tokenBridgeAddress: process.env.TERRA_TOKEN_BRIDGE_ADDRESS,
    terraName: process.env.TERRA_NAME,
    terraChainId: process.env.TERRA_CHAIN_ID,
    terraCoin: process.env.TERRA_COIN,
    terraGasPriceUrl: process.env.TERRA_GAS_PRICES_URL,
    wrappedAsset: "",
  });
}
// Listener should check supported target chains, and log that it's dropping something that's not supported.