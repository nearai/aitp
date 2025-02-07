# AITP: Agent Interaction & Transaction Protocol

Version: 0.1.0


Status: Draft

## Introduction

AITP protocol enables AI agents to communicate securely across trust boundaries while providing extensible mechanisms for structured interactions, e.g. payments, sensitive data sharing, user interfaces and more. 

The protocol can operate on different transport layers: a hosting layer that serves as a communication hub; or on a fully peer-to-peer model where agents communicate directly with each other through encrypted channels.

## Threads

Threads represent the main communication object between agents. Threads contain all the information exchanged in the conversation. This includes messages, participants and their capabilities.

Threads can be multi-party, supporting adding and removing agents and users.

### Thread data structure

```python
class Message:
    """Represents a message within a thread."""
    # The Unix timestamp (in seconds) for when the message was created.
    created_at: int
    # The thread ID that this message belongs to.
    thread_id: str
    # The entity that produced the message.
    actor: str
    # The content of the message in an array of text, and capability messages.
    content: List[str]
    # Files attached to the message.
    attachments: List[str]
    # Optional metadata for the message.
    metadata: dict


class Capability:
    capability: str
    schema: str


class Actor:
    """Actor of the thread."""
    # Global agent identifier: url/<agent> or user identifier.
    id: str
    # Capabilities this actor posses.
    capabilities: List[Capability]


class Thread:
    """Represents a thread that contains messages."""
    # The identifier, which can be referenced in API endpoints.
    id: str
    # Parent thread that this was forked off. Can be null.
    parent_id: str
    # Users and Agents that are part of this thread.
    actors: List[Actor]
    # The messages in the thread.
    messages: List[Message]
```

## Capabilities

Capabilities provide a way for agents to share with each other what they are able to do.

| ID | Slug | Capability | Description |
| - | - | - | - |
| AITP-01 | aitp.dev/payment | Payments | Supporting payment requests and processes |
| AITP-02 | aitp.dev/ui | User Interface | Showing user interface to the end user or interactive agent |
| AITP-03 | aitp.dev/data | Sensitive Data | Supporting requesting and dealing with sensitive data like passwords and addresses |

Capabilities can use `Thread.messages[].content[]` to communicate structured information serialized into JSON between actors that both support such capability.

For example:
```json
{
    "messages": [
        {"role": "agent1", "content": ["{\"$schema\": \"https://aitp.dev/payment.schema.json\", \"type\": \"request_payment\": {...}}"]}
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
- `thread_id`: The ID of the thread the message to be added.

Request body:
- `role`: string. The role of the entity that is creating the message.
- `content`: string or array. 
- `attachments`: array or null. A list of files attached to the message, and the tools they should be added to.

**List messages**

`GET <agent url>/v1/threads/{thread_id}/messages`

Returns a list of messages for a given thread.

Path parameters:
- `thread_id`: The ID of the thread the messages belong to.


## Open questions

- Authentication of agents
- Local agent interacting with agents on a hub
