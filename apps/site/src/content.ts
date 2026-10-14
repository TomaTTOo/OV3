/** Every word on the site, in one place. Components only lay it out. */

export type Item = { title: string; text: string };
export type SprintLoad = { name: string; planned: number; capacity: number; likelihood: number };

export const content = {
  meta: {
    title: 'Outcome Vault: from scattered history to a plan you can trust',
    description:
      'A Jira app for quarterly and PI planning. It reads what your teams really finished and shows, as you plan, whether each sprint fits and how likely it is to be delivered.',
    url: 'https://outcomevault.com/',
  },
  brand: 'Outcome Vault',
  hero: {
    eyebrow: 'For delivery leads, RTEs and PMOs planning in Jira',
    title: 'From scattered history to a plan you can trust.',
    lead: 'For your next PI or quarterly planning, Outcome Vault reads what your teams really finished in Jira and shows, as you plan, whether each sprint fits and how likely it is to be delivered.',
    cta: 'How it works',
  },
  statement: { plain: 'Status reports are performance.', emphasis: "Plans shouldn't be." },
  planning: {
    label: 'Planning today',
    title: { before: 'See which sprints are ', over: 'over capacity', after: ' before the quarter starts.' },
    items: [
      {
        title: 'Copied by hand',
        text: 'Work moves from Jira to a whiteboard and back, card by card, before and after every planning.',
      },
      {
        title: 'Committed on hope',
        text: 'Capacity is a guess in story points, often counted as hours, and a show of hands decides if it fits.',
      },
      {
        title: 'Found out too late',
        text: "Spill-over shows up at the sprint review, when the quarter's plan is already broken.",
      },
    ] satisfies Item[],
    legend: { capacity: 'Capacity, from finished work', over: 'Committed beyond capacity' },
  },
  how: {
    title: 'Plan every sprint on the capacity your team really has.',
    steps: [
      {
        title: 'Bring in the backlog',
        text: 'Features and stories come straight from your Jira projects into a list of work to plan.',
      },
      {
        title: 'Plan against real capacity',
        text: 'Drag work into sprints. Each sprint shows its load against what the team really finishes, holidays included, and how likely it is to be delivered.',
      },
      {
        title: 'Apply to Jira',
        text: 'One click puts every issue in its sprint, after showing you exactly what will change.',
      },
    ] satisfies Item[],
    chart: {
      title: 'Planned work against measured capacity',
      caption: 'Example data. The dashed line is what the team really finishes, read from its past sprints.',
      sprints: [
        { name: 'Sprint 1', planned: 7, capacity: 9, likelihood: 92 },
        { name: 'Sprint 2', planned: 9, capacity: 9, likelihood: 85 },
        { name: 'Sprint 3', planned: 12, capacity: 8, likelihood: 41 },
      ] satisfies SprintLoad[],
      likely: (likelihood: number) => `${likelihood}% likely`,
      load: (planned: number, capacity: number) => `${planned} planned, capacity ${capacity}`,
      legend: {
        within: 'Planned within capacity',
        over: 'Over capacity',
        capacity: 'Capacity, from finished work',
      },
    },
  },
  trust: {
    title: 'Commit to numbers you can defend.',
    items: [
      {
        title: 'Ranges, not promises',
        text: 'Forecasts at 50%, 85% and 95% likelihood, never a single date.',
      },
      {
        title: "Your data's health, first",
        text: 'Mass closures, work finished without being started, items reopened: shown up front, with their effect on each number.',
      },
      {
        title: 'Works on the Jira you have',
        text: 'No clean-up and no setup: capacity comes from the finished work already in your history.',
      },
      {
        title: 'Stays in Atlassian',
        text: 'Outcome Vault runs inside Jira. Your data never leaves Atlassian.',
      },
    ] satisfies Item[],
  },
  contact: {
    title: 'Plan your next PI on real capacity.',
    lead: 'Outcome Vault is looking for a few teams planning their next PI or quarter in Jira. Pilot teams use it free and shape what it becomes.',
    button: 'Contact us',
    email: 'marcos@corsol.com.br',
    subject: 'Outcome Vault',
  },
  footer: {
    copyright: (year: number) => `© ${year} Outcome Vault`,
    trademark:
      'Jira and Atlassian are trademarks of Atlassian. Outcome Vault is not affiliated with Atlassian.',
  },
} as const;

export type Content = typeof content;
