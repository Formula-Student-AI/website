import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ blogs: events }) {
  return (<div className={styles['container']}>
    <Head>
      <title>Formula Student AI</title>
    </Head>
    <h1 className={styles['header']}>Welcome to my blog</h1>
    <p className={styles['subtitle']}>This is a subtitle idk what to type here</p>
    <ul className={styles['blog-list']}>
      {events.map(event => (
        <li key={event.slug}>
          <Link href={`/event/${event.slug}`}>
            <a>{event.date}: {event.title}</a>
          </Link>
        </li>
      ))}
    </ul>
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