import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ events }) {
  return (<div className={styles['container']}>
    <Head>
      <title>Formula Student AI</title>
    </Head>
    <h1 className={styles.header}>Welcome to Formula Student AI</h1>
    <p className={styles.subtitle}>Coming Up</p>
    <div className={styles.cardsContainer}>
      {events.map(event => (
        <div key={event.slug} className={styles.card}>
          <Link href={`/event/${event.slug}`}>
            {event.title} - {event.date}
          </Link>
        </div>
      ))}
    </div>
  </div>)
}

export async function getStaticProps() {
  // List of files in blgos folder
  const filesInEvents = fs.readdirSync('./content/events')

  // Get the front matter and slug (the filename without .md) of all files
  const events = filesInEvents.map(filename => {
    const file = fs.readFileSync(`./content/events/${filename}`, 'utf8')
		const matterData = matter(file)
		
    return {
			...matterData.data, // matterData.data contains front matter
			slug: filename.slice(0, filename.indexOf('.'))
		}
	})

  return {
    props: {
      events
    }
  }

}