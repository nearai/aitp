# AITP-05: EVM Wallet Schema Reference

* **Version**: 1.0.0
* **Spec Status**: Draft

:::note AI-Generated Documentation
This documentation was generated with the assistance of AI and may need further review and refinement.
:::

## Schema URL

```
https://aitp.dev/capabilities/aitp-05-evm-wallet/v1.0.0/schema.json
```

## Schema Overview

The AITP-05 EVM Wallet capability defines a JSON schema that supports several message types for interacting with Ethereum/EVM blockchain wallets:

1. **Request Address** - Ask for Ethereum/EVM address information
2. **Address Response** - Response with Ethereum/EVM addresses
3. **Request Transaction** - Request a transaction to be signed and submitted
4. **Transaction Response** - Response with transaction hash
5. **Request Message Signing** - Request a message to be signed using EIP-191 or EIP-712
6. **Message Signing Response** - Response with signed message
7. **Chain Notification** - Notify about an EVM chain to be added
8. **Token Notification** - Notify about an ERC-20 token to be made visible

## Field Descriptions

### Request Address Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `request_address` | object | Yes | Container for the address request |
| `request_address.request_id` | string | Yes | Unique identifier for this request |
| `request_address.description` | string | No | Explanation for why address access is needed |
| `request_address.chain_id` | integer | No | EVM chain ID (defaults to 1 for Ethereum Mainnet) |

### Address Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `address_response` | object | Yes | Container for the address response |
| `address_response.request_id` | string | Yes | Reference to the request being responded to |
| `address_response.addresses` | array | Yes | Array of Ethereum addresses (0x prefixed) |

### Request Transaction Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `request_transaction` | object | Yes | Container for the transaction request |
| `request_transaction.request_id` | string | Yes | Unique identifier for this request |
| `request_transaction.description` | string | No | Description of what the transaction will do |
| `request_transaction.chain_id` | integer | No | EVM chain ID (defaults to 1 for Ethereum Mainnet) |
| `request_transaction.transaction` | object | Yes | Transaction details |
| `request_transaction.transaction.to` | string | Yes | Recipient address |
| `request_transaction.transaction.from` | string | No | Sender address |
| `request_transaction.transaction.data` | string | No | Transaction data (hex encoded) |
| `request_transaction.transaction.value` | string | No | Value in wei (hex encoded) |
| `request_transaction.transaction.gas` | string | No | Gas limit (hex encoded) |
| `request_transaction.transaction.gasPrice` | string | No | Gas price in wei (hex encoded) |
| `request_transaction.transaction.maxFeePerGas` | string | No | Max fee per gas for EIP-1559 (hex encoded) |
| `request_transaction.transaction.maxPriorityFeePerGas` | string | No | Max priority fee for EIP-1559 (hex encoded) |
| `request_transaction.transaction.nonce` | string | No | Transaction nonce (hex encoded) |
| `request_transaction.transaction.accessList` | array | No | EIP-2930 access list for more efficient gas usage |

### Transaction Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `transaction_response` | object | Yes | Container for the transaction response |
| `transaction_response.request_id` | string | Yes | Reference to the request being responded to |
| `transaction_response.transaction_hash` | string | Yes | Hash of the submitted transaction |

### Request Message Signing Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `request_message_signing` | object | Yes | Container for the message signing request |
| `request_message_signing.request_id` | string | Yes | Unique identifier for this request |
| `request_message_signing.description` | string | No | Description of why the message needs to be signed |
| `request_message_signing.address` | string | No | Optional address to sign with (if omitted, wallet chooses) |
| `request_message_signing.signing_type` | string | Yes | Either "personal_sign" for EIP-191 or "typed_data" for EIP-712 |
| `request_message_signing.message` | string | Conditional | Message to sign (required for personal_sign) |
| `request_message_signing.typed_data` | object | Conditional | Typed data to sign (required for typed_data) |
| `request_message_signing.typed_data.types` | object | Yes | Type definitions for the structured data |
| `request_message_signing.typed_data.primaryType` | string | Yes | Primary type being signed |
| `request_message_signing.typed_data.domain` | object | Yes | Domain separator data |
| `request_message_signing.typed_data.message` | object | Yes | The data to sign |

### Message Signing Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `message_signing_response` | object | Yes | Container for the message signing response |
| `message_signing_response.request_id` | string | Yes | Reference to the request being responded to |
| `message_signing_response.address` | string | Yes | Address that signed the message |
| `message_signing_response.signature` | string | Yes | Cryptographic signature |

### Chain Notification Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `chain_notification` | object | Yes | Container for the chain notification |
| `chain_notification.notification_id` | string | Yes | Unique identifier for this notification |
| `chain_notification.chain_id` | integer | Yes | EVM chain ID |
| `chain_notification.name` | string | No | Human-readable name for the chain |
| `chain_notification.rpc_url` | string | No | RPC endpoint URL for the chain |
| `chain_notification.native_currency` | object | No | Information about the chain's native currency |
| `chain_notification.native_currency.name` | string | Yes | Full name of the currency (e.g., "Ether") |
| `chain_notification.native_currency.symbol` | string | Yes | Symbol of the currency (e.g., "ETH") |
| `chain_notification.native_currency.decimals` | integer | Yes | Number of decimal places (typically 18) |

### Token Notification Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `token_notification` | object | Yes | Container for the token notification |
| `token_notification.notification_id` | string | Yes | Unique identifier for this notification |
| `token_notification.chain_id` | integer | Yes | EVM chain ID |
| `token_notification.token_type` | string | Yes | Type of token (currently only "erc20" supported) |
| `token_notification.token_contract` | string | Yes | Contract address of the token |
| `token_notification.name` | string | Yes | Full name of the token |
| `token_notification.symbol` | string | Yes | Symbol of the token |
| `token_notification.decimals` | integer | Yes | Number of decimal places for the token |
| `token_notification.icon_url` | string | No | URL to token icon image |

## Ethereum Standards

The capability references the following Ethereum standards:

1. **EIP-191**: Signed data standard (personal_sign)
2. **EIP-712**: Typed structured data hashing and signing
3. **EIP-1559**: Fee market change for more predictable gas fees
4. **EIP-2930**: Optional access lists for more efficient gas usage
5. **ERC-20**: Fungible token standard

## Common EVM Chain IDs

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