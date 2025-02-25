# AITP-02: Decisions Schema Reference

* **Version**: 1.0.0
* **Spec Status**: Draft

:::note Auto-generated Documentation
Parts of this documentation were auto-generated from the schema and example messages by an AI model.
:::

## Schema URL

```
https://aitp.dev/capabilities/aitp-02-decisions/v1.0.0/schema.json
```

## Schema Overview

The AITP-02 Decisions capability defines a JSON schema that supports two main message types:

1. **Request Decision** - Asking for a choice to be made
2. **Decision** - Responding with the chosen option(s)

## Complete Schema Definition

The schema is structured as an "anyOf" with two possible object types.

### Schema Root Structure

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "anyOf": [
    {
      // Decision response schema
    },
    {
      // Request decision schema
    }
  ]
}
```

### Request Decision Schema

```json
{
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string",
      "format": "uri"
    },
    "request_decision": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "type": {
          "type": "string",
          "enum": ["products", "checkbox", "radio", "confirmation"],
          "default": "radio"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "short_variant_name": {
                "type": "string"
              },
              "image_url": {
                "type": "string",
                "format": "uri"
              },
              "description": {
                "type": "string"
              },
              "quote": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "const": "Quote"
                  },
                  "quote_id": {
                    "type": "string"
                  },
                  "payee_id": {
                    "type": "string"
                  },
                  "payment_plans": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "plan_id": {
                          "type": "string"
                        },
                        "plan_type": {
                          "type": "string",
                          "const": "one-time"
                        },
                        "amount": {
                          "type": "number"
                        },
                        "currency": {
                          "type": "string",
                          "const": "USD"
                        }
                      },
                      "required": [
                        "plan_id",
                        "plan_type",
                        "amount",
                        "currency"
                      ],
                      "additionalProperties": true
                    }
                  },
                  "valid_until": {
                    "type": "string",
                    "format": "date-time"
                  }
                },
                "required": [
                  "type",
                  "quote_id",
                  "payee_id",
                  "payment_plans",
                  "valid_until"
                ],
                "additionalProperties": true
              },
              "reviews_count": {
                "type": "integer"
              },
              "five_star_rating": {
                "type": "number",
                "minimum": 0,
                "maximum": 5
              },
              "url": {
                "type": "string",
                "format": "uri"
              },
              "variants": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      // References the same schema as parent options
                    },
                    "name": {
                      // References the same schema as parent options
                    },
                    "short_variant_name": {
                      // References the same schema as parent options
                    },
                    "image_url": {
                      // References the same schema as parent options
                    },
                    "description": {
                      // References the same schema as parent options
                    },
                    "quote": {
                      // References the same schema as parent options
                    },
                    "reviews_count": {
                      // References the same schema as parent options
                    },
                    "five_star_rating": {
                      // References the same schema as parent options
                    },
                    "url": {
                      // References the same schema as parent options
                    }
                  },
                  "required": ["id"],
                  "additionalProperties": true
                }
              }
            },
            "required": ["id"],
            "additionalProperties": true
          },
          "minItems": 1
        }
      },
      "required": ["id", "options"],
      "additionalProperties": true
    }
  },
  "required": ["$schema", "request_decision"],
  "additionalProperties": true
}
```

### Decision Response Schema

```json
{
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string",
      "format": "uri"
    },
    "decision": {
      "type": "object",
      "properties": {
        "request_decision_id": {
          "type": "string"
        },
        "options": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "quantity": {
                "type": "number"
              }
            },
            "required": ["id"],
            "additionalProperties": false
          },
          "minItems": 1
        }
      },
      "required": ["options"],
      "additionalProperties": true
    }
  },
  "required": ["$schema", "decision"],
  "additionalProperties": true
}
```

## Field Descriptions

### Request Decision Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema: `https://aitp.dev/capabilities/aitp-02-decisions/v1.0.0/schema.json` |
| `request_decision` | object | Yes | Container for the decision request |
| `request_decision.id` | string | Yes | Unique identifier for this decision request |
| `request_decision.title` | string | No | Title for the decision UI |
| `request_decision.description` | string | No | Detailed explanation of what decision is being requested |
| `request_decision.type` | string | No | Type of decision UI to display. One of: "radio" (default), "checkbox", "confirmation", "products" |
| `request_decision.options` | array | Yes | Array of available options to choose from |
| `request_decision.options[].id` | string | Yes | Unique identifier for this option |
| `request_decision.options[].name` | string | No | Display name for this option |
| `request_decision.options[].description` | string | No | More detailed explanation of this option |
| `request_decision.options[].image_url` | string | No | URL to an image representing this option |
| `request_decision.options[].short_variant_name` | string | No | Shorter name for product variants |
| `request_decision.options[].reviews_count` | integer | No | Number of reviews for this product |
| `request_decision.options[].five_star_rating` | number | No | Rating on a scale of 0-5 |
| `request_decision.options[].url` | string | No | URL to more information about this option |
| `request_decision.options[].quote` | object | No | Payment information for this option |
| `request_decision.options[].quote.type` | string | Yes | Must be "Quote" |
| `request_decision.options[].quote.quote_id` | string | Yes | Unique identifier for this quote |
| `request_decision.options[].quote.payee_id` | string | Yes | Identifier for the recipient of payment |
| `request_decision.options[].quote.payment_plans` | array | Yes | Array of payment options |
| `request_decision.options[].quote.payment_plans[].plan_id` | string | Yes | Identifier for this payment plan |
| `request_decision.options[].quote.payment_plans[].plan_type` | string | Yes | Type of payment plan ("one-time") |
| `request_decision.options[].quote.payment_plans[].amount` | number | Yes | Amount to pay |
| `request_decision.options[].quote.payment_plans[].currency` | string | Yes | Currency code ("USD") |
| `request_decision.options[].quote.valid_until` | string | Yes | Expiration date/time for this quote |
| `request_decision.options[].variants` | array | No | Array of product variants |
| `request_decision.options[].variants[].*` | object | - | Same structure as parent options |

### Decision Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | Yes | URI reference to the schema: `https://aitp.dev/capabilities/aitp-02-decisions/v1.0.0/schema.json` |
| `decision` | object | Yes | Container for the decision response |
| `decision.request_decision_id` | string | No | Reference to the ID of the request being responded to |
| `decision.options` | array | Yes | Array of selected options |
| `decision.options[].id` | string | Yes | ID of the selected option |
| `decision.options[].name` | string | No | Name of the selected option |
| `decision.options[].quantity` | number | No | Quantity selected (for product options) |