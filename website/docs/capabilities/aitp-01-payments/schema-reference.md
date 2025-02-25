# AITP-01 Schema Reference

* **Version**: 1.0.0
* **Spec Status**: Ideation

:::warning Ideation Phase
This schema specification is in early development and subject to change. While the core concepts are stable, implementation details may evolve as we gather feedback from real-world use cases.
:::

## Schema URL

```
https://aitp.dev/capabilities/aitp-01-payments/v1.0.0/schema.json
```

## Message Types

AITP-01 Payments defines several message types to support payment workflows between agents:

### Quote

A payment quote is sent by a merchant or service to request payment.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-01-payments/v1.0.0/schema.json",
  "quote": {
    "quote_id": "q_123456789",
    "merchant_id": "store.near",
    "description": "Premium Subscription - Annual Plan",
    "expiration": "2025-03-01T12:00:00Z",
    "next_recipient": "service-agent.near",
    "payment_options": [
      {
        "amount": "99.99",
        "currency": "USD",
        "payment_methods": [
          {
            "type": "near_payment_channel",
            "token": "usdc.near",
            "recipient": "store.near"
          }
        ]
      }
    ],
    "revenue_share": {
      "affiliate_share_bps": 300,
      "affiliates": []
    },
    "merchant_signature": "ed25519:..."
  }
}
```

#### Quote Fields:

- `quote_id`: Unique identifier for this payment request
- `merchant_id`: Identifier for the recipient of the payment
- `description`: Human-readable description of what is being paid for
- `expiration`: (Optional) When this quote expires
- `next_recipient`: (Optional) The next agent in the chain that should receive this quote
- `payment_options`: Available payment options
  - `amount`: (Optional) Amount to be paid
  - `currency`: Currency code (e.g., 'USD')
  - `payment_methods`: Available methods to pay this amount
    - `type`: Type of payment method (currently only "near_payment_channel")
    - `token`: Token contract address
    - `recipient`: Recipient account or address
- `revenue_share`: (Optional) Configuration for affiliate revenue sharing
  - `affiliate_share_bps`: Percentage in basis points allocated to affiliates
  - `affiliates`: List of affiliates that should receive a share
- `merchant_signature`: Cryptographic signature by the merchant

### Wrapped Quote

A wrapped quote allows agents to add themselves and others as affiliates while forwarding the payment request.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-01-payments/v1.0.0/schema.json",
  "wrapped_quote": {
    "original_quote": {
      "quote_id": "q_123456789",
      "merchant_id": "store.near",
      "description": "Premium Subscription - Annual Plan",
      "expiration": "2025-03-01T12:00:00Z",
      "next_recipient": "service-agent.near",
      "payment_options": [
        {
          "amount": "99.99",
          "currency": "USD",
          "payment_methods": [
            {
              "type": "near_payment_channel",
              "token": "usdc.near",
              "recipient": "store.near"
            }
          ]
        }
      ],
      "revenue_share": {
        "affiliate_share_bps": 300,
        "affiliates": []
      },
      "merchant_signature": "ed25519:..."
    },
    "wrappers": [
      {
        "affiliate_id": "service-agent.near",
        "role": "service",
        "added_affiliates": [],
        "next_recipient": "assistant.near",
        "timestamp": "2025-02-25T08:29:15Z",
        "signature": "ed25519:..."
      },
      {
        "affiliate_id": "assistant.near",
        "role": "personal_assistant",
        "added_affiliates": [
          {
            "id": "discovery.near",
            "role": "discovery",
            "weight": 1
          }
        ],
        "next_recipient": "user-interface.near",
        "timestamp": "2025-02-25T08:30:15Z",
        "signature": "ed25519:..."
      }
    ]
  }
}
```

#### Wrapped Quote Fields:

- `original_quote`: The original quote as issued by the merchant
- `wrappers`: Chain of agents that have wrapped this quote
  - `affiliate_id`: Identifier for this affiliate
  - `role`: Role of this affiliate in the transaction
  - `added_affiliates`: Additional affiliates added by this wrapper
  - `next_recipient`: The next agent in the chain that should receive this quote
  - `timestamp`: When this wrapper was added
  - `signature`: Cryptographic signature by this wrapper

