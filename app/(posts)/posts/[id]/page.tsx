import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import classes from './PostDetail.module.css'
import Category from '../../_components/Category'
import type { MicroCmsPost } from '../../_types/MicroCmsPost'

type Props = {
    params: Promise<{
        id: string
    }>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    const res = await fetch(
        `https://btlktymkz4.microcms.io/api/v1/posts/${id}`, {
        headers: {
            'X-MICROCMS-API-KEY': 'Hu4xV7pmbNw0q52P2PgZ4Ze6LhaQqQiW20V9',
        },
    })

    if (!res.ok) {
        notFound()
    }

    const post: MicroCmsPost = await res.json()

    return (
        <div className={classes.detail} >
            <div className="inner">
                <div className={classes.detail__img}>
                    <Image
                        src={post.thumbnail.url}
                        alt={post.title}
                        width={800}
                        height={400}
                    />
                </div>

                <div className={classes['detail__body']}>
                    <div className={classes['detail__body-top']}>
                        <time
                            className={classes['detail__body-time']}
                            dateTime={post.createdAt}
                        >
                            {new Date(post.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                        <div className={classes['detail__body-categories']}>
                            {post.categories.map((category) => (
                                <Category key={category.id}>{category.name}</Category>
                            ))}
                        </div>
                    </div>
                    <div className={classes['detail__body-title']}>
                        {post.title}
                    </div>
                    <div
                        className={classes['detail__body-text']}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>

                    <div className={classes['detail__back']}>
                        <Link href="/" className={classes['detail__back-link']}>
                            記事一覧へ戻る
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}