# AITP-04: Transactions

* **Version**: 1.0.0
* **Spec Status**: Draft
* **Implementation Status**: Live on [NEAR AI](https://app.near.ai/)

:::note Auto-generated Documentation
Parts of this documentation were auto-generated from the schema and example messages by an AI model.
:::

## Overview

```mermaid
flowchart LR
    A[Agent A] -->|1: Sends quote| B[Agent B or User]
    B -->|2: Reviews quote| C{Payment Decision}
    C -->|3a: Authorizes transaction| D[Payment Authorization]
    C -->|3b: Declines transaction| E[End Transaction]
    D -->|4: Processes transaction| F[Payment Result]
    F -->|5: Sends transaction confirmation| A
    A -->|6: Verifies transaction| G[Blockchain]
    G -->|7: Transaction verified| A 
    
    style A fill:#f9d77e,stroke:#8b6914
    style B fill:#a2d2ff,stroke:#0072b2
    style C fill:#d3f8e2,stroke:#388e3c
    style D fill:#ffc8c8,stroke:#d32f2f
    style F fill:#c8e6c9,stroke:#388e3c
```

The Transactions capability enables agents to request and process crypto transactions securely. This capability facilitates financial transactions between users and services, or between different agents, using standardized message formats to ensure consistency and security.

## Schema

Schema URL: `https://aitp.dev/capabilities/aitp-04-transactions/v1.0.0/schema.json`

The Transactions capability defines three primary message types:
1. `quote` - Sent by an agent to request payment
2. `payment_authorization` - Sent by the payer to authorize a payment
3. `payment_result` - Sent by the payee to confirm payment processing

## Message Types

### Quote

A quote is sent by an agent (typically a service or merchant) to request payment from a user or another agent.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-transactions/v1.0.0/schema.json",
  "quote": {
    "type": "Quote",
    "quote_id": "unique-quote-id",
    "payee_id": "merchant-identifier",
    "payment_plans": [
      {
        "plan_id": "plan-identifier",
        "plan_type": "one-time",
        "amount": 2.5,
        "currency": "USD"
      }
    ],
    "valid_until": "2025-01-01T00:00:00Z"
  }
}
```

#### Quote Fields:

- `type`: Always "Quote"
- `quote_id`: Unique identifier for this payment request
- `payee_id`: Identifier for the recipient of the payment
- `payment_plans`: Array of payment options
  - `plan_id`: Unique identifier for this payment plan
  - `plan_type`: Type of payment (currently only "one-time" is supported)
  - `amount`: Numeric amount to be paid
  - `currency`: Currency code (currently only "USD" is supported)
- `valid_until`: Expiration date/time for this quote

### Payment Authorization

A payment authorization is sent by the payer to approve the payment requested in a quote.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-transactions/v1.0.0/schema.json",
  "payment_authorization": {
    "quote_id": "unique-quote-id",
    "result": "success",
    "message": "Payment authorized",
    "timestamp": "2023-01-01T12:34:56Z",
    "details": [
      {
        "network": "NEAR",
        "token_type": "USDC",
        "amount": 2.5,
        "account_id": "payer-account-id",
        "transaction_id": "blockchain-transaction-id"
      }
    ]
  }
}
```

#### Payment Authorization Fields:

- `quote_id`: Reference to the quote being authorized
- `result`: Result of the authorization attempt ("success" or "failure")
- `message`: Optional message describing the result
- `timestamp`: Date and time when the authorization was processed
- `details`: Array of payment details
  - `network`: Blockchain network (currently only "NEAR" is supported)
  - `token_type`: Token type used for payment (currently only "USDC" is supported)
  - `amount`: Amount that was authorized
  - `account_id`: Account identifier of the payer
  - `transaction_id`: Blockchain transaction identifier

### Payment Result

A payment result is sent by the payee to confirm the processing of a payment.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-transactions/v1.0.0/schema.json",
  "payment_result": {
    "quote_id": "unique-quote-id",
    "result": "success",
    "timestamp": "2023-01-01T12:35:00Z",
    "message": "Payment processed successfully",
    "details": [
      {
        "label": "Order Number",
        "value": "ORD-12345",
        "url": "https://example.com/orders/12345"
      },
      {
        "label": "Estimated Delivery",
        "value": "January 5, 2023"
      }
    ]
  }
}
```

#### Payment Result Fields:

- `quote_id`: Reference to the quote that was paid
- `result`: Result of the payment processing ("success" or "failure")
- `timestamp`: Date and time when the payment was processed
- `message`: Optional message describing the result
- `details`: Array of additional details about the transaction
  - `label`: Label for the detail item
  - `value`: Value for the detail item (string or number)
  - `url`: Optional URL for more information

## Examples

### Basic Payment Flow

The following example demonstrates a complete payment flow:

1. Service agent sends a quote for a product:

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-transactions/v1.0.0/schema.json",
  "quote": {
    "type": "Quote",
    "quote_id": "quote_123",
    "payee_id": "merchant.near",
    "payment_plans": [
      {
        "plan_id": "plan_123",
        "plan_type": "one-time",
        "amount": 2.5,
        "currency": "USD"
      }
    ],
    "valid_until": "2050-01-01T00:00:00Z"
  }
}
```

2. User authorizes the payment:

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-transactions/v1.0.0/schema.json",
  "payment_authorization": {
    "quote_id": "quote_123",
    "result": "success",
    "timestamp": "2050-01-01T00:00:00Z",
    "details": [
      {
        "network": "NEAR",
        "token_type": "USDC",
        "amount": 2.5,
        "account_id": "customer.near",
        "transaction_id": "7vjj6uqQeyYciPNhA9jiRvfH98LVeJ7C8df4Q9rA3SfN"
      }
    ]
  }
}
```

3. Service agent confirms the payment:

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-04-transactions/v1.0.0/schema.json",
  "payment_result": {
    "quote_id": "quote_123",
    "result": "success",
    "timestamp": "2050-01-01T00:00:00Z",
    "message": "Your red socks are on their way!",
    "details": [
      {
        "label": "Order Number",
        "value": 123,
        "url": "https://near.ai"
      },
      {
        "label": "Product",
        "value": "Red Socks"
      }
    ]
  }
}
```

## Integration with Other Capabilities

:::caution Security Considerations
- Always verify payment amounts match the original quote
- Implement idempotency to prevent double-charging
- Store transaction IDs securely for auditing
- Handle payment failures gracefully
:::

## Limitations of Current Version

:::warning Current Limitations
- Only supports one-time payments (no subscriptions)
- Limited to USD currency
- Only supports NEAR blockchain with USDC tokens
- No support for traditional payment methods (credit cards, bank transfers)
:::
