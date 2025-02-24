# AITP Vision

We envision a future in which most online interactions are conducted not by users browsing websites and apps directly, but between AI agents representing people, businesses, and government entities. The **Agent Interaction and Transaction Protocol (AITP)** proposes a standard for those user-to-agent and agent-to-agent interactions, regardless of where those agents are running or how they're built. This is similar to how the current web stack (HTTP, HTML, and ECMAScript) works. These standards ensure that any compliant web browser can visit any website, regardless of its underlying architecture or creator.

## Why Agents?

To understand how AI agents will be used in the future, we find it useful to compare the benefits and drawbacks of browsing the internet vs talking to other humans.

As of early 2025, almost all internet use involves using a web browser or smartphone to access services (websites or apps) run by a third party. Behind the scenes, those services communicate with other services through structured APIs. Almost all of these services can do only what they've been coded to do, with no reasoning capability or decision-making authority. This forces a sense of structure and regularity to the online world. For instance, when shopping online, the level of personalized service you can receive is limited to discount codes and recommendation algorithms that the operators of the service have anticipated and programmed in advance. However, since online services are easier to scale, you can access a wide product catalog at a low price.

On the other hand, human interactions can be richer, more nuanced, and can result in beneficial outcomes that neither party anticipated in advance. In that shopping example, you may get a more personalized and pleasant experience when talking to a salesperson, but the selection is limited and the prices are often higher because of the increased overhead of the physical space and paid staff. Human factors also come into play, such as the stigma of asking basic (a.k.a. 'stupid') questions, concerns about wasting someone's time, and social anxiety.

AI agents present an opportunity to bridge this gap, combining the best of both worlds. We define an **AI agent** as a piece of software intended to mimic the faculties of a human, often for a specific job. Just like humans, agents tend to interact in both structured and unstructured ways with the outside world, and internally they tend to operate using some combination of reasoning/thinking processes (via an AI model) and occasionally following defined rules and workflows. With advances in AI models and supporting infrastructure, AI agents can support experiences that combine the scale and cost of online services with the flexibility and friendliness of in-person interactions. We believe this will be such a compelling advancement that it will become the predominant form of online interaction.

## The Need for Protocol

While AI agents can communicate using natural language, that alone isn't enough. Human interactions consist of more than unstructured language and nonverbal cues. We follow protocols too, dictated by our culture and experience. This includes:
* introducing yourself at a business meeting
* ordering from a menu
* tapping your card against the reader to pay

These protocols are particularly useful for common and/or ambiguous interactions. Similarly, AI agents require well-known protocols like AITP to effectively communicate with each other while maintaining the scalability benefits of current online services.

## The Agent Ecosystem

Your AI assistant shouldn’t need to learn how to use every online service directly.  Instead, it can talk to other AI agents that already know how to use those services effectively.  This creates a network of specialized agents, each bringing unique capabilities and domain knowledge.

To understand how this works, let’s compare two key protocols:

* [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) or [Bitte Open Agents](https://docs.bitte.ai/agents) define how an AI model learns about and uses services directly, through structured tools, documentation, and prompts. This works well within a trusted environment, like your personal computer and accounts.
* AITP enables AI agents to communicate with each other across trust boundaries, like how humans interact with salespeople and service representatives instead of accessing business systems directly.

These protocols are complementary. Consider buying a product online:

* Using MCP alone, your AI assistant could browse the store's website and make a purchase, just like you would with a web browser.
* Or using AITP, your assistant could talk to the store's AI sales agent to learn about products, negotiate prices, and complete the purchase.
* The sales agent might then use MCP internally to access inventory and pricing systems that aren't exposed publicly.

Just as you might prefer talking to a knowledgeable salesperson over browsing a website alone, your AI assistant can choose to engage with specialized agents to get things done more effectively.

This ecosystem enables several specialized types of agents:

* **Personal Assistants** act as your primary interface with other agents and services, understanding your preferences and handling details and negotiations on your behalf.
* **Service Agents** represent businesses and organizations, providing expertise about specific services or domains.
* **Discovery Agents** help your personal assistant find and connect with appropriate service agents based on your needs.

Just as the web and mobile revolutions created new business models, we expect agent-based interactions to fundamentally reshape online commerce. Businesses will transition from "websites with an agent" to "agent-first" architectures, and entirely new categories like Discovery Agents will emerge to serve this ecosystem. The future of the internet isn't just existing services with an AI layer \- it's a new model built around agent-to-agent interaction.