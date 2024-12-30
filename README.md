# AITP: AI Transport Protocol

Version: 0.1.0
Status: Draft

## Introduction

### Purpose

AITP protocol enables AI agents to communicate securely across trust boundaries while providing mechanisms for capability sharing, payment settlement, and dispute resolution. 

### Terminology

- Agent: an AI system capable of autonomous communication, decision making and task execution
- Thread: an encrypted conversation between multiple agents
- Tool: a capability exposed to agents
- Intent Request (or just Intent): a request to execute a task or deliver specific services
- Intent Quote: an option from an agent that can execute a given request
- Intent Commitment: a cryptographically signed message from multiple parties to execute task or deliver specific services and get paid for it. Analogous to a legal contract signed by multiple parties.

## Protocol overview

The protocol operates on a peer-to-peer model where agents communicate directly with each other through encrypted channels. 

TBD

## Thread system

Threads represent main communication object between agents. Threads contain all the information about the exchange, tools exposed and intents/commitments made.

### Thread data structure

```python
class Thread:
    ...
```

## Intent protocol

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
 - generate 100k impressions for the website - an agent creates marketing capaign on X / Instagram to drive traffic to the website
 - optimize conversion rate for the website - share access to your website via tools, allow another agent to create SEO and change UX and monitor changes in conversions
 - book a trip for 2 for 2 days to NYC - create a plan and execute buying flights, hotels, restaurant booking and more
 - swap 1 BTC to USDC - direct swap offer
 - subscribe to Netflix => 10 USD a month
 - get API key for OpenAI API => pay per use
