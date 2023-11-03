import { useState , useEffect} from 'react'
import { Button } from '../../Components/Buttons/Buttons'
import NewsCard from '../../Components/NewsCard/News'
import styles from './Newsletter.module.css'
import Header from '../../Layouts/Header/Header'
import Footer from '../../Layouts/Footer/Footer'

const Newsletter = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(screenWidth < 1024 ? 'small' : 'big');

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setScreenWidth(newWidth);
            setWidth(newWidth < 1024 ? 'small' : 'big');
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const title = "Trezor launches two new devices to help onboard crypto newbies"
    const image = "https://techcrunch.com/wp-content/uploads/2023/08/threads-desktop-GettyImages-1524135861.jpg?w=730&crop=1"
    const caption = "wouorud" ;

    return (
        <>
            <Header/>
            <div className={styles.Container}>
                <h1 className={styles.H1}>
                    Latest News
                </h1>
                <article className={styles.Newsletter}>
                <NewsCard
                    first={true}
                    title={title}
                    image={image}
                    alt={"s,dnksdkk"}
                    caption={"admjkjsa"}
                />
                <NewsCard
                    className={styles.NewsCard}
                    title={title}
                    image={image}
                    alt={"blbshdds"}
                    caption={caption}
                />
                <NewsCard
                    className={styles.NewsCard}
                    title={title}
                    image={image}
                    alt={"blbshdds"}
                    caption={caption}
                />
                <NewsCard
                    className={styles.NewsCard}
                    title={title}
                    image={image}
                    alt={"blbshdds"}
                    caption={caption}
                />
                <NewsCard
                    className={styles.NewsCard}
                    title={title}
                    image={image}
                    alt={"blbshdds"}
                    caption={caption}
                />
                <NewsCard
                    className={styles.NewsCard}
                    title={title}
                    image={image}
                    alt={"blbshdds"}
                    caption={caption}
                />
                <NewsCard
                    className={styles.NewsCard}
                    title={title}
                    image={image}
                    alt={"blbshdds"}
                    caption={caption}
                />
                </article>
                <div className={styles.btn}>
                    <Button text="Load more" size={width} color={"green"} subscribed={false}/>                
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Newsletter