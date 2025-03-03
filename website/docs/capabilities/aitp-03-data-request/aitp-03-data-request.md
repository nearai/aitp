# AITP-03: Data Request

* **Version**: 1.0.0
* **Spec Status**: Draft
* **Implementation Status**: Live on [NEAR AI](https://app.near.ai/)

:::note Auto-generated Documentation
Parts of this documentation were auto-generated from the schema and example messages by an AI model.
:::

## Overview

```mermaid
flowchart LR
    A[Agent A] -->|1: Sends request_data| B[Agent B or User]
    B -->|2: Fills form| C{Form Processing}
    C -->|3: Validates data| D[Create data response]
    D -->|4: Sends data| A
    
    style A fill:#f9d77e,stroke:#8b6914
    style B fill:#a2d2ff,stroke:#0072b2
    style C fill:#d3f8e2,stroke:#388e3c
    style D fill:#ffc8c8,stroke:#d32f2f
```

The Data Request capability enables agents to request structured form data from users or other agents, and to receive structured responses to those requests. This capability is useful when an agent needs to collect specific information in a structured format, such as contact details, shipping addresses, preferences, or any other type of form data.

## Schema

Schema URL: `https://aitp.dev/capabilities/aitp-03-data-request/v1.0.0/schema.json`

The Data Request capability defines two primary message types:
1. `request_data` - Sent by an agent to request form data
2. `data` - Sent in response to a request_data message

## Message Types

```mermaid
classDiagram
    class RequestData {
        +string id
        +string title
        +string description
        +string fillButtonLabel
        +Form form
    }
    
    class Form {
        +Array~Field~ fields
        +string json_url
    }
    
    class Field {
        +string id
        +string label
        +string description
        +string default_value
        +string type
        +Array~string~ options
        +boolean required
        +string autocomplete
    }
    
    class DataResponse {
        +string request_data_id
        +Array~FieldValue~ fields
    }
    
    class FieldValue {
        +string id
        +string label
        +string value
    }
    
    RequestData "1" --> "1" Form: contains
    Form "1" --> "*" Field: contains
    DataResponse "1" --> "1..*" FieldValue: contains
```

### Request Data

An agent sends a `request_data` message when it needs to collect structured information from the recipient.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-03-data-request/v1.0.0/schema.json",
  "request_data": {
    "id": "unique-form-id",
    "title": "Form title",
    "description": "Description of what information is needed",
    "fillButtonLabel": "Custom button text",
    "form": {
      "fields": [
        {
          "id": "field-id",
          "label": "Field label",
          "description": "Help text",
          "default_value": "Default value",
          "type": "text|number|email|textarea|select|combobox|tel",
          "options": ["Option 1", "Option 2"],
          "required": true|false,
          "autocomplete": "autocomplete hint"
        },
        // More fields...
      ]
    }
  }
}
```

Alternatively, the form can reference an external JSON specification via URL:

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-03-data-request/v1.0.0/schema.json",
  "request_data": {
    "id": "unique-form-id",
    "title": "Form title",
    "description": "Description of what information is needed",
    "fillButtonLabel": "Custom button text",
    "form": {
      "json_url": "https://example.com/form-definition.json"
    }
  }
}
```

#### Field Types

The `type` field determines how the input should be presented to the user:

1. `text` (default) - Standard text input
2. `number` - Numeric input
3. `email` - Email address input with validation
4. `textarea` - Multi-line text input
5. `select` - Dropdown selection from options
6. `combobox` - Combination of dropdown and text input
7. `tel` - Telephone number input

Each field type has appropriate validation built in.

### Data Response

A client sends a `data` message in response to a `request_data`, providing the requested information.

```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-03-data-request/v1.0.0/schema.json",
  "data": {
    "request_data_id": "id-from-the-request",
    "fields": [
      {
        "id": "field-id",
        "label": "Field label",
        "value": "User-provided value"
      },
      // More field values...
    ]
  }
}
```

## Examples

### Basic Form Request

Request:
```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-03-data-request/v1.0.0/schema.json",
  "request_data": {
    "id": "5aabab1d-c053-49fc-bdd1-f432c89a1664",
    "title": "Your Favorites",
    "description": "This info will help us recommend better products.",
    "fillButtonLabel": "Fill out favorites",
    "form": {
      "fields": [
        {
          "id": "favorite_color",
          "default_value": "Red",
          "label": "Favorite Color",
          "options": ["Red", "Green", "Blue"],
          "required": true,
          "type": "select"
        },
        {
          "id": "favorite_number",
          "label": "Favorite Number",
          "required": false,
          "type": "number"
        },
        {
          "id": "favorite_email",
          "label": "Favorite Email",
          "required": true,
          "type": "email"
        }
      ]
    }
  }
}
```

Response:
```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-03-data-request/v1.0.0/schema.json",
  "data": {
    "request_data_id": "5aabab1d-c053-49fc-bdd1-f432c89a1664",
    "fields": [
      {
        "id": "favorite_color",
        "label": "Favorite Color",
        "value": "Blue"
      },
      {
        "id": "favorite_number",
        "label": "Favorite Number",
        "value": "7"
      },
      {
        "id": "favorite_email",
        "label": "Favorite Email",
        "value": "user@example.com"
      }
    ]
  }
}
```

### External Form Definition

Request:
```json
{
  "$schema": "https://aitp.dev/capabilities/aitp-03-data-request/v1.0.0/schema.json",
  "request_data": {
    "id": "c00d9f0c-89a7-4a74-8c57-0b9aa16be348",
    "title": "Shipping Info (International)",
    "description": "Great! Let's start with your shipping info.",
    "fillButtonLabel": "Fill out shipping info",
    "form": {
      "json_url": "https://app.near.ai/api/v1/aitp/data/forms/shipping_address_international.json"
    }
  }
}
```
