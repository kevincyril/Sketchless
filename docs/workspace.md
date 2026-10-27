# Guided workspace

The primary experience is a description composer with actual conversation history. Configured live AI generates from the description; manual shape and measurement controls are optional. Without credentials, the labeled structured demo remains available for Open box, Shallow tray, and L-bracket. The 3 mm wall/base defaults remain disclosed in the optional thickness summary. Errors explain what to change. Successful generation exposes Download with plain-language file purposes and a Change length control. Unbuilt size changes can be undone.

The model gets a larger, quieter preview. Drag/zoom, Fit model, Reset view and standard viewing directions are preserved. The extra views are tucked into More views. Visible dimensions always describe the last accepted artifact. Failed edits preserve that model and downloads. On mobile, a successful creation scrolls to the result (respecting reduced motion).

Geometry checks, previous requests, project name, and actual tool traces live in Details. This uses a native modal dialog with focus containment and Escape dismissal. No activity or validation results are invented. The trained classifier now routes bracket requests to a third CAD family. The live interpreter accepts a separate strict bracket schema; relative edits preserve hole settings. Demo mode labels its structured-only experience; live mode adds the chat composer with explicit Send submission and multiline typing.

## Running browser checks

Start the application on port 8000, then run Playwright from frontend:

```powershell
.\.venv\Scripts\python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000
# second terminal
cd frontend
npx playwright test
```

The config uses installed Chrome at C:/Program Files/Google/Chrome/Application/chrome.exe. Screenshots are in docs/screenshots and the machine-readable report is docs/browser-results.json. The real CAD scenario verifies creation, editing, hidden advanced controls, downloads, persistence, modal dismissal, camera controls, error feedback and desktop/mobile sizing. The failure scenario explicitly mocks job and preview failures; the live-composer scenario mocks provider-facing responses. No paid provider call is performed.

The app server is kept running for the user after this UI update.


L-bracket controls: foot length, width, upright height, shared plate thickness, holes per side (0/1/2), and hole diameter. Hole positions are automatic and move with resized arms. The same preview/download/result flow is used for all three parts. Family-specific validation explains insufficient hole spacing. The bracket browser scenario covers real geometry, invalid widths, relative edits, persistence, removal of holes, downloads, and responsive layouts.


## Saved designs and versions

My designs opens a native accessible dialog with Saved designs and Earlier versions tabs. Name/save the accepted model, open another saved design, or start a new one. The current successful model is kept before switching. Unsaved measurement changes require an explicit in-app confirmation before being replaced. Earlier versions restore the actual saved spec/artifacts, preserving every other build. No new generation events are inserted for restoration.

Portable version-1 JSON design files contain name and typed parameters, not geometry. Imports are limited to 64 KB and validated on the backend before a new draft opens; the user must select Create my model to generate it. Export links use the displayed build's ID so measurements stay consistent with the preview. STEP/STL downloads remain in the model's Download menu.

Start-Sketchless.ps1 runs the local application, reuses an existing Sketchless server and builds the frontend when source files are newer than the built index. It keeps the server in the foreground and prints its local URL. The script does not download dependencies or change system execution-policy settings.


## Prompt-first entry

The description composer is now the first control. With configured live AI, the fixed primary action submits the description (never an implicit form spec), and manual measurements are collapsed under an optional section with their own explicit build action. Only the Send button submits; Enter adds a line. When AI is unavailable, the prompt remains visible with a disabled AI action and a clear explanation; structured demo controls stay available. API config returns only an ai_configured boolean, never the key. This indicates backend configuration, not a tested provider connection. Real Gemini generation and a conversational edit were verified after the user configured the backend key and confirmed a Free Tier project with no billing linked.


## Conversation and live setup verification

Actual prompt requests, clarification messages and build results appear inline. Restoring a version removes abandoned future prompts from the context passed to subsequent interpretation. Configure-SketchlessAI.ps1 accepts a hidden local key, preserves other settings and makes no API call. Restart the existing server after configuration. The free-tier scripts.verify_live command requires --confirm-free-tier and local GEMINI_FREE_TIER_CONFIRMED=true; it is excluded from ordinary verification. The confirmation requires a Google AI Studio project without billing linked.

