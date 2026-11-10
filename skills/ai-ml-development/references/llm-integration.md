# ai-ml-development: LLM Integration

Part of the `ai-ml-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## LLM Integration

### OpenAI API

```python
from openai import OpenAI

client = OpenAI()

def chat_completion(messages: list[dict], model: str = "gpt-4") -> str:
    response = client.chat.completions.create(
        model=model,
        messages=messages,
    )
    return response.choices[0].message.content

# Function calling
def extract_entities(text: str) -> dict:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": text}],
        tools=[{
            "type": "function",
            "function": {
                "name": "extract_entities",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "people": {"type": "array", "items": {"type": "string"}},
                        "places": {"type": "array", "items": {"type": "string"}},
                    },
                },
            },
        }],
    )
    return response.choices[0].message.tool_calls[0].function.arguments
```

### Anthropic Claude API

```python
import anthropic

client = anthropic.Anthropic()

def claude_completion(prompt: str, model: str = "claude-sonnet-5-5") -> str:
    message = client.messages.create(
        model=model,
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text
```

### LangChain

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4")
prompt = ChatPromptTemplate.from_template("Summarize: {text}")
chain = prompt | llm | StrOutputParser()

result = chain.invoke({"text": "Long document here..."})
```

---