### Payment

A payment message is sent by the payer to authorize payment for a quote.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-01-payments/v1.0.0/schema.json",
  "payment": {
    "quote_id": "q_123456789",
    "payment_method": {
      "type": "near_payment_channel",
      "token": "usdc.near",
      "channel_id": "ch_987654321",
      "amount": "99.99",
      "currency": "USD"
    },
    "payer_id": "user.near",
    "timestamp": "2025-02-25T08:32:15Z",
    "payer_signature": "ed25519:..."
  }
}
```

#### Payment Fields:

- `quote_id`: Reference to the quote being paid
- `payment_method`: Details of the payment method used
  - `type`: Type of payment method used (currently only "near_payment_channel")
  - `token`: Token contract address
  - `channel_id`: Identifier for the payment channel
  - `amount`: (Optional) Amount paid
  - `currency`: Currency code (e.g., 'USD')
- `payer_id`: Identifier for the payer
- `timestamp`: When the payment was made
- `payer_signature`: Cryptographic signature by the payer

### Payment Confirmation

A payment confirmation is sent by the merchant to confirm receipt of payment.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-01-payments/v1.0.0/schema.json",
  "payment_confirmation": {
    "quote_id": "q_123456789",
    "payment_id": "pay_987654321",
    "result": "success",
    "timestamp": "2025-02-25T08:33:15Z",
    "message": "Your premium subscription has been activated!",
    "details": [
      {
        "label": "Order Number",
        "value": "ORD-12345",
        "url": "https://example.com/orders/12345"
      },
      {
        "label": "Subscription Period",
        "value": "February 25, 2025 - February 25, 2026"
      }
    ],
    "merchant_signature": "ed25519:..."
  }
}
```

#### Payment Confirmation Fields:

- `quote_id`: Reference to the quote that was paid
- `payment_id`: Unique identifier for this payment
- `result`: Result of the payment processing ("success", "failure", or "pending")
- `timestamp`: When the payment was processed
- `message`: (Optional) Human-readable message about the payment
- `details`: (Optional) Additional details about the transaction
  - `label`: Label for this detail
  - `value`: Value for this detail (string or number)
  - `url`: (Optional) URL with more information
- `merchant_signature`: Cryptographic signature by the merchant

### Top-Up Request

A top-up request is sent by a merchant to request additional funds for an existing payment channel.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-01-payments/v1.0.0/schema.json",
  "top_up_request": {
    "channel_id": "ch_987654321",
    "amount": "50.00",
    "currency": "USD",
    "reason": "Additional service usage beyond initial payment",
    "merchant_id": "store.near",
    "timestamp": "2025-02-26T10:15:30Z",
    "merchant_signature": "ed25519:..."
  }
}
```

#### Top-Up Request Fields:

- `channel_id`: Identifier for the payment channel to top up
- `amount`: (Optional) Suggested amount to add to the channel
- `currency`: Currency code (e.g., 'USD')
- `reason`: (Optional) Reason for requesting more funds
- `merchant_id`: Identifier for the merchant requesting the top-up
- `timestamp`: When the top-up was requested
- `merchant_signature`: Cryptographic signature by the merchant

### Top-Up Response

A top-up response is sent by the payer to confirm additional funds have been added to a payment channel.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-01-payments/v1.0.0/schema.json",
  "top_up_response": {
    "channel_id": "ch_987654321",
    "amount": "50.00",
    "currency": "USD",
    "new_balance": "75.50",
    "payer_id": "user.near",
    "timestamp": "2025-02-26T10:20:45Z",
    "payer_signature": "ed25519:..."
  }
}
```

#### Top-Up Response Fields:

- `channel_id`: Identifier for the payment channel that was topped up
- `amount`: Amount added to the channel
- `currency`: Currency code (e.g., 'USD')
- `new_balance`: (Optional) New balance in the channel
- `payer_id`: Identifier for the payer
- `timestamp`: When the top-up was processed
- `payer_signature`: Cryptographic signature by the payer

