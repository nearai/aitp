# AITP-04: NEAR Wallet Schema Reference

* **Version**: 1.0.0
* **Spec Status**: Draft

## Schema URL

```
https://aitp.dev/capabilities/aitp-04-near-wallet/v1.0.0/schema.json
```

## Schema Overview

The AITP-04 NEAR Wallet capability defines a JSON schema that supports several message types for interacting with a NEAR blockchain wallet:

1. **Request Account** - Ask for NEAR account information
2. **Account Response** - Response with NEAR account information
3. **Request Transaction** - Request a transaction to be signed and submitted
4. **Transaction Response** - Response with transaction hash
5. **Request Message Signing** - Request a message to be signed using NEP-413
6. **Message Signing Response** - Response with signed message
7. **Token Notification** - Notify about a NEP-141 token to be made visible

## Field Descriptions

### Request Account Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `request_account` | object | Yes | Container for the account request |
| `request_account.request_id` | string | Yes | Unique identifier for this request |
| `request_account.description` | string | No | Explanation for why account access is needed |

### Account Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `account_response` | object | Yes | Container for the account response |
| `account_response.request_id` | string | Yes | Reference to the request being responded to |
| `account_response.accounts` | array | Yes | Array of NEAR account IDs |

### Request Transaction Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `request_transaction` | object | Yes | Container for the transaction request |
| `request_transaction.request_id` | string | Yes | Unique identifier for this request |
| `request_transaction.description` | string | No | Description of what the transaction will do |
| `request_transaction.transaction` | object | Yes | Transaction details |
| `request_transaction.transaction.receiver_id` | string | Yes | Recipient account ID |
| `request_transaction.transaction.actions` | array | Yes | Array of actions to perform |
| `request_transaction.transaction.actions[].type` | string | Yes | Action type (CreateAccount, FunctionCall, etc.) |
| `request_transaction.transaction.actions[].params` | object | Yes | Parameters for the action |

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
| `request_message_signing.message` | object | Yes | Message to be signed following NEP-413 format |
| `request_message_signing.message.nonce` | string | Yes | Base64-encoded 32-byte nonce |
| `request_message_signing.message.recipient` | string | Yes | Intended recipient of the message |
| `request_message_signing.message.message` | string | Yes | Content of the message to sign |
| `request_message_signing.state` | string | No | Optional state parameter for callbacks |

### Message Signing Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `message_signing_response` | object | Yes | Container for the message signing response |
| `message_signing_response.request_id` | string | Yes | Reference to the request being responded to |
| `message_signing_response.account_id` | string | Yes | Account ID that signed the message |
| `message_signing_response.public_key` | string | Yes | Public key used for signing |
| `message_signing_response.signature` | string | Yes | Cryptographic signature |

### Token Notification Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema |
| `token_notification` | object | Yes | Container for the token notification |
| `token_notification.notification_id` | string | Yes | Unique identifier for this notification |
| `token_notification.token_type` | string | Yes | Type of token (currently only "nep141" supported) |
| `token_notification.token_contract` | string | Yes | Contract address of the token |

## Action Types

For transaction requests, the following action types are supported:

| Action Type | Description |
|-------------|-------------|
| `CreateAccount` | Create a new NEAR account |
| `DeployContract` | Deploy a smart contract |
| `FunctionCall` | Call a function on a smart contract |
| `Transfer` | Transfer NEAR tokens |
| `Stake` | Stake NEAR tokens with a validator |
| `AddKey` | Add an access key to an account |
| `DeleteKey` | Remove an access key from an account |
| `DeleteAccount` | Delete a NEAR account |

## NEP-413 Message Signing

The message signing request follows the [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md) standard for secure message signing. Key features include:

1. **Nonce**: A 32-byte random value encoded as Base64 to prevent replay attacks
2. **Recipient**: The intended recipient of the signed message
3. **Message**: The content to be signed

The wallet will format these components according to the NEP-413 standard before signing.

## Token Standards

The token notification supports NEP-141 fungible tokens. When notified about a token, wallets should:

1. Query the token contract for metadata using the NEP-148 standard
2. Display the token in the user's wallet interface
3. Track the user's balance of this token