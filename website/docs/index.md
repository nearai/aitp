---
sidebar_position: 1
sidebar_label: Overview
---

# AITP: Agent Interaction & Transaction Protocol

Version: 0.1.0

Status: Draft

:::note
AITP is a spec in progress and we are open to comments, feedback, and contributions!

We are simultaneously writing this spec, integrating AITP support into the [NEAR AI Hub](https://app.near.ai/), and building
AITP-compatible [agents](https://app.near.ai/agents) to inform how the protocol should change before v1.0.
:::

## Introduction

AITP enables AI agents to communicate securely across trust boundaries while providing extensible mechanisms for structured interactions, e.g. payments, sensitive data sharing, user interfaces and more.

We envision a future in which most online interactions are conducted by AI agents representing people, businesses, and government entities, communicating with users and with each other. These agents will combine the scale and cost benefits of current online services with the flexibility and personalization of human interactions. Just as HTTP and HTML enable any web browser to visit any website, AITP provides a standard for agent-to-agent and user-to-agent communication, regardless of where those agents run or how they're built.

For a deeper exploration of the problems AITP aims to solve and our vision for the future of agent interactions, see the [Vision](vision) page.

## Protocol Overview

AITP consists of two pieces:
1. A core protocol for communicating with agents in [**Chat Threads**](threads), inspired by and largely compatible with the OpenAI Assistant/Threads API.  Read more below about:
	1. [Why Threads?](threads#why-chat-threads)
	2. [Thread Transports](threads#thread-transports)
	3. [Thread Specification](threads#thread-specification)
2. An extensible set of [**Capabilities**](capabilities) communicated over those chat threads to indicate that the client of an agent (i.e. a user interface or another agent) can support useful standardized features like multimodal input, generative UI, payments, and/or human-in-the-loop attestations.  Read more below about:
	1. [What is a Capability?](capabilities#what-is-a-capability)
	3. [Capability Exchange](capabilities#capability-exchange)
	4. [Capability List](capabilities#capability-list)

See [examples](examples) for a number of different examples how AITP can be used for various agents.

## AITP vs...

**...multi-agent orchestration frameworks like CrewAI, Autogen, and LangGraph:**
While these frameworks and AITP both deal with agent-to-agent communication, the other frameworks are meant for agents with the same owner, working towards a shared goal.  AITP facilitates agent-to-agent interactions that cross a 'trust boundary', like a user's agent talking to a business's agent.

It is totally fine to use these other frameworks for internal agent-to-agent communication and use AITP for external communication, though you could do it all with AITP too.

**...service metadata / API proxy / tool use   protocols like Anthropic's [Model Context Protocol](https://modelcontextprotocol.io/) (MCP), [Bitte Open Agents](https://docs.bitte.ai/agents), or [llms.txt](https://llmstxt.org/):**
These solutions are about making it easier for AI agents to use existing non-agentic APIs and services.  This is worthwhile since AI agents are still relatively uncommon in the wild.  But as these services start deploying their own AI agents, AITP defines how you or your agent should communicate with them.

There's lots more on this subject on the [Vision](vision) page.

**...browser use agents like [ChatGPT Operator](https://openai.com/index/introducing-operator/), [Proxy](https://convergence.ai/), and [Rabbit LAM](https://www.rabbit.tech/lam-playground):**
Like the category above, browser use agents help 'bridge the gap' between AI agents and existing websites and services.  Browser use offers much more functionality than MCP at the expense of speed and accuracy.  We consider browser use agents to be a useful stopgap tool while we migrate to purpose-built agents communicating with AITP.

## How do I get involved?

* **Join our Telegram community**: https://t.me/nearaialpha
* **Build more agents**: The more AITP-compatible agents there are, the more useful each agent will be.  Agents built on the [NEAR AI Hub](https://app.near.ai) support all AITP features.
* **Build AITP support into more AI agent frameworks**: We want every AI agent framework and hosting provider to support AITP.
* **Contribute to the protocol**: open an issue, pull request, or discussion on the [AITP repo](https://github.com/nearai/aitp).

If you're using AI development aids, the latest specification has been packaged up into [aitp-repomix.txt](https://nightly.link/nearai/aitp/workflows/repomix/main/aitp-repomix.zip), perfect for adding to your AI's context so it knows how to use AITP.

## Open questions

- Authentication of agents
- Agent identifiers
- Local agent interacting with agents on a hub