Offline integration exercises the real Google Gen AI SDK against an httpx mock transport, including clarification, repair feedback, relative edits, restored context, family switches, provider-error redaction and actual CAD/exports. This does not establish live provider quality.


## Gemini provider

Backend-only GEMINI_API_KEY and configurable GEMINI_MODEL replace OpenAI. Default gemini-3.5-flash-lite supports function calling and structured outputs and has a documented free text tier. The legacy gemini-2.5-flash-lite is optionally configurable but restricted for new users by Google. Unknown/paid-only model IDs are rejected. Endpoint, API key and Developer API backend are explicitly selected to prevent ambient Google/Vertex settings from taking over. SDK retries and automatic function execution are disabled. Model content including thought signatures is preserved during bounded repair; hidden thoughts are never surfaced.

429 errors explain exhausted free quota/rate limits, preserve the accepted model and stop without fallback. The application cannot determine billing status from the key: setup requires the user to confirm Free Tier with no linked billing, rather than claiming an automatic free-only billing guarantee. No billing actions are included. The hidden-input PowerShell helper does not call the API, print the key or put it in command-line history. .env remains ignored. Real free-tier generation and a conversational edit passed on 2026-10-24; results are recorded in live-verification.json.


## Prompt guidance and recovery

Configured live mode offers three editable starting descriptions (electronics box, desk tray, mounting bracket). After a successful build, suggestions offer relative size changes and a family-specific wall/hole edit. They fill and focus the composer; they never submit or consume Gemini quota. Suggestions remain visible while editing or answering clarification; choosing another replaces the entire draft without submitting.

Unsent description drafts are stored in browser localStorage separately for each session, capped at 3000 characters. They survive refresh and switching saved designs. Successful request submission clears the draft; a failed HTTP submission retains it. Drafts are browser-local and excluded from portable design files. Persisted clarification/failure status is recovered on reload when it belongs to the current accepted version. Restoring an older version takes precedence over abandoned future request status.

Browser checks now force an offline config for ordinary structured scenarios, independent of the developer's live key. Prompt scenarios explicitly mock model-facing requests. No real provider requests are needed for these UI regressions.


## Concept assemblies

The existing workspace now distinguishes precise parts from concept assemblies, with automatic routing and an optional explicit workflow choice. Primitive robots, tables, stands and custom scenes use an authoritative typed scene rather than a separate preview-only mesh. The preview consumes actual CAD tessellation. A compact component list supports raycast/list selection, subtree highlighting and selected-only edits, with component dimensions and local transforms shown. Selection scope is enforced server-side. Active version IDs/numbers and export links follow the same accepted geometry.

Concept exports include STEP assembly solids, multi-body STL, visual GLB and editable scene JSON. Imports validate and show a scene draft, then Rebuild imported scene constructs it without AI. Precise manual controls and their prior checks remain. Concept assumptions and limits are visible; there is no claim of mechanical or printability validation. Static previews render on camera/selection/resize/model changes rather than continuously.

Clarification for essential robot/table/stand requirements is explicitly gated before a model call. Use sensible defaults is supported. Submitted prompts are restored for editing after failed/quota jobs. Restore requests handle both immediate and polled terminal responses; fetching the restored artifact precedes publishing terminal poll state to avoid canceling the viewer update. Successful builds have immutable parent version IDs; restoration follows that parent when asked conversationally. Context excludes abandoned branches and stale base version edits are rejected.

See concepts.md for tested prompts, transform conventions, tool limits and verification evidence.


## Visible workflow choices and Send button

The workflow dropdown is replaced by three visible radio cards: Brainstorm, Precise part, and Concept assembly. Each explains what selecting it does. The description composer has its own visible Send button; Enter adds a line and never submits the description. Live prompts use that composer button; manual CAD generation and imported-scene rebuilding retain their footer actions. Choices are disabled during generation, and Send is disabled for empty input or unavailable AI.


## Workflow-dependent interface

Choosing a workflow now changes the introduction, supported scope, composer label/placeholder, Send button wording and example descriptions. Precise part opens shape/dimension controls and only shows part examples. Concept assembly hides precise controls and only shows concept examples. Auto offers both. The selected workflow is included in AI request payloads. Switching keeps the accepted model and its details intact, resets selection/pending UI status, and restores a separate unsent draft per workflow and design. Choice and drafts persist across refresh.


