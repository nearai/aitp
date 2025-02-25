# AITP-04: NEAR Wallet

* **Version**: 1.0.0
* **Spec Status**: Draft
* **Implementation Status**: In Development

## Overview

AITP-04 NEAR Wallet enables agents to interact with a user's NEAR blockchain wallet for account information, transaction signing, and message signing. Unlike AITP-01 Payments which provides comprehensive payment capabilities, AITP-04 is focused specifically on direct NEAR wallet operations.

## When to Use NEAR Wallet Capability

The NEAR Wallet capability lets your agent request information about a user's NEAR account, have transactions signed by their wallet, get messages signed using NEP-413, and notify wallets about NEP-141 tokens they should be aware of.

Useful for agents that facilitate blockchain interactions, verify user identity with cryptographic signatures, or need to request transaction authorization from users.

## Message Types

### Request Account

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-near-wallet/v1.0.0/schema.json",
  "request_account": {
    "request_id": "acc_req_12345",
    "description": "Share your NEAR account to continue"
  }
}
```

### Account Response

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-near-wallet/v1.0.0/schema.json",
  "account_response": {
    "request_id": "acc_req_12345",
    "accounts": ["user.near", "user-other.near"]
  }
}
```

### Request Transaction Signing

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-near-wallet/v1.0.0/schema.json",
  "request_transaction": {
    "request_id": "tx_req_67890",
    "description": "Sign transaction to mint NFT",
    "transaction": {
      "receiver_id": "contract.near",
      "actions": [
        {
          "type": "FunctionCall",
          "params": {
            "method_name": "nft_mint",
            "args": "eyJ0b2tlbl9pZCI6ICJteS1uZnQiLCAibWV0YWRhdGEiOiB7InRpdGxlIjogIk15IE5GVCIsICJkZXNjcmlwdGlvbiI6ICJBbiBleGFtcGxlIE5GVCJ9fQ==",
            "gas": "30000000000000",
            "deposit": "1000000000000000000000000"
          }
        }
      ]
    }
  }
}
```

### Transaction Response

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-near-wallet/v1.0.0/schema.json",
  "transaction_response": {
    "request_id": "tx_req_67890",
    "transaction_hash": "9pz7fg2ZnM8joauyjvmwJeUESanYjRFzD3MN3kENAHVV"
  }
}
```

### Request Message Signing (NEP-413)

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-near-wallet/v1.0.0/schema.json",
  "request_message_signing": {
    "request_id": "msg_req_24680",
    "description": "Sign message to verify your identity",
    "message": {
      "nonce": "AQIDBA==", // Base64 encoded 32-byte nonce
      "recipient": "app.near",
      "message": "Sign this message to verify your identity"
    },
    "state": "optional_state_for_callbacks"
  }
}
```

### Message Signing Response

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-near-wallet/v1.0.0/schema.json",
  "message_signing_response": {
    "request_id": "msg_req_24680",
    "account_id": "user.near",
    "public_key": "ed25519:6E8sCci9badyRkXb3JoRpBj5p8C6Tw41ELDZoiihKEtp",
    "signature": "ed25519:4bkh1vDYxgJHVbGjMBtjMgL2Z7bP34UKWZ9zoQJfB21synQ2GuxMQty1gpQV3EH7HSDBhMG4FQnQ9fhjH8ye3cNc"
  }
}
```

### Token Awareness Notification

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-near-wallet/v1.0.0/schema.json",
  "token_notification": {
    "notification_id": "token_13579",
    "token_type": "nep141",
    "token_contract": "usdt.tether-token.near"
  }
}
```

The wallet can retrieve additional token information (name, symbol, decimals, icon) using the NEP-148 token metadata standard from the provided contract address.

## Limitations

The NEAR Wallet capability has the following limitations:

1. Focused exclusively on NEAR blockchain (use AITP-05 for EVM chains, AITP-06 for Solana)
2. Does not handle payments directly (use AITP-01 for payment flows)
3. Requires a compatible NEAR wallet implementation
4. Limited to operations supported by NEP-413 and standard NEAR transactions

For more complex payment scenarios, affiliate models, or cross-chain operations, consider using AITP-01 Payments.
