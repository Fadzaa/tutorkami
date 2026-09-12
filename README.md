# TutorKami

An adaptive learning companion for self-taught students — a generated roadmap, materials that adjust to your position in it, mastery quizzes, and a chatbot scoped to what you're currently reading.

**2nd of 48 teams · TECHCOMFEST 2025**

**[Live site](https://tutorkami.alfadzaa.tech)** · **[API docs](https://api-tutorkami.alfadzaa.tech/swagger)** — 22 paths, 30 operations, browsable

<!-- screenshot -->

**Generation flow**
```
subject + level → prompt template (initial_roadmap.txt) → OpenRouter
   → structured roadmap rows (material_id | question_id | solved)
   → material + quiz generated per row → progress gates the next row
```

> Generation runs on a paid model API and the public deployment uses a placeholder key, so roadmap, material, quiz and chatbot generation return an error. Auth, uploads, browsing and the API docs work.

---

## What it does

- Generated roadmap for a subject and level
- Material generated against your position in that roadmap
- Quizzes that gate progression rather than only scoring it
- Flashcards
- A chatbot scoped to the content open in front of you
- Progress tracking across the roadmap

## What I implemented

Team lead, product designer and prompt designer. Code ownership by area:

**Primary author** — the full Indonesian/English localisation, the loading/skeleton layer, the form components, the header.

**Shared** — the design-system primitives in `components/ui`, and page composition in `pages/main`.

**Teammate-owned** — content components, cards, modals, sidebar.

Non-code: product research, the full UI/UX across desktop and mobile, and the prompt templates the generation runs on — `initial_roadmap.txt`, `initial_question.txt`, `initial_material.txt` — which live in the [paired backend repo](https://github.com/Fadzaa/techcomfest-ai-generated-api) that the rest of the team built.

## Architecture

React SPA, Laravel API, MySQL.

**The roadmap row** carries a nullable `question_id`, a nullable `material_id` and a `solved` boolean, so a single row can represent a reading step, a question step, or both. The chatbot is scoped by a type enum plus a content id, so its context comes from a database relationship rather than a prompt preamble.

**Data fetching** is TanStack Query at page level over an API layer split by domain — [`src/api`](src/api) has `auth`, `roadmap`, `material`, `question`, `lms`, `chatbot`, `regenerate` and `storage` modules on one axios instance whose request interceptor attaches the bearer token, so no call site handles auth.

**UI state is separate from server state.** Modals are driven by dedicated hooks — `use-roadmap-modal`, `use-question-modal`, `use-generate-material-modal` — so a regeneration in flight does not tangle with the dialog that triggered it.

**Generation goes through OpenRouter** rather than a provider SDK, so the model behind a feature is configuration.

**Localisation is a generation parameter**, not only UI strings. `en.json` and `id.json` are 257 parallel lines each, and the selected language is passed into the prompt, so material is generated in that language.

## Running it locally

```bash
npm install
cp .env.example .env    # set VITE_API_BASE_URL and VITE_SECRET_KEY
npm run dev
```

## Known limitations

- No automated validation that generated output matches the structure the renderer expects — a malformed generation surfaces as a render failure rather than a caught error.
- No automated tests.
- Generation failures return a generic 400 without distinguishing a model error from a malformed response.
