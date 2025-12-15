# Agent Templates

## Architecture

[LanghChain](./docs/langchain.md)
![Architecture](./docs/agent.png)

## Todos

- [x] env
- [x] rdb (sqlite3)
- [x] vector db (chroma)
- [x] openai (llm)

## Folder Architecture

```sh
    |- agents     ## Agent implementations
    |- configs    ## Configuration files
    |- interfaces ## Interface definitions
    |- prompts    ## Prompt templates
    |- stores     ## Data stores
    |- tools      ## Tool definitions
```

## Setup

```sh
npm init -y && npm install typescript && npx tsc --init
```
