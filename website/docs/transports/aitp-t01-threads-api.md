# AITP-T01: Threads API

* Spec Status: Draft
* Implementation Status: Live on NEAR AI

AITP-T01 is an AITP transport using a JSON API over HTTPS. It is inspired by, and intended to be compatible with, the
OpenAI Assistants 'v2' API.

Most features of the AITP-T01 transport are simply using the standard properties of any HTTPS API:

| Transport Requirement   | AITP-T01 Solution         |
|-------------------------|---------------------------|
| Service identification  | Endpoint URLs             |
| Service location        | DNS+HTTP                  |
| Message encryption      | TLS (HTTPS)               |
| Thread state management | Service responsibility    |
| Capability exchange     | Part of `POST /v1/thread` |


Since the Threads API is stateful, in AITP-T01 the HTTP server is responsible for tracking the state of all active
threads with clients. The benefits of this approach are:

1. The client is never trusted to provide an accurate thread history; this makes the thread 'tamper-proof' by a malicious client.
2. The OpenAI Assistants API is already well-understood, even outside the OpenAI community.

And the drawbacks are:

1. Thread management can be complicated to implement, especially at large scale.
2. Storing thread state and history might incur storage and bandwidth fees,

## Threads API

### Create thread

`POST <agent id>/v1/thread`

Request body:
- `messages`: array of strings
- `metadata`: object
    - `actors`: array of objects
      - `id`: string identifier for this thread participant, e.g. a username or agent ID
      - `client_id`: string identifier for the UI or framework making this call
      - `capabilities`: an array of strings, each a URL to the JSON schema file for a capability

Response:
- `thread`: A Thread object.

### Retrieve thread

`POST <agent url>/v1/threads/{thread_id}`

Path parameters:
- `thread_id`: array of strings

Response:
- `thread`: A Thread object matching the specified ID.

## Messages API

### Create message

`POST <agent url>/v1/threads/{thread_id}/messages`

Create a message.

Path parameters:
- `thread_id`: The ID of the thread to add the message to.

Request body:
- `role`: string. The role of the entity that is creating the message.
- `content`: string or array.
- `attachments`: array or null. A list of files attached to the message, and the tools they should be added to.

### List messages

`GET <agent url>/v1/threads/{thread_id}/messages`

Returns a list of messages for a given thread.

Path parameters:
- `thread_id`: The ID of the thread the messages belong to.

## Compatibility
Both the Thread and Message APIs support additional properties for compatibility with the OpenAI v2 Assistants API.

