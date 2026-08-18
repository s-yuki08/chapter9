import Link from 'next/link';
import Image from 'next/image'
import classes from './Home.module.css'
import Category from './_components/Category'
import type { MicroCmsPost } from './_types/MicroCmsPost'


export default async function Page() {
  const res = await fetch(
    'https://btlktymkz4.microcms.io/api/v1/posts', {
    headers: {
      'X-MICROCMS-API-KEY': process.env
        .NEXT_PUBLIC_MICROCMS_API_KEY as string,
    },
  })

  if (!res.ok) {
    throw new Error('記事の取得に失敗しました')
  }

  const { contents } = await res.json()
  const posts: MicroCmsPost[] = contents

  return (
    <div className={classes.posts}>
      <div className="inner">
        <h1 className={classes.posts__title}>記事一覧</h1>
        <div className={classes.posts__lists}>
          {posts.map((post) => (
            <Link
              href={`/posts/${post.id}`}
              className={classes['posts__list-archive-link']}
              key={post.id}
            >
              <div className={classes['posts__list-archive']}>
                <div className={classes['posts__list-img']}>
                  <Image
                    src={post.thumbnail.url}
                    alt={post.title}
                    width={800}
                    height={400}
                  />
                </div>
                <div className={classes['posts__list-body']}>
                  <div className={classes['posts__list-body-top']}>
                    <time
                      className={classes['posts__list-body-time']}
                      dateTime={post.createdAt}
                    >
                      {new Date(post.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <div className={classes['posts__list-body-categories']}>
                      {post.categories.map((category) => (
                        <Category key={category.id}>{category.name}</Category>
                      ))}
                    </div>
                  </div>
                  <div className={classes['posts__list-body-title']}>
                    {post.title}
                  </div>
                  <div
                    className={classes['posts__list-body-text']}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
