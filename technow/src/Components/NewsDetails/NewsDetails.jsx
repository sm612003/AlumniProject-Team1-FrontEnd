import { ScrollButton } from '../ScrollButton/ScrollButton'
import styles from './NewsDetails.module.css'

const NewsDetails = () => {
    const image = "https://techcrunch.com/wp-content/uploads/2023/08/threads-desktop-GettyImages-1524135861.jpg?w=730&crop=1"
    const alt = "Wouroud"
    const caption = "Jacquelyn Melinek@jacqmelinek / 12:08 AM GMT+3•October 14, 2023"
    const title = "Trezor launches two new devices to help onboard crypto newbies"

    const Desc = `Trezor, a hardware crypto wallet company, debuted two new products this week at the Bitcoin Amsterdam conference — and we got to take a first look at them.
    Trezor Safe 3, a hardware crypto wallet, and Trezor Keep Metal, a “mistake-proof” backup solution for wallet passwords, launched in celebration of the company's 10-year anniversary.
    The new crypto wallet is designed specifically for new digital asset entrants with a focus on “maximum safety and ease of use,” Matěj Žák, CEO of Trezor, said to TechCrunch.
    Hardware crypto wallets are one of — if not the — safest ways to store your digital assets, because they're typically not connected to the internet, inhibiting the risk of an online attack. Also it's arguably better sometimes to keep cryptocurrencies on a wallet instead of a centralized exchange, where they can be frozen and withheld like Celsius did in June 2022, because it gives you total control over the tokens.
    But that control also comes with a lot of responsibility. While the device holds your coins securely, you only get told the passcode (seed phrase) once upon setting up a wallet. If you forget it, you might lose access forever.
    In the past year to 18 months, a lot of crypto wallet providers have improved their user interfaces and products to create a user-friendly experience, given how difficult the onboarding process into the space has historically been.
    In December 2022, Ledger, a security-focused firm that sells crypto hardware wallets, partnered with the designer behind the iPod, Tony Fadell, in hopes of creating an easier, more accessible way for users to secure their crypto assets.
    “Our team has spent literally thousands of hours developing our user experience,” Žák said. “We have carried out extensive research and focus groups with crypto novice audiences to underpin development of our new products.”`

    const Subtitle = "Trezor Safe 3 aims to make crypto wallets easier to use"
    const SubDesc = `Trezor Safe 3 retails for $79 and is available in four colors — gold, rose gold, silver and black — with a 0.96” monochromatic OLED screen and two-button pad.
    The wallet supports major cryptocurrencies like bitcoin and Ethereum, as well as over 7,000 other tokens. It can be integrated with Trezor's desktop application, which helps users manage their cryptocurrencies on its platform. The product also has a tamper-resistant hardware component to provide additional protection in real life and can operate in conditions ranging from negative 4°F to 140°F, according to Trezor's website.
    The Trezor Safe 3 weighs only half an ounce and comes in a box about the size of an iPhone, which includes the wallet itself, a USB-C charging cable, some branded stickers and a pamphlet describing how to set it up, alongside two paper cards so you can write down your 12-word recovery phrase, also known as a seed phrase, that gives you access to your device's assets.
    It's important to remember that for any crypto wallet you have you write down your recovery phrase on a piece of paper — not online — and store it in a safe place so no one else has access to it. Recovery seeds are randomly generated words created by the wallet that allows you to recover and access your funds; think of it like a password that you can't forget because you can't reset it.`

    const link = `"fjjfkdkjfshfdkjhuiwheifuhwi dsjbfjuihseifhsiu"`
    return(
        <div className={styles.Container}>
            <div className={styles.Title}>
                <h1 className={styles.H1}>
                    {title}
                </h1>
                <p className={styles.Caption}>
                    {caption}
                </p>
            </div>
            <div className={styles.Desc}>
                <img src={image} alt={alt} className={styles.Img}/>
                <p className={styles.P}>
                    {Desc}
                </p>
            </div>
            <div className={styles.SubDesc}>
                <h2 className={styles.H2}>
                    {Subtitle}
                </h2>
                <p className={styles.P}>
                    {SubDesc}
                </p>
            </div>
            <div className={styles.Links}>
                <h2 className={styles.H2} >
                    Additional Links
                </h2>
                <p className={styles.P}>{link}</p>
                    <ScrollButton />
            </div>
        </div>
    )
}

export default NewsDetails