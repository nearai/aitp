# AITP-05: EVM Wallet

* **Version**: 1.0.0
* **Spec Status**: Draft
* **Implementation Status**: In Development

:::note AI-Generated Documentation
This documentation was generated with the assistance of AI and may need further review and refinement.
:::

## Overview

AITP-05 EVM Wallet enables agents to interact with Ethereum Virtual Machine (EVM) compatible wallets for address information, transaction signing, message signing, and typed data signing. This capability supports multiple EVM networks including Ethereum, Polygon, Arbitrum, Optimism, and others.

## When to Use EVM Wallet Capability

The EVM Wallet capability allows your agent to request a user's Ethereum addresses, have transactions signed by their wallet, sign messages using EIP-191 (personal_sign) or EIP-712 (typed data), and notify wallets about ERC-20 tokens they should be aware of.

Useful for agents that interact with smart contracts, decentralized applications, or need cryptographic verification from users on EVM-compatible blockchains.

## Message Types

### Request Address

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json",
  "request_address": {
    "request_id": "addr_req_12345",
    "description": "Share your Ethereum address to continue",
    "chain_id": 1
  }
}
```

### Address Response

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json",
  "address_response": {
    "request_id": "addr_req_12345",
    "addresses": ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e", "0x8ba1f109551bD432803012645Ac136ddd64DBA72"]
  }
}
```

### Request Transaction Signing

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json",
  "request_transaction": {
    "request_id": "tx_req_67890",
    "description": "Sign transaction to mint NFT",
    "chain_id": 1,
    "transaction": {
      "to": "0x1234567890123456789012345678901234567890",
      "from": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      "data": "0xa9059cbb000000000000000000000000742d35cc6634c0532925a3b844bc454e4438f44e0000000000000000000000000000000000000000000000000de0b6b3a7640000",
      "value": "0x0",
      "gas": "0x5208",
      "gasPrice": "0x3b9aca00",
      "nonce": "0x1",
      "maxFeePerGas": "0x3b9aca00",
      "maxPriorityFeePerGas": "0x3b9aca00",
      "accessList": []
    }
  }
}
```

### Transaction Response

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json",
  "transaction_response": {
    "request_id": "tx_req_67890",
    "transaction_hash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
  }
}
```

### Request Message Signing

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json",
  "request_message_signing": {
    "request_id": "msg_req_24680",
    "description": "Sign message to verify your identity",
    "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "signing_type": "personal_sign",
    "message": "Sign this message to verify your identity: 123456"
  }
}
```

For EIP-712 typed data signing:

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json",
  "request_message_signing": {
    "request_id": "typed_req_13579",
    "description": "Sign order for NFT marketplace",
    "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "signing_type": "typed_data",
    "typed_data": {
      "types": {
        "EIP712Domain": [
          { "name": "name", "type": "string" },
          { "name": "version", "type": "string" },
          { "name": "chainId", "type": "uint256" },
          { "name": "verifyingContract", "type": "address" }
        ],
        "Order": [
          { "name": "maker", "type": "address" },
          { "name": "tokenId", "type": "uint256" },
          { "name": "price", "type": "uint256" },
          { "name": "expiration", "type": "uint256" }
        ]
      },
      "primaryType": "Order",
      "domain": {
        "name": "NFT Marketplace",
        "version": "1",
        "chainId": 1,
        "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
      },
      "message": {
        "maker": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        "tokenId": 123,
        "price": 1000000000000000000,
        "expiration": 1714573637
      }
    }
  }
}
```

### Message Signing Response

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json",
  "message_signing_response": {
    "request_id": "msg_req_24680",
    "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "signature": "0x5d99b6f7f6d1f73d1a26497f2b1c89b24c0993913f86e9a2d02cd69887d9c94f3c880358579d811b21dd1b7fd9bb01c1d81d10e69f0384e675c32b39643be89100"
  }
}
```

### Chain Notification

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json",
  "chain_notification": {
    "notification_id": "chain_13579",
    "chain_id": 137,
    "name": "Polygon",
    "rpc_url": "https://polygon-rpc.com",
    "native_currency": {
      "name": "MATIC",
      "symbol": "MATIC",
      "decimals": 18
    }
  }
}
```

### Token Notification

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json",
  "token_notification": {
    "notification_id": "token_13579",
    "chain_id": 1,
    "token_type": "erc20",
    "token_contract": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "name": "Tether USD",
    "symbol": "USDT",
    "decimals": 6,
    "icon_url": "https://example.com/usdt-icon.png"
  }
}
```

## Chain IDs

This capability uses standard EVM chain IDs to identify networks:

| Chain ID | Network |
|----------|---------|
| 1 | Ethereum Mainnet |
| 10 | Optimism |
| 56 | BNB Smart Chain |
| 137 | Polygon |
| 42161 | Arbitrum One |
| 43114 | Avalanche C-Chain |
| 5 | Goerli Testnet |
| 11155111 | Sepolia Testnet |

## Limitations

The EVM Wallet capability has the following limitations:

1. Focused exclusively on EVM-compatible blockchains (use AITP-04 for NEAR, AITP-06 for Solana)
2. Does not handle payments directly (use AITP-01 for payment flows)
3. Requires a compatible Ethereum/EVM wallet implementation
4. Limited to standard Ethereum transaction and signing operations

For more complex payment scenarios, affiliate models, or cross-chain operations, consider using AITP-01 Payments.
