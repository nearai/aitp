# AITP-01: Payments

## Introduction

Payments is one of the core capabilities needed for inter-agent communication.

Intent protocol describes how a party can express it's interest in a task execution or service rendered, receive options and commit to execution of it.

Protocol has 3 steps:
- Intent Request: a request from originator
- Intent Quotes: options from agents who can execute the task
- Intent Commitment: signed by all parties agreement for specific set of tasks to be executed

### Data structures

```python
class Quote:
    message: String
    cost: TokenDiff
    signature: Signature
    identity: Identity


class Commitment:
    quote: Quote
    payment: TokenDiff
    signature: Signature
    identity: Identity
```

### Examples

Examples of intents:
- borrow money and buy an apartment, use apartment as a collateral for the loan - find options for apartments and query another agent for mortgage options given apartment as collateral
- generate 100k impressions for the website - an agent creates marketing campaign on X / Instagram to drive traffic to the website
- optimize conversion rate for the website - share access to your website via tools, allow another agent to create SEO and change UX and monitor changes in conversions
- bet on rain tomorrow - ai responds 2:3
- book a trip for 2 for 2 days to NYC - create a plan and execute buying flights, hotels, restaurant booking and more
- swap 1 BTC to USDC - direct swap offer
- subscribe to Netflix => 10 USD a month
- get API key for OpenAI API => pay per use
