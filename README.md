# AITP: Agent Interaction & Transaction Protocol

AITP is a standard protocol enabling AI agents to communicate securely across trust boundaries while providing structured interactions for payments, data sharing, and user interfaces. Just as HTTP enables browsers to visit websites, AITP provides a standard for user-to-agent or agent-to-agent communication, regardless of where agents run or how they're built.

**[Visit the official documentation at https://aitp.dev](https://aitp.dev)**

## Why AITP?

As AI agents become more prevalent, we need standardized ways for them to communicate. AITP bridges the gap between:

- **Multi-agent orchestration frameworks** (CrewAI, Autogen, LangGraph) meant for agents with the same owner
- **Service metadata protocols** (MCP, Bitte) that help AI agents use existing non-agentic APIs
- **Browser agents** (ChatGPT Operator, Proxy) that help AI navigate existing websites

AITP focuses specifically on cross-trust-boundary interactions, like your personal AI agent talking to a business's AI agent.

## Key Components

AITP consists of two main parts:

1. **Chat Threads** - A core protocol for communication between agents
2. **Capabilities** - Extensible, structured message types for specific interactions like payments or forms

## Current Status

Version: 0.1.0 (Draft)

AITP is a specification in progress. We're actively developing the spec while simultaneously implementing AITP in real-world systems.

## Get Involved

We welcome contributions to help shape the future of agent interaction!

- **Join our community**: [https://t.me/nearaialpha](https://t.me/nearaialpha)
- **Build AITP-compatible agents**: Agents built on the [NEAR AI Hub](https://app.near.ai) already support AITP
- **Implement AITP in frameworks**: Help integrate AITP into existing AI agent frameworks
- **Contribute to the spec**: Open issues and PRs in this repository

## Using the Spec with AI Tools

If you're using AI development aids, you can reference the latest specification packaged as [aitp-repomix.txt](https://nightly.link/nearai/aitp/workflows/repomix/main/aitp-repomix.zip), which is perfect for adding to your AI's context.
