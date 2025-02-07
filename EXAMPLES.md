# Examples

## User interacting with Travel Agent

```json
{ 
    "agents": [
        {"id": "root.near", "capabilties": [{"capability": "aitp/payments", "schema": "..."}, {"capability": "aitp/ui", "schema": "..."}]},
        {"id": "hub.near.ai/travel-agent/0.1.0", "capabilties": [{"capability": "aitp/payments", "schema": "..."}]}
    ],
    "messages": [
        {"role": "root.near", "content": ["plan me a trip to NY"]},
        ...
        {"role": "hub.near.ai/travel-agent/0.1.0", "content": ["{\"capability\": \"aitp/payment\", ...request_payment, 1000 USD}"]}
        {"role": "root.near", "content": ["{\"capability\": \"aitp/payment\", ... decline payment}"]}
    ]
}
```
