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
  id: string;
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

  return (
    <>
    <Head>
      <title>Home | #LittlePlan</title>
    </Head>
    
    <div className={styles.homepage}>
      <div className={styles.inner}>
        <section className={styles.latestEpisodes}>
          <h2>Leitura de hoje</h2>

          <ul>
            {latestEpisodes.map((episode, index) => (
              <li key={episode.id}>
                <div className={styles.episodeDetails}>
                  <Link href={`/leitura/${episode.id}`} passHref>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.description}</p>
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
            <a href="" title="Apoie" rel="noreferrer noopener" className={styles.download}>
              <FiDownload /> Faça download do pdf
            </a> 
          </div>
        </section>

        <section className={styles.allEpisodes}>
          <h2>Leituras passadas</h2>
          <ul>
            {allEpisodes.map((episode, index) => (
            <li key={episode.id}>
              <Link href={`/leitura/${episode.id}`} passHref>
                <a href={`/leitura/${episode.id}`}>{episode.title}</a>
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
  </>
  )
}

export const getStaticProps: GetServerSideProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    description: episode.description,
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { 
      locale: ptBR
    }),
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
    url: episode.file.url,
  }))

  const latestEpisodes = episodes.slice(0, 1);
  const allEpisodes = episodes.slice(1, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60
  }
}