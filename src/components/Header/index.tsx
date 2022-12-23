import styles from './styles.module.scss'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'

export function Header() {
  const currentDate = format(new Date(), 'd MMMM', {
    locale: ptBR
  })

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <img src="/logo.svg" alt="Little Plan"/>
      </Link>
      
      <p>Leia a Bíblia em 365 dias</p>

      <span>feito com ❤</span>
    </header>
  )
}