import 'server-only'
import { getBrandMoments, getPage } from './data'

export async function getEnquiryContext(stage: unknown, lineup: unknown) {
  if (typeof stage === 'string' && stage.length <= 160) {
    const moment = (await getBrandMoments()).find((item) => item.stage === stage)
    if (moment) return { label: moment.stage, href: 'stage=' + encodeURIComponent(stage) }
  }
  if (typeof lineup === 'string' && lineup.length <= 160) {
    const home = await getPage('home', { stega: false })
    const brief = home.lineups?.find((item) => item.id === lineup)
    if (brief) return { label: brief.title, href: 'lineup=' + encodeURIComponent(lineup) }
  }
}
