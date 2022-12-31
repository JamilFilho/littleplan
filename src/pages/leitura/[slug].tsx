import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { GetStaticPaths, GetStaticProps } from "next"
import { api } from "../../services/api"
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString"
import styles from './episode.module.scss'
import { useRouter } from 'next/router'
import { usePlayer } from "../../contexts/PlayerContext"
import Head from "next/head"
import { FiPlayCircle, FiDownload } from "react-icons/fi"
import {Reactions} from '../../components/Reactions'
import {PageWithComments} from '../../components/Comment'
import { ShareButtons } from "../../components/Sharer"

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
  content: string
}

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps ) {
  const { play } = usePlayer()
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <>
    <Head>
      <title>{episode.title} | #LittlePlan</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://plan.littleson.com.br" />
      <meta name="twitter:title" content={`${episode.title} | #LittlePlan`} />
      <meta name="twitter:description" content="Leia a Bíblia em 365 dias" />
      <meta name="twitter:image" content={episode.thumbnail} />
      <meta name="twitter:creator" content="@um_littleson" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${episode.title} | #LittlePlan`} />
      <meta property="og:description" content="Leia a Bíblia em 365 dias" />
      <meta property="og:site_name" content="Little Plan" />
      <meta property="og:url" content={`https://plan.littleson.com.br/leitura/${episode.id}`} />
      <meta property="og:image" content={episode.thumbnail} />
    </Head>
    
    <div className={styles.episode}>
      <div className={styles.inner}>
        <header>
          <h1>{episode.title}</h1>
          <p>{episode.description}</p>
          <span><strong>Publicado em:</strong> {episode.publishedAt}</span>
          <span><strong>Duração:</strong> {episode.durationAsString}</span>
        </header>
        

        <div className={styles.buttons}>
          <button className={styles.play} onClick={() => play(episode)}>
            <FiPlayCircle />
            Ouvir leitura
          </button>
          
          <a href={episode.url} className={styles.download} download={episode.id}>
            <FiDownload />
          </a>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html:
            episode.content
          }} 
        />

        <ShareButtons title={`${episode.title} | LittlePlan`} url={episode.id}/>
      </div>

      <Reactions buttonId={episode.id}/>

      <section className={styles.cta}>
        <header>
          <h4>Seja um(a) apoiador(a)</h4>
        </header>
        <div>
          <a href="https://go.littleson.com.br/apoiar" title="Apoie" rel="noreferrer noopener" className={styles.subscribe}>
            Apoiar com R$ 1,99/mês
          </a> 
        </div>
      </section>

      <PageWithComments/>
    </div>
  </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      __limit: 2,
      __sort: 'published_at',
      __order: 'desc'
    }
  })

  const paths = data.map(episode => ({
    params: {
      slug: episode.id
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    publishedAt: format(parseISO(data.published_at), 'd MMMM yyyy', { 
      locale: ptBR
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    content:data.content,
    url: data.file.url,
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24
  }
}