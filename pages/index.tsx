import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ReactMarkdown from 'react-markdown'

export default function Home({ eventsBeforeNow, eventsAfterNow, posts }) {
  return (<div className={styles['container']}>
    <Head>
      <title>Formula Student AI</title>
    </Head>
    <h1 className={styles.header}>Welcome to Formula Student AI</h1>
    <div className={styles.events}>
      <p className={styles.subtitle}>Coming Up</p>
      <div className={styles.cardsContainer}>
        {eventsAfterNow.length ? eventsAfterNow.map(event => (
          <Link href={`/event/${event.slug}`} key={event.slug}>
            <div className={styles.card}>
              <Image src={event.image} alt={event.title} width={400} height={200} />
              <span className={styles.title}>{event.title}</span>
              <span className={styles.date}>{(new Date(event.date)).toLocaleString()}</span>
            </div>
          </Link>
        )) : <p className={styles.noevents}>No upcoming events</p>}
      </div>
      <p className={styles.subtitle}>Past Events</p>
      <div className={styles.cardsContainer}>
        {eventsBeforeNow.map(event => (
          <Link href={`/event/${event.slug}`} key={event.slug}>
            <div className={styles.card}>
              <img src={event.image} alt={event.title} />
              <span className={styles.title}>{event.title}</span>
              <span className={styles.date}>{(new Date(event.date)).toLocaleString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <div className={styles.posts}>
      <div className={styles.cardsContainer}>
        {posts.map(post => (
          <div className={styles.post} key={post.slug}>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <div className={styles.date}>{(new Date(post.date)).toLocaleDateString()}</div>
            <p>{post.description}</p>
            <Link href={post.slug}><a className={styles.link}>Read More &rarr;</a></Link>
          </div>
        ))}
      </div>
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
    });

  const eventsBeforeNow = events.filter(event => event.date < Date.now()).sort((a, b) => b.date - a.date);
  const eventsAfterNow = events.filter(event => event.date > Date.now()).sort((a, b) => a.date - b.date);

  const filesInPosts = fs.readdirSync('./content/posts')
  const posts = (filesInPosts
    .map(filename => {
      const file = fs.readFileSync(`./content/posts/${filename}`, 'utf8')
      const matterData = matter(file)

      return {
        ...matterData.data, // matterData.data contains front matter
        content: matterData.content,
        slug: filename.slice(0, filename.indexOf('.'))
      }
    }) as { [key: string]: any }[])
    .map(post => {
      return {
        ...post,
        date: (new Date(post.date.replace(/([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2})/gm, "$3-$2-$1T$4:$5:00"))).getTime()
      }
    })
    .sort((a, b) => b.date - a.date);


  return {
    props: {
      eventsBeforeNow,
      eventsAfterNow,
      posts
    }
  }

}