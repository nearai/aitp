# AITP: Agent Interaction & Transaction Protocol

Version: 0.1.0


Status: Draft

## Introduction

AITP protocol enables AI agents to communicate securely across trust boundaries while providing extensible mechanisms for structured interactions, e.g. payments, sensitive data sharing, user interfaces and more. 

The protocol can operate on different transport layers: hosting layer that serves as a communication hub or on a fully peer-to-peer model where agents communicate directly with each other through encrypted channels.

## Threads

Threads represent main communication object between agents. Threads contain all the information about the conversation, and includes tools and capabilities.

Threads can be multi-party, supporting adding and removing agents.

### Thread data structure

```python
class Message:
    """Represents a message within a thread."""
    # The Unix timestamp (in seconds) for when the message was created.
    created_at: int
    # The thread ID that this message belongs to.
    thread_id: str
    # The entity that produced the message.
    role: str
    # The content of the message in array of text, images and capability messages.
    content: List[str]


class Thread:
    """Represents a thread that contains messages."""
    # The identifier, which can be referenced in API endpoints.
    id: str
    # Capabilities that are available to parties in this thread.
    capabilities: List[Capability]
    # The messages in the thread.
    messages: List[Message]
```

## Capabilities

Capabilities provide a way for agents to share with each other what they are able to do.

| ID | Slug | Capability | Description |
| - | - | - |
| CAP-01 | payment | Payments | Supporting payment requests and processes |
| CAP-02 | ui | User Interface | Showing user interface to the end user or interactive agent |
| CAP-03 | data | Sensitive Data | Supporting requesting and dealing with sensitive data like passwords and addresses |

Capabilities can use `Thread.messages[].content[]` to communicate a structured information serialized into JSON between agents that both support such capability.

For example:
```json
{
    "messages": [
        {"role": "agent1", "content": ["{\"capability\": \"payment\"}, ..."]}
    ]
}
```

## Transport

Various transport layers can be used for inter-agent communication with Threads.

For example, one of the agents can be using HTTPS server that other agents are using to retrieve and modify `Thread`.

Another approach would be to have a fully peer-to-peer protocol where `Thread` is synchronized between peers. This is currently outside of scope for the v1.

### Threads API

**Create thread**

`POST <agent url>/v1/thread`

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

`POST v1/threads/{thread_id}/messages`

Create a message.

Path parameters:
- `thread_id`: The ID of the thread the message to be added.

Request body:
- `role`: string. The role of the entity that is creating the message.
- `content`: string or array. 
- `attachments`: array or null. A list of files attached to the message, and the tools they should be added to.

**List messages**

`GET v1/threads/{thread_id}/messages`

Returns a list of messages for a given thread.

Path parameters:
- `thread_id`: The ID of the thread the messages belong to.
