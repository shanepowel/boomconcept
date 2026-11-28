import type { Img } from './types'

export const insightTopics = ['Science', 'Strategy', 'Technology'] as const
export type InsightTopic = typeof insightTopics[number]

export type Insight = {
  slug: string
  title: string
  summary: string
  topic: InsightTopic
  byline?: string
  featured?: boolean
  image?: Img
  sections: { heading: string; text: string }[]
  example?: { original: string; revision: string; note: string }
}

/** Reading time at about 220 words a minute, never less than two minutes. */
export function readingMinutes(article: Pick<Insight, 'summary' | 'sections' | 'example'>) {
  const text = [article.summary, ...article.sections.flatMap((s) => [s.heading, s.text]), article.example?.original, article.example?.revision, article.example?.note].filter(Boolean).join(' ')
  return Math.max(2, Math.ceil(text.split(/\s+/).length / 220))
}

export const insights: Insight[] = [
  {
    slug: 'what-does-the-evidence-let-you-say',
    title: 'What does the evidence actually let you say?',
    summary: 'A practical edit for the moment when a clear sentence starts promising more than the study can support.',
    topic: 'Science',
    featured: true,
    sections: [
      { heading: 'Start with the claim', text: 'Put the sentence next to the source that supports it. Circle the verb. “Improved”, “prevented” and “was associated with” describe different things. If the verb is stronger than the study design allows, a shorter sentence only makes the problem easier to miss.' },
      { heading: 'Keep the comparison in view', text: 'Ask whether someone reading a screenshot could tell what was measured, for whom and against what. Put the detail that changes the interpretation beside the claim, where it can do its job.' },
      { heading: 'Edit for the reader’s next decision', text: 'Read the line aloud and ask a colleague to explain it back to you. Their version will tell you which qualification disappeared. Put that qualification back into the main sentence and try again.' },
    ],
    example: {
      original: 'The support programme improved treatment adherence.',
      revision: 'In an observational study, people who chose to join the support programme recorded fewer missed doses over 12 weeks.',
      note: 'This fictional example shows the difference between an observed association and a claim of cause. The revised line keeps the study design, self-selection and timeframe visible.',
    },
  },
  {
    slug: 'the-first-five-minutes-of-a-launch-brief',
    title: 'The first five minutes of a launch brief',
    summary: 'Three questions to get the team talking about the decision in front of them before the channel plan takes over.',
    topic: 'Strategy',
    sections: [
      { heading: 'Whose decision are we trying to change?', text: 'Name one person, one moment and one decision. “Oncologists need awareness” leaves most of the work to the reader. “A specialist deciding what to discuss after a patient’s first treatment stops working” gives the team a situation they can investigate.' },
      { heading: 'What happens today?', text: 'Ask for a recent example. When did someone make that decision? What was in front of them? Who else had a say? A description of what happens today gives you something to test before you invest in a campaign.' },
      { heading: 'Which unknown would change the plan?', text: 'Write it down and agree how to investigate it. If the answer would change the audience, language or timing, it belongs in the research brief before production starts.' },
    ],
  },
  {
    slug: 'give-ai-draft-a-reading-test',
    title: 'Give the AI draft a reading test',
    summary: 'A simple way to review AI-assisted copy when the wording sounds plausible and the source still has the final say.',
    topic: 'Technology',
    sections: [
      { heading: 'Give the review a small job', text: 'Choose one paragraph and the approved material it draws on. Ask the reviewer to mark each factual phrase and find the passage that supports it. A complete-looking paragraph becomes a set of checkable statements.' },
      { heading: 'Look at the joins', text: 'Pay particular attention to phrases such as “so”, “therefore” and “which means”. They can turn two accurate sentences into an inference the source never made. Check the connection as carefully as you check the facts.' },
      { heading: 'Keep the edit attached to the evidence', text: 'Record the source passage and the reason for each substantive change in your existing review workflow. The next reviewer can then see what changed and why, even when they were never part of the drafting conversation.' },
    ],
  },
]
