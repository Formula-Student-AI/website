import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ eventsBeforeNow, eventsAfterNow }) {
  return (<div className={styles['container']}>
    <Head>
      <title>Formula Student AI</title>
    </Head>
    <h1 className={styles.header}>Welcome to Formula Student AI</h1>
    <p className={styles.subtitle}>Coming Up</p>
    <div className={styles.cardsContainer}>
      {eventsAfterNow.length ? eventsAfterNow.map(event => (
        <Link href={`/event/${event.slug}`} key={event.slug}>
          <div className={styles.card}>
            <Image src={event.image} alt={event.title} width={400} height={200} />
            <span className={styles.title}>{event.title}</span>
            <span className={styles.date}>{event.date}</span>
          </div>
        </Link>
      )) : <p className={styles.noevents}>No upcoming events</p>}
    </div>
    <hr className={styles.hr} />
    <p className={styles.subtitle}>Past Events</p>
    <div className={styles.cardsContainer}>
      {eventsBeforeNow.map(event => (
        <Link href={`/event/${event.slug}`} key={event.slug}>
          <div className={styles.card}>
            <Image src={event.image} alt={event.title} width={400} height={200} />
            <span className={styles.title}>{event.title}</span>
            <span className={styles.date}>{(new Date(event.date)).toLocaleString()}</span>
          </div>
        </Link>
      ))}
    </div>
  </div>)
}

export async function getStaticProps() {
  // List of files in blgos folder
  const filesInEvents = fs.readdirSync('./content/events')

  // Get the front matter and slug (the filename without .md) of all files
  const events = (filesInEvents
    .map(filename => {
      const file = fs.readFileSync(`./content/events/${filename}`, 'utf8')
      const matterData = matter(file)

      return {
        ...matterData.data, // matterData.data contains front matter
        slug: filename.slice(0, filename.indexOf('.'))
      }
    }) as { [key: string]: any }[])
    .map(event => {
      return {
        ...event,
        date: (new Date(event.date.replace(/([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2})/gm, "$3-$2-$1T$4:$5:00"))).getTime()
      }
    })

  const eventsBeforeNow = events.filter(event => event.date < Date.now()).sort((a, b) => b.date - a.date)
  const eventsAfterNow = events.filter(event => event.date > Date.now()).sort((a, b) => a.date - b.date)


  return {
    props: {
      eventsBeforeNow,
      eventsAfterNow
    }
  }

}