## Signature Requirements

AITP-01 Payments relies on cryptographic signatures to ensure the authenticity and integrity of messages. Below are the specific requirements for generating and verifying signatures.

### Original Quote Signature

The `merchant_signature` in the original quote must be generated by signing a canonical representation of the quote object with the merchant's private key.

#### Signing Process:
1. Create a JSON object with all quote fields **except** `merchant_signature`
2. Sort all object keys alphabetically
3. Remove all whitespace from the JSON
4. Create a UTF-8 encoded byte array from this canonical JSON string
5. Sign the byte array using the merchant's ed25519 private key
6. Format the signature as `"ed25519:{base64_signature}"`

```javascript
// Example pseudocode for signing an original quote
function signOriginalQuote(quote, privateKey) {
  // Create a copy without the signature field
  const quoteToSign = {...quote};
  delete quoteToSign.merchant_signature;
  
  // Create canonical JSON (sorted keys, no whitespace)
  const canonicalJson = JSON.stringify(quoteToSign, Object.keys(quoteToSign).sort());
  
  // Sign the UTF-8 encoded canonical JSON
  const signature = ed25519Sign(privateKey, utf8Encode(canonicalJson));
  
  // Return the formatted signature
  return `ed25519:${base64Encode(signature)}`;
}
```

### Wrapped Quote Signature

For wrapped quotes, each wrapper must sign the combination of the original quote and all previous wrappers, creating a chain of signatures where each wrapper authenticates the entire quote history.

#### Signing Process for Wrappers:
1. Create a JSON object with the wrapper's fields **except** `signature`
2. Sort all object keys alphabetically
3. If this is the first wrapper, include the entire original quote (with its signature)
4. If this is not the first wrapper, include all previous wrappers (with their signatures)
5. Remove all whitespace from the JSON
6. Create a UTF-8 encoded byte array from this canonical JSON string
7. Sign the byte array using the wrapper's ed25519 private key
8. Format the signature as `"ed25519:{base64_signature}"`

```javascript
// Example pseudocode for signing a wrapper
function signWrapper(originalQuote, previousWrappers, newWrapper, privateKey) {
  // Create a copy of the wrapper without the signature field
  const wrapperToSign = {...newWrapper};
  delete wrapperToSign.signature;
  
  // Create the payload that includes the original quote and all previous wrappers
  const payload = {
    original_quote: originalQuote,
    previous_wrappers: previousWrappers,
    new_wrapper: wrapperToSign
  };
  
  // Create canonical JSON (sorted keys, no whitespace)
  const canonicalJson = JSON.stringify(payload, Object.keys(payload).sort());
  
  // Sign the UTF-8 encoded canonical JSON
  const signature = ed25519Sign(privateKey, utf8Encode(canonicalJson));
  
  // Return the formatted signature
  return `ed25519:${base64Encode(signature)}`;
}
```

### Verification Process

When receiving a wrapped quote, implementations must verify:
1. The original quote's signature is valid
2. Each wrapper's signature is valid, verifying against the original quote and all previous wrappers
3. The signatures are created by the claimed identities

This chain of signatures ensures that no party can modify the quote or any previous wrapper without invalidating the signature chain.

## Security Considerations

When implementing AITP-01 Payments:

1. **Always verify all signatures** in the chain to ensure message integrity
2. **Validate quote expiration** to prevent replay attacks
3. **Check payment amounts** match the quoted amounts
4. **Implement idempotency** to prevent double-charging
5. **Store transaction details** securely for auditing
6. **Use secure random number generators** for all cryptographic operations

## Current Limitations

AITP-01 Payments currently has the following limitations:

1. **NEAR blockchain only**: Only supports NEAR blockchain and associated tokens
2. **Limited payment methods**: Only supports payment channels (no credit cards, etc.)
3. **Simple affiliate model**: Revenue sharing model is still being refined
4. **No subscription management**: Recurring payments must be managed manually

These limitations will be addressed in future versions of the specification.