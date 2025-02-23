# AITP: Agent Interaction & Transaction Protocol

Version: 0.1.0
Status: Draft

## Introduction

AITP enables AI agents to communicate securely across trust boundaries while providing extensible mechanisms for structured interactions, e.g. payments, sensitive data sharing, user interfaces and more.

We envision a future in which most online interactions are conducted by AI agents representing people, businesses, and government entities, communicating with users and with each other. These agents will combine the scale and cost benefits of current online services with the flexibility and personalization of human interactions. Just as HTTP and HTML enable any web browser to visit any website, AITP provides a standard for agent-to-agent and user-to-agent communication, regardless of where those agents run or how they're built.

For a deeper exploration of the problems AITP aims to solve and our vision for the future of agent interactions, see [VISION.md](VISION.md).

## Protocol Overview

AITP consists of two pieces:
1. A core protocol for communicating with agents in [**Chat Threads**](#threads), inspired by and largely compatible with the OpenAI Assistant/Threads API.  Read more about:
	1. [Why Threads?](#why-chat-threads)
	2. [Thread Transports](#thread-transports)
	3. [Thread Specification](#thread-specification)
2. An extensible set of **Capabilities** communicated over those chat threads to indicate that the client of an agent (i.e. a user interface or another agent) can support useful standardized features like multimodal input, generative UI, payments, and/or human-in-the-loop attestations.  Read more about:
	1. [What is a Capability?](#what-is-a-capability)
	3. [Capability Exchange](#capability-exchange)
	4. [Capability List](#capability-list)

## AITP vs...

**...multi-agent orchestration frameworks like CrewAI, Autogen, and LangGraph:**
While these frameworks and AITP both deal with agent-to-agent communication, the other frameworks are meant for agents with the same owner, working towards a shared goal.  AITP facilitates agent-to-agent interactions that cross a 'trust boundary', like a user's agent talking to a business's agent.

It is totally fine to use these other frameworks for internal agent-to-agent communication and use AITP for external communication, though you could do it all with AITP too.

**...service metadata / API proxy / tool use   protocols like Anthropic's [Model Context Protocol](https://modelcontextprotocol.io/) (MCP), [Bitte Open Agents](https://docs.bitte.ai/agents), or [llms.txt](https://llmstxt.org/):**
These solutions are about making it easier for AI agents to use existing non-agentic APIs and services.  This is worthwhile since AI agents are still relatively uncommon in the wild.  But as these services start deploying their own AI agents, AITP defines how you or your agent should communicate with them.

There's lots more on this subject on the [Vision](VISION.md) page.

**...browser use agents like [ChatGPT Operator](https://openai.com/index/introducing-operator/), [Proxy](https://convergence.ai/), and [Rabbit LAM](https://www.rabbit.tech/lam-playground):**
Like the category above, browser use agents help 'bridge the gap' between AI agents and existing websites and services.  Browser use offers much more functionality than MCP at the expense of speed and accuracy.  We consider browser use agents to be a useful stopgap tool while we migrate to purpose-built agents communicating with AITP.

## Threads
Threads represent the main communication object between agents. A thread contains all the information exchanged in the conversation. This includes messages, participants and their capabilities.

Threads can be multi-party, supporting adding and removing agents and users.
### Why Chat Threads?
  Conversations (in-person, email, phone, chat, etc.) are a fundamental building block of human communication.  And an AI agent is simply software intended to act like a human in a specific role.  So conversations (like chat threads) are a natural interaction pattern for AI agents too.

Natural-language chat threads are universal.  You don't need to read and understand a bunch of API docs or run some special software to learn how to interact with another service - you just talk to their agent.

### Thread Transports
#### A Little Bit of History
With AITP, we're seeking to make interactions with AI agents as seamless and universal as browsing a website, sending an email, or making a phone call.

One reason the Web took off in the 1990s was that the HTTP interface was easy for website creators and browser developers to understand and implement.  Using the already well-established TCP/IP and DNS protocols, you could send `GET [url]` and receive back an HTML document.  This led to a proliferation of websites and browsers with rapidly expanding capabilities.

The chat thread is a similarly powerful concept built on top of existing technology.  For better or worse, OpenAI's APIs have become a de facto standard for other AI APIs, so we adopt the relevant portions of it here to help with adoption.
#### Supported Transports
(todo: table)
* Threads API (JSON over HTTPS)
* Emails
* Chat (Slack, WhatsApp, Telegram, Matrix is especially interesting)
* Peer-to-peer

See [examples](EXAMPLES.md) for a number of different examples how AITP can be used for various agents.

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
    content: List[str]
    # Files attached to the message.
    attachments: List[{file_id: str}]
    # The role of the entity that is creating the message: user or assistant
    role: str
    # Metadata for the message.
    metadata: dict
        # The entity that produced the message.
        actor: str


class Capability:
    schema: str


class Actor:
    """A User or Agent participating on the thread."""
    # Global agent identifier: url/<agent> or user identifier.
    id: str
    # Capabilities this actor posses.
    capabilities: List[Capability]


class Thread:
    """Represents a thread that contains messages."""
    # The identifier, which can be referenced in API endpoints.
    id: str
    # The messages in the thread.
    messages: List[Message]
    # Metadata for the message.
    metadata: dict
        # Parent thread that this was forked off. Can be null.
        parent_id: str
        # Users and Agents that are part of this thread.
        actors: List[Actor]
```

## Capabilities

Capabilities are standard for specialized messages to enable structured interactions. Agents provide which capabilities they support when joining a thread.

| ID                    | Slug                | Capability            | Description                                                                          |
| --------------------- | ------------------- | --------------------- | ------------------------------------------------------------------------------------ |
| [AITP-01](AITP-01.md) | aitp.dev/payment    | Payments              | Supporting payment requests and processing                                           |
| [AITP-02](AITP-02.md) | aitp.dev/requests   | Requests              | Requesting decisions or actions from an agent or to be displayed in a user interface |
| [AITP-03](AITP-03.md) | aitp.dev/data       | Sensitive Data        | Supporting requesting and dealing with sensitive data like passwords and addresses   |
| [AITP-04](AITP-04.md) | aitp.dev/operations | Health checks         | Supporting standard operational concerns such as healthchecks.                       |
| [AITP-05](AITP-05.md) | aitp.dev/sign       | Cryptographic signing | Supporting signing messages and transactions                                         |

Capabilities can use `Thread.messages[].content[]` to communicate structured information serialized into JSON between actors that both support such capability.

For example:
```json
{
    "messages": [
        {"role": "agent1", "content": ["{\"$schema\": \"https://aitp.dev/v1/payment.schema.json\", \"type\": \"request_payment\": {...}}"]}
    ]
}
```

## Transport

Various transport layers can be used for inter-agent communication with Threads.

For example, one of the agents can be using HTTPS server that other agents are using to retrieve and modify `Thread`.

Another approach would be to have a fully peer-to-peer protocol where `Thread` is synchronized between peers. This is currently outside of scope for the v1.

### Threads API

**Create thread**

`POST <agent id>/v1/thread`

Request body:
- `messages`: array of strings

Response:
- `thread`: A Thread object.

**Retrieve thread**

`POST <agent url>/v1/threads/{thread_id}`

Path parameters:
- `thread_id`: array of strings

Response:
- `thread`: A Thread object matching the specified ID.

### Messages API

**Create message**

`POST <agent url>/v1/threads/{thread_id}/messages`

Create a message.

Path parameters:
- `thread_id`: The ID of the thread to add the message to.

Request body:
- `role`: string. The role of the entity that is creating the message.
- `content`: string or array. 
- `attachments`: array or null. A list of files attached to the message, and the tools they should be added to.

**List messages**

`GET <agent url>/v1/threads/{thread_id}/messages`

Returns a list of messages for a given thread.

Path parameters:
- `thread_id`: The ID of the thread the messages belong to.

### Compatibility
Both the Thread and Message apis support additional properties for compatibility with the OpenAI v1 Assistants API.


## Open questions

- Authentication of agents
- Local agent interacting with agents on a hub
