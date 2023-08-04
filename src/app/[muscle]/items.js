import styles from './page.module.css'

function Item(item) {
    return (
        <div className={styles.card}>
            <div className={styles.card_content}>
                <div className={styles.card_header}>
                    <div className={styles.card_title}>
                        <h1>{item.item.exercise_name}</h1>
                        <h2>{item.item.Difficulty}</h2>
                    </div>
                    <div className={styles.card_muscle}>
                        {item.item.target.Primary?.map((muscle) => (
                            <h3 className={styles.muscle_primary} key={muscle}>{muscle}</h3>
                            ))}
                        {item.item.target.Secondary?.map((muscle) => (
                            <h3 className={styles.muscle_secondary} key={muscle}>{muscle}</h3>
                            ))}
                    </div>
                </div>
                <div className={styles.card_videos}>
                    { item.item.videoURL.map((video) => (
                        <video playsInline controls loop muted preload='metadata' key={video}>
                            <source src={video} type="video/mp4"/>
                        </video>
                        )) 
                    }
                </div>
                <div className={styles.card_steps}>
                    <ul style={{listStyleType: "decimal"}}>
                        { (item.item.steps.length != 0) ?
                        
                        item.item.steps?.map((step) => (
                            <li key={`${item.item.exercise_name}${item.item.steps.indexOf(step)}`}>{step}</li>
                            ))
                            
                            : <h2>Error fetching steps</h2>
                        }

                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Item;