# Recursive Self-Improving Agents

Source: CB recommendation in `#research` on 2026-06-13 for Revenants recursive self-improving AI agent work.

## Core Materials

### [Reflexion](https://openreview.net/pdf?id=vAElhFcKW6)

- **Source:** OpenReview PDF
- **Project use:** Revenants memory, failed-run reflection, review notes

Agents store verbal lessons from failures and reuse them later. This maps directly to Revenants trace capture, blocker notes, and review-derived lessons.

---

### [Self-Refine](https://arxiv.org/abs/2303.17651)

- **arXiv:** 2303.17651
- **Project use:** Bounded self-repair loop

Generate -> critique -> refine without model training. Useful for constrained self-repair passes where persistent changes remain evaluator-gated.

---

### [ExpeL](https://arxiv.org/abs/2308.10144)

- **arXiv:** 2308.10144
- **Project use:** Tool-failure and PR-review learning

Agents extract natural-language lessons from prior runs and retrieve them during future tasks. This maps cleanly to Revenants lessons and workflow retrieval.

---

### [Agent Workflow Memory](https://arxiv.org/abs/2409.07429)

- **arXiv:** 2409.07429
- **Project use:** Reusable workflow induction

Induces reusable workflows from past trajectories. Strong fit for storing "when this task class appears, follow this lane" operational patterns.

---

### [Voyager](https://arxiv.org/abs/2305.16291)

- **arXiv:** 2305.16291
- **Project use:** Skill-library pattern

Automatic curriculum, skill library, and iterative code refinement. Less directly applicable to Revenants than Reflexion/ExpeL, but the skill-library design is a useful reference.

---

### [ADAS / Meta Agent Search](https://arxiv.org/abs/2408.08435)

- **arXiv:** 2408.08435
- **Project use:** Practical recursive agent improvement

A meta-agent searches over better agent code or architectures from an archive. This is the closest practical pattern in this bundle for recursive improvement, provided it is evaluator-gated.

---

### [Godel Agent](https://aclanthology.org/2025.acl-long.1354/)

- **Source:** ACL Anthology
- **Project use:** Recursive self-improvement framing

Self-referential agent framework for recursive self-improvement. Treat as conceptual inspiration, not as a raw shipping architecture.

---

### [AlphaEvolve](https://arxiv.org/abs/2506.13131)

- **arXiv:** 2506.13131
- **Project use:** Evaluator-driven evolutionary code improvement

The main lesson for Revenants is that improvement loops need evaluators. Without a reliable evaluator, self-improvement has no dependable optimization target.

---

## Guardrail Reads

### [LLMs Cannot Self-Correct Reasoning Yet](https://arxiv.org/abs/2310.01798)

- **arXiv:** 2310.01798
- **Project use:** Self-correction warning

Pure self-correction often degrades performance without external feedback. This supports requiring tests, evals, reviewers, or external signals before persistent changes.

---

### [When AI Builds Itself](https://www.anthropic.com/institute/recursive-self-improvement)

- **Source:** Anthropic Institute
- **Project use:** RSI governance and risk framing

Current recursive self-improvement framing and governance risk discussion. Useful as a guardrail reference when deciding which loops may persist memory, workflows, skills, or code.

## Revenants Takeaway

Start with eval-gated self-improvement, not an agent that rewrites itself freely:

1. Capture traces from failed or blocked runs.
2. Classify the failure type.
3. Generate a proposed lesson, workflow, policy patch, eval case, or code patch.
4. Run tests and evals.
5. Require reviewer or gate approval before persistent memory or code changes.

Recommended artifact order:

1. `lessons`
2. `workflows`
3. `skills`
4. `eval cases`
5. `code patches`

Near-term architecture:

```text
trace -> reflection -> lesson/workflow proposal -> evaluator -> gated persistence -> retrieval on similar future task
```