## Start over

A visible Start over button in the header opens a fresh session with an empty preview, conversation and composer; default workflow/dimensions, no selection/import, and reset editing controls. It is disabled during generation/reset. Unsent workflow drafts, unbuilt dimensions or imported scene drafts prompt for confirmation. Cancel leaves the workspace intact. The previous successful design is kept under My designs before switching; old sessions/artifacts/drafts are not deleted. Failed session creation leaves the current workspace available and shows the error. Reset itself makes no model call.


## Readable editor layout

The editor is wider (460 px on larger desktops), uses larger type, shorter introduction/scope text and three side-by-side workflow cards with concise descriptions. The composer and explicit Send action precede example choices and history. Clarification questions appear immediately above the composer. Examples stay available while editing.

The left editor uses ordinary page scrolling instead of its own nested scroll container. The 3D model stays alongside the editor on desktop using sticky positioning; mobile stacks the editor and preview. The latest conversation turn is shown below controls, with earlier recent turns under an expandable Earlier conversation section. Conversation text no longer has an internal scroll area or automatic scroll jumps. Component lists retain their own bounded scroll region. Existing button-only sending, workflow-specific drafts, part controls, selection and exports are preserved.


## Brainstorm and cleaner design

The automatic workflow is named Brainstorm. The Robot vacuum starter is available in Brainstorm/Concept assembly but not Precise part; examples use explicit family metadata rather than positional array slices. The current layout, persistent options, button-only Send behavior and per-workflow drafts are unchanged. Cleaner requests now have appliance-specific clarification and a dedicated editable robot-vacuum creation tool. A saved Refined home cleaner example supports direct inspection without another provider call. See concepts.md for actual verified scope and limitations.


## Understand before building

The composer now first clarifies a robot's intended purpose/form/tasks, including dedicated cooking-robot questions. AI concept creation/editing produces a review card with the proposed name, main dimensions, components and assumptions. Build this concept explicitly approves; Send handles questions/corrections. No CAD occurs before confirmation, and defaults do not bypass it. Pending review survives refresh; the old accepted model is retained. Typed unambiguous approval is also supported. Superseded, cross-session and stale-base confirmations are rejected by the backend. Structured/manual generation and imported-scene rebuilding continue using their existing explicit build actions.


## Correction-aware requirements review

The proposal card separates detected user requirements (purpose, form, tasks, size) from the proposed model/components. The requirement extractor records user statements rather than inferring working mechanical capability. Cooking clarification asks only for fields still missing, including across several replies. Corrections such as no chopping, only stirring remove the rejected task. Negated forms and refusal of default settings are respected; rejecting assumed defaults does not erase explicitly supplied measurements.

An explicit change to a different product purpose drops the obsolete brief from interpretation context. Ordinary dimension corrections preserve the original purpose/tasks. Explicit replacement may propose a new recipe/custom scene while retaining the current accepted model until approval; ordinary edits and selected-only actions still cannot silently replace the whole recipe. Proposed geometry can still be an imperfect interpretation, which is why user review remains required.

Build this concept is disabled while an unsent composer message exists; send or clear that message first so corrections are not accidentally ignored. Pending requirements and proposal persist with the job across refresh. Routine tests use mocked interpretation; no live model-quality claim is added by these requirement-handling checks.


## Guided clarification replies

Clarification can now include a summary of sent requirements and optional reply suggestions for the first missing field. Cooking requests progress through form, tasks, then size; default size is not asked again if already supplied. Cleaner type/size, generic robot purpose and basic layout questions also have draft suggestions where applicable. These are deterministic UI aids, not model reasoning or model-generated progress.

Choosing a suggestion replaces the composer text, focuses it and highlights the matching option. It never submits, approves, calls Gemini or builds geometry. Options remain available for changing the draft. The user can edit freely and must press Send. Sent answers and the next missing-field suggestions persist in the session job across refresh. The proposal approval stage remains separate and mandatory. Known task combinations are examples, not claims of mechanically validated cooking ability.
