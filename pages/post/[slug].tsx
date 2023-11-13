import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Head from 'next/head'
import styles from '../../styles/Event.module.css'

export default function Event({ frontmatter, markdown }) {
	return (
		<div className={styles['container']}>
			<Head>
				<title>Formula Student AI Post | {frontmatter.title}</title>
			</Head>
			<h1 className={styles['title']}>{frontmatter.title}</h1>
			<div>{frontmatter.date}</div>
			<hr />
			<div className={styles['wrapper']}>
				<ReactMarkdown>
					{markdown}
				</ReactMarkdown>
			</div>
            <a href={frontmatter.link} className={styles.link} target="_blank" rel="noopener noreferrer">Go &rarr;</a>
		</div>
	)
}

export async function getStaticProps({ params: { slug } }) {
	const fileContent = matter(fs.readFileSync(`./content/posts/${slug}.md`, 'utf8'))
	let frontmatter = fileContent.data
	const markdown = fileContent.content

	return {
		props: { frontmatter, markdown }
	}
}

export async function getStaticPaths() {
	const filesInProjects = fs.readdirSync('./content/posts')

	const paths = filesInProjects.map(file => {
		const filename = file.slice(0, file.indexOf('.'))
		return { params: { slug: filename } }
	})

	return {
		paths,
		fallback: false // This shows a 404 page if the page is not found
	}
}