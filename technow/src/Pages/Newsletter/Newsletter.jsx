import { Button } from '../../Components/Buttons/Buttons'
import { NewsCard } from '../../Components/NewsCard/News'
import styles from './Newsletter.module.css'

const Newsletter = () => {
    const title = "Trezor launches two new devices to help onboard crypto newbies"
    const image = "https://techcrunch.com/wp-content/uploads/2023/08/threads-desktop-GettyImages-1524135861.jpg?w=730&crop=1"
    const caption = "wouorud" ;
    const desc = `aljsdljadjsaldlasjdajsd$ adjasdjk asdiuaushdiaus aisdhaksdhkshda a
    asdhhiewow sefushuiswd ado aduw 8uyfa i8oqwue asd kaweh8sdc sajf lichasjdfb lsou sc]as
    asdfl iaodshofkds,klsdfjlsdhf dASFASf
    faisfoiasdhf afa asfsdojosfks" paf` ;

    return (
        <div className={styles.Container}>
            <h1 className={styles.H1}>
                Latest News
            </h1>
            <article className={styles.Newsletter}>
            <NewsCard
                first={true}
                title={title}
                image={image}
                alt={""}
                caption={""}
                desc={''}
            />
            <NewsCard
                className={styles.NewsCard}
                title={title}
                image={image}
                alt={"blbshdds"}
                caption={caption}
                desc={desc}
            />
            <NewsCard
                className={styles.NewsCard}
                title={title}
                image={image}
                alt={"blbshdds"}
                caption={caption}
                desc={desc}
            />
            <NewsCard
                className={styles.NewsCard}
                title={title}
                image={image}
                alt={"blbshdds"}
                caption={caption}
                desc={desc}
            />
            <NewsCard
                className={styles.NewsCard}
                title={title}
                image={image}
                alt={"blbshdds"}
                caption={caption}
                desc={desc}
            />
            <NewsCard
                className={styles.NewsCard}
                title={title}
                image={image}
                alt={"blbshdds"}
                caption={caption}
                desc={desc}
            />
            <NewsCard
                className={styles.NewsCard}
                title={title}
                image={image}
                alt={"blbshdds"}
                caption={caption}
                desc={desc}
            />
            </article>
            <div className={styles.btn}>
                <Button text="Load more" size="big"/>                
            </div>
        </div>
    )
}

export default Newsletter