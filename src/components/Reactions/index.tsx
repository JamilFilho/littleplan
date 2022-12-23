import { ClapButton, LikeButton } from "@lyket/react"
import styles from './reactions.module.scss'

export function Reactions(props) {
  return (
   <>
    <section className={styles.reactions}>
        <div className={styles.reactionButtons}>
        <LikeButton
            id={props.buttonId}
            namespace="like-post"
            component={LikeButton.templates.Twitter}
        />
        
        <ClapButton 
            id={props.buttonId}
            namespace="clap-post" 
            component={ClapButton.templates.Medium}
        />
        </div>
    </section>
   </>
  )
}