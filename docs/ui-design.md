# UI Design

## Visual Direction

Rupture should look modern, minimal, technical, and restrained.

The product should feel like a serious developer tool, not a generic AI SaaS dashboard.

## Brand

Name: **Rupture**

Tagline: **Break it. Trace it. Fix it.**

Brand concept: a stable system line that develops a visible break or fault.

## Design Principles

- prioritize information hierarchy over decoration
- use dense but readable layouts for investigation screens
- use whitespace deliberately
- reserve monospace typography for logs, identifiers, metrics, code, and terminal-like data
- use status color only where it communicates system state
- use subtle transitions, not decorative motion
- keep cards compact
- keep typography clean and consistent

## Avoid

- excessive gradients
- glassmorphism everywhere
- neon cyberpunk styling
- oversized hero sections
- giant rounded cards
- meaningless animated backgrounds
- fake terminal effects
- random charts that do not help diagnosis

## Core Status Vocabulary

Suggested semantic states:

```text
HEALTHY
DEGRADED
CRITICAL
STARTING
EXPIRED
OFFLINE
```

Color implementation should come from design tokens rather than hard-coded component colors.

## Main Investigation Layout

The investigation session is the visual centerpiece.

```text
+---------------------------------------------------------+
| Rupture | Incident #A91 | 12:42 | DEGRADED             |
+----------------+----------------------------------------+
| SERVICES       |                                        |
|                | Investigation                          |
| API       !    |                                        |
| Worker    OK   | [Logs] [Metrics] [Health] [Config]    |
| Redis     OK   |                                        |
| Postgres  !    | Evidence panel                         |
|                |                                        |
|                |                                        |
+----------------+----------------------------------------+
| Hint                                             Submit |
+---------------------------------------------------------+
```

## Required Product Pages

- `/`
- `/labs`
- `/labs/[id]`
- `/session/[id]`
- `/results/[id]`
- `/history`
- `/profile`
- `/privacy` if production deployment collects personal data
- `/terms` if required by deployment model
- custom `404`
- global error state

## Required UX States

Every major surface should account for:

- loading
- empty
- failure
- retry
- expired session
- runner offline
- lab startup failure
- maximum concurrent labs reached
- unauthorized session

## Accessibility Baseline

- visible focus states
- semantic buttons/links
- accessible labels
- keyboard navigation for primary workflows
- sufficient contrast
- no status communicated by color alone
- reduced-motion compatibility for non-essential animation

## Responsive Behavior

Desktop is the primary investigation environment.

Mobile should remain usable for browsing results/history and basic inspection, but the product does not need to optimize complex debugging workflows for very small screens.

## Portfolio Media

For public presentation, capture:

- one hero screenshot of active investigation
- one scenario catalog screenshot
- one result/score screenshot
- one history/profile screenshot
- one 8-15 second workflow GIF
- one architecture diagram
- one social preview image
