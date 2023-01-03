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
  slug: string;
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
          
          <a href={episode.url} className={styles.download} download={episode.slug}>
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

        <ShareButtons title={`${episode.title} | LittlePlan`} url={episode.slug}/>
      </div>

      <Reactions buttonId={episode.slug}/>

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
  const response = await api.get('/episodios?populate=*', {
    params: {
      _limit: 2,
      _sort: 'publishedAt',
      // _order: 'desc'
    }
  })

  const responseData = response.data
  const espisodeData = responseData.data  

  const paths = espisodeData.map(episode => ({
    params: {
      slug: episode.attributes.epid
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodios?filters[epid][$eq]=${slug}&populate=*`)
  const responseData = data.data[0].attributes

  console.log(responseData.epid)

  const episode = {
    slug: responseData.epid,
    title: responseData.title,
    thumbnail: responseData.thumbnail,
    publishedAt: format(parseISO(responseData.publishedAt), 'dd MMMM yyyy', { 
      locale: ptBR
    }),
    duration: Number(responseData.file.duration),
    durationAsString: convertDurationToTimeString(Number(responseData.file.duration)),
    description: responseData.description,
    content:responseData.content,
    url: responseData.file.url,
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24
  }
}