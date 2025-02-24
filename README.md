# AITP: Agent Interaction & Transaction Protocol
{: .no_toc }

Version: 0.1.0

Status: Draft

{: .note }
> [!NOTE]
> 
> AITP is a spec in progress and we are open to comments, feedback, and contributions!  
> 
> We are simultaneously writing this spec, integrating AITP support into the [NEAR AI Hub](https://app.near.ai/), and building
> AITP-compatible [agents](https://app.near.ai/agents) to inform how the protocol should change before v1.0.

<hr>

<details markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Introduction

AITP enables AI agents to communicate securely across trust boundaries while providing extensible mechanisms for structured interactions, e.g. payments, sensitive data sharing, user interfaces and more.

We envision a future in which most online interactions are conducted by AI agents representing people, businesses, and government entities, communicating with users and with each other. These agents will combine the scale and cost benefits of current online services with the flexibility and personalization of human interactions. Just as HTTP and HTML enable any web browser to visit any website, AITP provides a standard for agent-to-agent and user-to-agent communication, regardless of where those agents run or how they're built.

For a deeper exploration of the problems AITP aims to solve and our vision for the future of agent interactions, see the [Vision](VISION.md) page.

## Protocol Overview

AITP consists of two pieces:
1. A core protocol for communicating with agents in [**Chat Threads**](#threads), inspired by and largely compatible with the OpenAI Assistant/Threads API.  Read more below about:
	1. [Why Threads?](#why-chat-threads)
	2. [Thread Transports](#thread-transports)
	3. [Thread Specification](#thread-specification)
2. An extensible set of [**Capabilities**](#capabilities) communicated over those chat threads to indicate that the client of an agent (i.e. a user interface or another agent) can support useful standardized features like multimodal input, generative UI, payments, and/or human-in-the-loop attestations.  Read more below about:
	1. [What is a Capability?](#what-is-a-capability)
	3. [Capability Exchange](#capability-exchange)
	4. [Capability List](#capability-list)

See [examples](EXAMPLES.md) for a number of different examples how AITP can be used for various agents.

## AITP vs...

**...multi-agent orchestration frameworks like CrewAI, Autogen, and LangGraph:**
While these frameworks and AITP both deal with agent-to-agent communication, the other frameworks are meant for agents with the same owner, working towards a shared goal.  AITP facilitates agent-to-agent interactions that cross a 'trust boundary', like a user's agent talking to a business's agent.

It is totally fine to use these other frameworks for internal agent-to-agent communication and use AITP for external communication, though you could do it all with AITP too.

**...service metadata / API proxy / tool use   protocols like Anthropic's [Model Context Protocol](https://modelcontextprotocol.io/) (MCP), [Bitte Open Agents](https://docs.bitte.ai/agents), or [llms.txt](https://llmstxt.org/):**
These solutions are about making it easier for AI agents to use existing non-agentic APIs and services.  This is worthwhile since AI agents are still relatively uncommon in the wild.  But as these services start deploying their own AI agents, AITP defines how you or your agent should communicate with them.

There's lots more on this subject on the [Vision](VISION.md) page.

**...browser use agents like [ChatGPT Operator](https://openai.com/index/introducing-operator/), [Proxy](https://convergence.ai/), and [Rabbit LAM](https://www.rabbit.tech/lam-playground):**
Like the category above, browser use agents help 'bridge the gap' between AI agents and existing websites and services.  Browser use offers much more functionality than MCP at the expense of speed and accuracy.  We consider browser use agents to be a useful stopgap tool while we migrate to purpose-built agents communicating with AITP.

## How do I get involved?

* **Join our Telegram community**: https://t.me/nearaialpha 
* **Build more agents**: The more AITP-compatible agents there are, the more useful each agent will be.  Agents built on the [NEAR AI Hub](https://app.near.ai) support all AITP features.
* **Build AITP support into more AI agent frameworks**: We want every AI agent framework and hosting provider to support AITP.
* **Contribute to the protocol**: open an issue, pull request, or discussion on the [AITP repo](https://github.com/nearai/aitp).

If you're using AI development aids, the latest specification has been packaged up into [aitp-repomix.txt](https://nightly.link/nearai/aitp/workflows/repomix/main/aitp-repomix.zip), perfect for adding to your AI's context so it knows how to use AITP.

## Threads
Threads represent the main communication object between agents. A thread contains all the information exchanged in the conversation. This includes messages, participants and their capabilities.

Threads can be multi-party, supporting adding and removing agents and users.

### Why Chat Threads?
Conversations (in-person, email, phone, chat, etc.) are a fundamental building block of human communication.  And an AI agent is simply software intended to act like a human in a specific role.  So conversations (like chat threads) are a natural interaction pattern for AI agents too.

Natural-language chat threads are universal.  You don't need to read and understand a bunch of API docs or run some special software to learn how to interact with another service – you just talk to their agent.

### Thread Transports

The transport is responsible for defining how a client communicates with an AI agent.  That client could be a UI or it could be another AI agent.  Each transport must handle:
* Service identification: how do you tell one agent apart from another?
* Service location: how do you connect to the agent?
* Message and metadata encryption
* Operations for creating a thread, adding messages, and viewing history.
* Defining responsibility for managing the state of a thread

#### A Little Bit of History
With AITP, we're seeking to make interactions with AI agents as seamless and universal as browsing a website, sending an email, or making a phone call.

One reason the Web took off in the 1990s was that the HTTP interface was easy for website creators and browser developers to understand and implement.  Using the already well-established TCP/IP and DNS protocols, you could send `GET [url]` and receive back an HTML document.  This led to a proliferation of websites and browsers with rapidly expanding capabilities.

The chat thread is a similarly powerful concept built on top of existing technology.  For better or worse, OpenAI's APIs have become a de facto standard for other AI APIs (e.g. [LangChain Agent Protocol](https://github.com/langchain-ai/agent-protocol), so we adopt the relevant portions of it here as AITP's first supported transport to help with adoption.

#### Supported Transports

| Transport ID                                                | Description                 | Spec Status | Implementation Status |
|-------------------------------------------------------------|-----------------------------|-------------|-----------------------|
| [AITP-T01: Threads API](transports/aitp-t01-threads-api.md) | OpenAI-compatible HTTPS API | Draft       | Live on NEAR AI       |

Future transports could include anything that allows passing both unstructured and structured data between two or more parties:
* Email
* Chat (Slack, WhatsApp, Telegram)
* [Matrix](https://matrix.org/)
* Peer-to-peer / decentralized networks

### Thread Specification

```python
class Message:
    """Represents a message within a thread."""
    # The Unix timestamp (in seconds) for when the message was created.
    created_at: int
    # The thread ID that this message belongs to.
    thread_id: str
    # The content of the message in an array of text. 
    # AITP messages may be passed in JSON format, encoded as strings.
    content: list[str]
    # Files attached to the message.
    attachments: list[{file_id: str}]
    # The role of the entity that is creating the message: 'user' or 'assistant'.
	# 'user' is always the creator/initiator of the thread, even if it's actually
	# an AI agent. 'assistant' is used for any other respondent.  Check the 'actor'
	# metadata field for more detailss.
    role: str
    # Metadata for the message.
    metadata: dict
        # The entity that produced the message.
        actor: str


class Capability:
    schema: str


class Actor:
    """A User or Agent participating on the thread."""
    # A unique identifier, e.g. URL or username; this must be unique within the thread 
	# but does not need to be consistent between threads, e.g. to maintain anonymity.
    id: str
    # Capabilities this actor posses.
    capabilities: list[Capability]


class Thread:
    """Represents a thread that contains messages."""
    # The identifier, which can be referenced in API endpoints.
    id: str
    # The messages in the thread.
    messages: list[Message]
    # Metadata for the message.
    metadata: dict
        # Parent thread that this was forked off. Can be null.
        parent_id: str
        # Users and Agents that are part of this thread.
        actors: list[Actor]
```

## Capabilities

Capabilities are standards for specialized messages to enable structured interactions, e.g. for processing payments or sharing sensitive data. Agents or clients announce which capabilities they support when starting or joining a thread.  The other agents in the thread can then tailor their responses to make use of those capabilities.

The core communication mechanism of AITP is a natural-language chat thread, and even without any Capabilities, agents could express everything in natural language.  But  
a structured communication protocol allows systems of people and agents to “snap together”, following the maxim that easy things should be easy and hard things should be possible.

AITP Capabilities have several benefits over unstructured communication. For example, Clients, Tools and Agent code can operate directly on the structure, validating and correcting protocol outputs produced by an LLM. Additionally, API call outputs can be directly transformed into AITP messages, and expected messages can be routed programmatically, eliminating the need for LLM interpretation. All of these processes reduce variability, latency, and cost.

Capabilities can use `Thread.messages[].content[]` to communicate structured information serialized into JSON between actors that both support that capability.

For example:
```json
{
    "messages": [
        {"role": "assistant", "content": ["{\"$schema\": \"https://aitp.dev/v1/payment.schema.json\", \"type\": \"request_payment\": {...}}"]}
    ]
}
```

### What is a Capability?

A capability consists of a set of JSON schemas (also called message types), which define how to create structured JSON chat messages.  Any client or agent that declares support for a capability must be able to interpret and act on any message of any message type defined by the capability.

### Capability Versioning

Each capability is versioned within the URL of its JSON schema.  The schema should use semver (`vMAJOR.MINOR.PATCH`) style versioning, where:
* MAJOR version is incremented for breaking changes (e.g. removing/renaming fields).
* MINOR version is incremented for backward-compatible additions (e.g. new optional fields that can be safely ignored by older clients).
* PATCH version is incremented for non-functional changes (e.g. documentation fixes; no client impact).

Version numbers should start at v1.0.0, even for early drafts, since semver behavior is less well-defined when using v0.x.

To support the maximal amount of functionality, the parties in a thread need to determine the maximum version of each capability supported by all parties.  Therefore:
* Agents should declare a range of supported major versions that's as wide as possible.
* Agents sending an AITP message should use the highest major version known to all parties, and any minor version within that major version.
* Agents receiving an AITP message should ignore unknown fields, to handle newer minor versions gracefully.

### Capability Exchange

When starting or joining a thread, each agent or client needs to declare which capabilities and capability versions it supports.  Capability exchange is the responsibility of the Transport; it is not contained in the messages.  For instance, for the the AITP-T01 Thread API transport, capabilities are defined as an array of schema URLs passed into the `POST /v1/thread` endpoint.

### Capability List

| Capability ID                                                        | Schema                                                                                                                                        | Description                                                                          | Spec Status | Implementation Status |
|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|-------------|-----------------------|
| [AITP-01: Payments](capabilities/aitp-01-payments/README.md)        |                                                                                                                                               | Agent-native payment requests, authorizations, and post-processing                   | Ideation    | None                  |
| [AITP-02: Decisions](capabilities/aitp-02-decisions/README.md)       | v1.0.0 [JSON Schema](capabilities/aitp-02-decisions/v1.0.0/schema.json) / [TypeScript](capabilities/aitp-02-decisions/v1.0.0/schema.ts)       | Requesting decisions or actions from an agent or to be displayed in a user interface | Draft       | Live on NEAR AI       |
| [AITP-03: Data Request](capabilities/aitp-03-data-request/README.md) | v1.0.0 [JSON Schema](capabilities/aitp-03-data-request/v1.0.0/schema.json) / [TypeScript](capabilities/aitp-03-data-request/v1.0.0/schema.ts) | Supporting requesting and dealing with structured data like passwords and addresses  | Draft       | Live on NEAR AI       |
| [AITP-04: Transactions](capabilities/aitp-04-transactions/README.md) | v1.0.0 [JSON Schema](capabilities/aitp-04-transactions/v1.0.0/schema.json) / [TypeScript](capabilities/aitp-04-transactions/v1.0.0/schema.ts) | P2P crypto transactions, using coins or tokens; less functionality than Payments     | Draft       | Live on NEAR AI       |
| [AITP-05: Signatures](capabilities/aitp-05-signatures/README.md)     |    | Digital signatures for messages, authentication, and blockchain transactions         | Ideation    | None                  |

Future capabilities could include:
* Operational concerns like healthchecks
* Legacy forms of payment, like credit/debit cards or invoices

## Open questions

- Authentication of agents
- Agent identifiers
- Local agent interacting with agents on a hub
