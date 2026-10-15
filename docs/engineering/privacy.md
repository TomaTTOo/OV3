# Privacy and data protection (GDPR and similar)

What OV stores, what it never stores, and why. Read when touching stored data, schemas with people in them, scopes or support. The enforced rules are in `CLAUDE.md` (data and privacy). To be reviewed with a lawyer before the first paid install.

## Employee monitoring and works councils (the main risk)

- In several EU countries (notably Germany, Austria, the Netherlands, France), a tool that _could_ monitor employees' performance may need the works council's agreement before use: slow, and can block a purchase.
- In small teams, team metrics can identify individuals.
- Design:
  - Metrics computed and shown per team only; no per-person figures, displayed or stored.
  - A minimum team size below which metrics aren't shown or are merged (a setting).
  - Assignees used only to group issues by team, never displayed in metrics.
  - Absences entered as team totals per sprint, never per person, with no reasons.
- A "works council sheet": what OV measures, and what it can't be used for. Also a sales argument.

## Personal data, kept minimal

- Processed: Atlassian account IDs (editors, viewers, audit log authors, assignees), display names, possibly personal data in issue text.
- Stored: account IDs only, never names or emails (names fetched from Jira for display); plan state and team aggregates, not copies of issues or history.
- Atlassian's personal data reporting used, so data about closed accounts is erased.
- Audit log retention configurable by the admin.
- Everything deleted when the app is uninstalled (check Forge storage behaviour).

## Roles and documents

- Customer: controller. Atlassian: hosts and processes (Forge). OV: most likely a processor too, even without egress.
- Documents: privacy policy, DPA template, sub-processor list (Atlassian), information to support a customer's DPIA.

## Residency and transfers

- "Runs on Atlassian" storage inherits the customer's data residency.
- No outside calls from the apps: no analytics, error reporting, logging services, CDNs or online APIs (holidays included).
- Support works without customer data where possible; customer data never pasted into third-party tools, including AI assistants.

## Public content and the website

- Contributors' names from the Public Jira Dataset anonymised in fixtures, screenshots, posts and the demo board.
- Contact form (Firestore, EU): privacy notice and a retention rule (e.g. delete after 12 months). Umami cookieless: no consent banner.

## Other laws

UK GDPR, Swiss FADP, Brazil's LGPD, California's CCPA/CPRA: the same minimisation and per-team design covers most of what they require.
