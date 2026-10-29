# Open-question rubrics: shape of the private JSON

The repository is public, so the model answers and rubric points the AI grades against are **not** in it. Only the
structure (open question ids, `max` points) lives in `open-rubrics.mjs`. The content is loaded by the server, in order, from:

1. env `OPEN_RUBRICS_JSON`: the JSON text, or `base64:<base64 of the JSON>`
2. env `OPEN_RUBRICS_FILE`: a path to a JSON file
3. `open-rubrics.private.json` next to `open-rubrics.mjs` (gitignored; local only)

A question with no usable content is not graded by AI (the exam behaves as if AI grading were off for it: status `none`,
no failure line). Invalid sources are ignored and logged by name only, never by content.

## Shape

```json
{
  "<exam id>": {
    "<open question id>": {
      "modelAnswer": "text, required",
      "rubric": ["point one", "point two"],
      "context": "optional; study passage sent with the question"
    }
  }
}
```

- Exam ids: `hebrew-v2-library`, `physics-v1-assessment`. Question ids must be open questions of that exam
  (`openQuestionStructure()` in `open-rubrics.mjs`); other ids are ignored.
- `rubric`: at least one non-empty string. `context` defaults to the article paragraph named by the question's
  reference (library) or the model answer (physics).
- A fake one-question example (invented text):

```json
{ "hebrew-v2-library": { "library-15": { "modelAnswer": "FAKE example answer", "rubric": ["FAKE point one", "FAKE point two"] } } }
```

## Railway

Set `OPEN_RUBRICS_JSON` from the local file, for example
`railway variables --set "OPEN_RUBRICS_JSON=base64:$(base64 < open-rubrics.private.json | tr -d '\n')"`, together with
`OPENAI_API_KEY`. Do not commit the file; `*.private.json` is gitignored.
