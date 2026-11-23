/**
 * The three numbers shown on the home page's about section and on the about
 * page. One place, so the two cannot disagree.
 *
 * Real counts, no "+": round numbers with a plus read as padded, and two equal
 * figures side by side read as made up. As of November 2026:
 *  - years: working professionally as a developer since late 2022.
 *  - projects: 17 completed on Workana, plus 3 outside it (one client's
 *    two-stage project, and for Manuarte the admin panel and the AI agent,
 *    counted as separate projects).
 *  - clients: 12 on Workana plus 2 direct.
 * Update these when a project or client is added.
 */
export const STATS = [
  { value: 4, labelKey: "about.stat1.label" },
  { value: 20, labelKey: "about.stat2.label" },
  { value: 14, labelKey: "about.stat3.label" },
] as const;
