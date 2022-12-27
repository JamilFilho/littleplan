import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import useScript from '../../utils/useScript'
import styles from './sharer.module.scss'

export function ShareButtons({title, url}) {
    useScript('/assets/sharer.min.js')
    return(
        <section className={styles.sharerButtons}>
            <button data-sharer="facebook" data-title={title} data-url={`https://plan.littleson.com.br/${url}`} className={styles.shareButton}>
                <FaFacebook />
            </button>
            
            <button data-sharer="twitter" data-title={title} data-via="CadaManha" data-url={`https://plan.littleson.com.br/${url}`} className={styles.shareButton}>
                <FaTwitter />
            </button>
            
            <button data-sharer="whatsapp" data-title={title} data-url={`https://plan.littleson.com.br/${url}`} className={styles.shareButton}>
                <FaWhatsapp />
            </button>
        </section>
    )
}