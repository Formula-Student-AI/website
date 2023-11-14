import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Head from 'next/head'
import styles from '../../styles/Event.module.css'

export default function Event({ frontmatter, markdown }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Formula Student AI Event | {frontmatter.title}</title>
				<meta name="description" content={frontmatter.description} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={frontmatter.image} />
			</Head>
			<img src={frontmatter.image} alt={frontmatter.title} className={styles.image} />
			<div className={styles.center}>
				<h1 className={styles['title']}>{frontmatter.title}</h1>
				<span>{frontmatter.date}</span>
				<div className={styles.location}>{frontmatter.location}</div>
			</div>
			<hr />
			<div className={styles.wrapper}>
				<ReactMarkdown>
					{markdown}
				</ReactMarkdown>
			</div>
		</div>
	)
}

export async function getStaticProps({ params: { slug } }) {
	const fileContent = matter(fs.readFileSync(`./content/events/${slug}.md`, 'utf8'))
	let frontmatter = fileContent.data
	const markdown = fileContent.content

	return {
		props: { frontmatter, markdown }
	}
}

export async function getStaticPaths() {
	const filesInProjects = fs.readdirSync('./content/events')

	// Getting the filenames excluding .md extension
	// and returning an array containing slug (the filename) as params for every route
	// It looks like this
	// paths = [
	//		{ params: { slug: 'my-first-blog' }},
	//		{ params: { slug: 'how-to-train-a-dragon' }},
	//		{ params: { slug: 'how-to-catch-a-pokemon' }},
	// ]
	const paths = filesInProjects.map(file => {
		const filename = file.slice(0, file.indexOf('.'))
		return { params: { slug: filename } }
	})

	return {
		paths,
		fallback: false // This shows a 404 page if the page is not found
	}
}