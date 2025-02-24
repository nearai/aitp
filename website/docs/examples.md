---
sidebar_position: 3
sidebar_label: Examples
---

# AITP Examples

AITP is a generic protocol for interacting between agents with ability to exchange value. This document showcases specific interaction examples.

## User interacting with Travel Agent

```mermaid
sequenceDiagram
    participant U as User Agent
    participant S as Shopping Agent
    
    U->>S: "I'd like to buy some socks"
    S->>U: request_decision JSON (product options)
    Note right of S: Shows options for red socks and blue socks<br>with prices, images, etc.
    U->>S: decision JSON (selects product)
    S->>U: payment quote JSON
    Note right of S: Quote for the selected product
    U->>S: approval/payment JSON
    S->>U: "Thank you for your purchase!"
    Note right of S: Order confirmation and next steps
```

Overview

```json
{ 
    "agents": [
        {"id": "root.near", "capabilities": [
          {"$schema": "https://aitp.dev/v1/payments.schema.json"}, 
          {"$schema": "https://aitp.dev/v1/requests.schema.json"}
        ]},
        {"id": "hub.near.ai/travel-agent/0.1.0", "capabilities": [
          {"$schema": "https://aitp.dev/v1/payments.schema.json" }
        ]}
    ],
    "messages": [
        {"metadata": {"actor": "root.near"}, 
          "content": ["plan me a trip to NY"],
          "role":  "user"},
        ...
        {"metadata": {"actor": "hub.near.ai/travel-agent/0.1.0"}, 
          "content": ["{\"$schema\": \"https://aitp.dev/v1/payments.schema.json\", ...request_payment, 1000 USD}"],
          "role":  "assistant"},
        {"metadata": {"actor": "root.near"}, 
          "content": ["{\"$schema\": \"https://aitp.dev/v1/payments.schema.json\", ... decline payment}"], 
          "role":  "user"}
    ]
}
```

Create Thread

```json
{
  "id": "thread_travel-agent-1",
  "metadata": {
    "parent_id": "thread_7518075837403837",
    "actors": "[{\"id\": \"root.near\", \"capabilities\": [{\"$schema\": \"https://aitp.dev/v1/payments.schema.json\"}, {\"$schema\": \"https://aitp.dev/v1/requests.schema.json\"}]},{\"id\": \"hub.near.ai/travel-agent/0.1.0\", \"capabilities\": [{\"$schema\": \"https://aitp.dev/v1/payments.schema.json\"}]}]"
  }
}
```

Create an AITP Message
```json
{
  "thread_id": "thread_travel-agent-1",
  "role": "assistant",
  "metadata": {
    "actor": "hub.near.ai/travel-agent/0.1.0"
  },
  "content": [
    "{\"$schema\": \"https://aitp.dev/v1/requests.schema.json\", \"request_decision\": {\"type\": \"product\", \"options\": [{\"id\": 1, \"image_url\": \"https://...\", \"name\": \"Red Socks\", \"price\": {\"usd\": 10.5 },\"url\": \"https://amazon.com/...\"}, {\"id\": 2,\"image_url\": \"https://...\",\"name\": \"Blue Socks\",\"price\": {\"usd\": 9 },\"url\": \"https://amazon.com/...\"}]}}"      ]
}
```

GET Thread that has several messages
```json
{
  "id": "thread_travel-agent-1",
  "metadata": {
    "parent_id": "thread_7518075837403837",
    "actors": "[{\"id\": \"root.near\", \"capabilities\": [{\"$schema\": \"https://aitp.dev/v1/payments.schema.json\"}, {\"$schema\": \"https://aitp.dev/v1/requests.schema.json\"}]},{\"id\": \"hub.near.ai/travel-agent/0.1.0\", \"capabilities\": [{\"$schema\": \"https://aitp.dev/v1/payments.schema.json\"}]}]"
  },
  "messages": [
    {
      "metadata": {
        "actor": "root.near"
      },
      "content": [
        "I'd like to buy some socks"
      ]
    },
    {
      "metadata": {
        "actor": "hub.near.ai/travel-agent/0.1.0"
      },
      "content": [
        "{\"$schema\": \"https://aitp.dev/v1/requests.schema.json\", \"request_decision\": {\"type\": \"product\", \"options\": [{\"id\": 1, \"image_url\": \"https://...\", \"name\": \"Red Socks\", \"price\": {\"usd\": 10.5 },\"url\": \"https://amazon.com/...\"}, {\"id\": 2,\"image_url\": \"https://...\",\"name\": \"Blue Socks\",\"price\": {\"usd\": 9 },\"url\": \"https://amazon.com/...\"}]}}"      ]
    },
    {
      "metadata": {
        "actor": "root.near"
      },
      "content": [
        "{\"$schema\": \"https://aitp.dev/v1/payments.schema.json\", \"quote\": { \"quote_id\": \"quote_1234\",\"payee_id\": \"demo-shopper.near\",\"payment_plans\": [{\"plan_id\": \"...\", \"plan_type\": \"one-time\", \"amount\": 123.45, \"currency\": \"USD\"}, {\"plan_id\": \"...\", \"plan_type\": \"subscription\", \"recurring_details\": { \"interval\": \"monthly\", \"amount\": 9.99, \"currency\": \"USD\"}}],\"valid_until\": \"2025-12-31 12:00:00\"}}"
      ]
    }
  ]
}
```

## Complete Purchase Flow

```mermaid
flowchart TB
    Start[User starts conversation] --> Intent[User expresses purchase intent]
    Intent --> Options[Agent presents product options]
    Options --> Selection[User makes selection]
    Selection --> Quote[Agent provides payment quote]
    Quote --> Decision{User decides}
    Decision -->|Accept| Payment[User approves payment]
    Decision -->|Decline| End[End of conversation]
    Payment --> Processing[Agent processes payment]
    Processing --> Confirmation[Agent confirms purchase]
    Confirmation --> Shipping[Agent provides shipping info]
    Shipping --> End
    
    style Start fill:#f9f9f9,stroke:#333
    style End fill:#f9f9f9,stroke:#333
    style Decision fill:#ffe0b2,stroke:#fb8c00
    style Payment fill:#bbdefb,stroke:#1976d2
    style Confirmation fill:#c8e6c9,stroke:#388e3c
