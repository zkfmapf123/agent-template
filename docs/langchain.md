# LangChain

## Models

- 여러가지의 LLM을 Langchain을 이용해서 쉽게 사용할 수 있게 해줌
- 각 LLM 구성은 다르지만 Models을 사용해서 동일하게 New Client 형태로 활용

## Prompt (LLM 의 대한 활용이 높아짐)

- langchain 에서 LLM 에 전달되는 입력을 구조화 및 최적화
- <b>예를들면, 주제만 바꿔가면서 질의할 때 특정부분을 매개변수로 사용이 가능함</b>

### Prompt template (default)

```python
prompt_template = PromptTemplate.from_template('Tell me a joke about {topic}')
prompt_template.invoke({'topic': 'cats'})
```

### ChatPromptTemplate

- 사용자와 시스템을 구분해서 지엉

```python
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("user", "Tell me a joke about {input}"),
])
prompt_template.invoke({'topic': 'cats'})
```

## Output Parser

- AI의 답변을 구조화된 형식으로 변환해서 출력 함
- <b>Output 변환을 통해 다른 구성과 연계가 가능함 (ex. JsonParser)</b>
- 완벽하지는 않지만 그래도 나쁘진않음 (에러는 좀 코드를 들어가야 함)
- Json, XML, CSV, OutputFixing, YAML...

## Text Splitters, Vector Stores, Document Loadres

- Langchain에서는 Document 형태로 값을 가져옴 (텍스트)
- 문서의 메타데이터를 통해서 분류가 가능 (가져기오기, 저장...) - <b>Document Loadres</b>
- 이러한 Document를 여러개의 Chunk로 나누는것을 - <b>Text Splitters</b>
- 이런 chunk를 vector에 저장 - <b>Vector Stores</b>

## LangChain의 Chain이란?

- 위 컴포넌트를 하나의 Chain으로 묶음 (LLMchain)
- LCEL (Langchain expression Language) 를 사용해서 좀더 직관적으로 구성해라... - TS 에서도 가능함

```js

// LCEL Chain
const model = new ChatOpneAI({model: })
const prompt = new PromptTemplate({
    template: 'Tell me a joke about {topic}',
    inputVariables: ['topic']
})
const chain = new LLMChain({
    llm: model,
    prompt: prompt
})
```

- <b>LCEL을 사용함으로써 아래와 같은 장점을 볼 수 있음</b>
  - 스트리밍
  - 비동기
  - 병렬
  - 재시도 / 풀백
  - 입출력 스키마
  - 중간 과정 확인
  - Langsmith 추적
  - LangServe 배포
