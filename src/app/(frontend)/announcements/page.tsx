import { getAllAnnouncements } from '@/lib/payload'
import Section from '@/components/ui/Section'
import ContentList from '@/components/ui/ContentList'
import Card from '@/components/content/Card'

export default async function AnnouncementsPage() {
  const announcements = await getAllAnnouncements(100)

  // Sort by date descending
  announcements.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  )

  const featured = announcements.find((a) => a.featured) || announcements[0] || null

  const now = new Date()
  const thisMonthAnnouncements = announcements.filter((a) => {
    const d = new Date(a.publishDate)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const stats = [
    { label: 'Total posts', value: announcements.length },
    { label: 'New this month', value: thisMonthAnnouncements },
    { label: 'Featured', value: announcements.filter((a) => a.featured).length },
  ]

  const heroDescription = announcements.length
    ? `Stay up to date with ${thisMonthAnnouncements} new ${thisMonthAnnouncements === 1 ? 'post' : 'posts'} this month.`
    : 'Check back soon for ward news and updates.'

  return (
    <>
      {/* Hero Section */}
      <Section variant="default">
        <div className="announcements-hero">
          <div className="announcements-hero__content">
            <p className="announcements-hero__chip">Ward News</p>
            <h1 className="announcements-hero__title">Announcements</h1>
            <p className="announcements-hero__description">{heroDescription}</p>

            <div className="announcements-hero__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="announcements-hero__stat">
                  <span className="announcements-hero__stat-value">{stat.value}</span>
                  <span className="announcements-hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {featured && (
            <div className="announcements-hero__featured">
              <div className="announcements-hero__featured-label">
                {featured.featured ? 'Featured Announcement' : 'Latest Update'}
              </div>
              <Card type="announcement" data={featured} />
            </div>
          )}
        </div>
      </Section>

      {/* Announcements List */}
      <Section variant="highlighted">
        <ContentList
          items={announcements}
          type="announcement"
          title="Ward Updates"
          description="Browse announcements by category"
          groupBy="category"
          showFilters={true}
          maxItemsPerGroup={5}
          itemsPerPage={20}
        />
      </Section>
    </>
  )
}
