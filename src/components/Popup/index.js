import styles from './styles.module.scss'
import { FiDownload } from 'react-icons/fi'

export function DownloadPopup() {
    return(
        <div class={styles.popupWrapper}>
            <div class={styles.popupContent}>
                <div class={styles.popupThumbnail}></div>
                <div class={styles.popupBody}>
                    <div class={styles.inner}>
                        <h4>Considere apoiar o projeto com R$ 1,99/mês</h4>
                        <a href="" title="Apoie" rel="noreferrer noopener" className={styles.download}>
                            <FiDownload /> Faça download do pdf
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}