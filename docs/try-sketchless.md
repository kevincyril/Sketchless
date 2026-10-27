# Try Sketchless locally

Run `Start-Sketchless.ps1` from the project folder and keep its terminal open. Open http://127.0.0.1:8000/. If the browser reports a refused connection, run the launcher again and wait for the startup message.

1. Choose **Brainstorm** when you want help deciding, **Precise part** for a box, tray or bracket, or **Concept assembly** for a visual design with separate components.
2. Describe the purpose, main components, and approximate size. Example buttons replace the draft; edit it to make it yours.
3. Press **Send**. Enter adds a new line. Reply choices fill the draft and still need Send.
4. For a concept, answer any questions and review the requirements, proposed parts and assumptions. Corrections revise the pending proposal and show **What changed**. They still need your approval. Use **Preview proposed design** to rotate the proposed shapes before any CAD build. Close it to correct the plan through Send, then press **Build this concept** when ready.
5. Rotate and zoom the model. Select a component to scope your next edit, or clear selection to edit the whole design. Concept edits need review and approval too.
6. Use **My designs** to name and save a planning conversation or model. Conversations and models stay on this computer; unsent text drafts stay in this browser. Manual size changes need a build before they become a saved model version.
7. Use **Earlier versions** to restore a successful build. **Start over** keeps the previous conversation and models in My designs and opens a fresh workspace.
8. Download STEP for CAD, STL for mesh tools, or assembly GLB for visual sharing. Editable JSON retains parameters and components; it does not include the conversation.

## AI setup

Use `Configure-SketchlessAI.ps1` privately on your computer. It reads the key without displaying it and stores it in the ignored backend `.env`. Only confirm Free Tier when the Google AI Studio project has no linked billing. Restart Sketchless after configuring. No paid provider fallback is used. Quota failures leave the last successful model available; wait for your quota to reset before sending again.

## What to judge

Check whether the proposed purpose, form, tasks, dimensions and components match your intent before building. Concept assemblies are CAD solids arranged as a visual concept. They do not prove a robot can cook, that mechanisms move, or that parts can be manufactured or safely used. Cleaner component checks verify named visual features, not cleaning performance. Try your own brief and inspect the result; recorded automated checks cannot establish design quality for every prompt.
