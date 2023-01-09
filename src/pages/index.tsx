import { GetServerSideProps } from "next"
import Link from 'next/link'
import { api } from "../services/api"
import { format, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString"
import styles from './home.module.scss';
import { usePlayer } from "../contexts/PlayerContext"
import Head from "next/head"
import { FiPlayCircle, FiDownload } from "react-icons/fi"

type Episode = {
  slug: string;
  title: string;
  thumbnail: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  allEpisodes: Episode[];
  latestEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer()

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return <>
  <Head>
    <title>Home | #LittlePlan</title>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:url" content="https://plan.littleson.com.br" />
    <meta name="twitter:title" content="Little Plan" />
    <meta name="twitter:description" content="Leia a Bíblia em 365 dias" />
    <meta name="twitter:image" content="https://plan.littleson.com.br/icons/android-icon-192-192.png" />
    <meta name="twitter:creator" content="@um_littleson" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Little Plan" />
    <meta property="og:description" content="Leia a Bíblia em 365 dias" />
    <meta property="og:site_name" content="Little Plan" />
    <meta property="og:url" content="https://plan.littleson.com.br" />
    <meta property="og:image" content="https://plan.littleson.com.br/icons/apple-icon-1024.png" />
  </Head>
  
  <div className={styles.homepage}>
    <div className={styles.inner}>
      <section className={styles.latestEpisodes}>
        <h2>Leituras de hoje</h2>

        <ul>
          {latestEpisodes.map((episode, index) => (
            <li key={episode.slug}>
              <div className={styles.episodeDetails}>
                <Link href={`/leitura/${episode.slug}`} passHref>
                  {episode.title}
                </Link>
                <div 
                dangerouslySetInnerHTML={{
                  __html:
                  episode.description
                }} />
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button" onClick={() => playList(episodeList, index)}>
                <FiPlayCircle />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.plannerDonwload}>
        <header>
          <h4>Baixe e imprima o plano de leitura</h4>
        </header>
        <div>
          <a href="#" title="Faça download do pdf" rel="noreferrer noopener" className={styles.download}>
            <FiDownload /> Faça download do pdf [em breve]
          </a> 
        </div>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Leituras passadas</h2>
        <ul>
          {allEpisodes.map((episode, index) => (
          <li key={episode.slug}>
            <Link href={`/leitura/${episode.slug}`} passHref>
              {episode.title}
            </Link>
            <p>{episode.publishedAt}</p>
            <p>{episode.durationAsString}</p>
            <button onClick={() => playList(episodeList, index + latestEpisodes.length)}>
              <FiPlayCircle />
            </button>
          </li>
          ))}
        </ul>
      </section>
    </div>
  </div>
</>;
}

export const getStaticProps: GetServerSideProps = async () => {
  const response = await api.get('episodios?populate=*&sort[0]=id%3Adesc')

  const responseData = response.data
  const espisodeData = responseData.data  

  const episodes = espisodeData.map(episode => {    
    return {
      slug: episode.attributes.epid,
      title: episode.attributes.title,
      publishedAt: format(parseISO(episode.attributes.episodePublishedAt), 'dd MMMM yyyy', {
        locale: ptBR
      }),
      thumbnail: episode.attributes.thumbnail,
      description: episode.attributes.description,
      url: episode.attributes.file.url,
      duration: Number(episode.attributes.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.attributes.file.duration))
    }
  })

  const latestEpisodes = episodes.slice(0, 4);
  const allEpisodes = episodes.slice(4, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 20 * 1
  }
}