import {useEffect , useState} from 'react'
import styles from "./Dashboard.module.css"
import DashboardCard from '../../Components/Dashboard Card/DashboardCard'
import { ScrollButton } from '../../Components/ScrollButton/ScrollButton'
import { Button } from '../../Components/Buttons/Buttons'
import axios from 'axios'
import {Logo} from '../../Components/Logo/Logo'
import { Link } from 'react-router-dom'
import NewsUpdate from '../NewsUpdate/NewsUpdateForm'
import NewsForm from '../NewsForm/NewsForm'

 const Dashboard = () => {
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


  const [clicked , setClicked] = useState(false)
  const [newsForm , setNewsForm] = useState(false)
  const [newUpdate , setNewUpdate] = useState(false)
  const [newsData , setNewsData] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newsID , setNewsID] = useState('')

  const toogleBlogs = () => {
    setClicked(true)
  }
  const toogleNews = () => {
    setClicked(false)
  }

  const toogleNewsForm = () => {
    if (newsForm === false){
    setNewsForm(true)
    } else {
      setNewsForm(false)
    }
  }

  useEffect(() => {
      const fetchData = async () => {
          try{ 
              if(newsData.length === 0)
                  setIsLoading(true)
              if (!navigator.onLine) {
                  setNetworkError(true);
                  setError(false);
                  setIsLoading(false)
                  return;
                }
              const response = await axios.get('http://localhost:5000/read/news') ;
                if(!response.ok){
                  setError(true)
                  setIsLoading(false)
                  setError(false)
                  setNetworkError(false)
                }
              setNewsData(response.data);
              if(newsData){
                  setIsLoading(false)
                  setError(false)
                  setNetworkError(false)
              }
          } catch(error){
              if (error.message === "Network request failed") {
                  setNetworkError(true);
                  setIsLoading(false)
                } else {
                  setError(true);
                }
                window.addEventListener("offline", () => {
                  setNetworkError(true);
                  setError(false);
                  setIsLoading(false)
                });
                console.error("API Error: ", error);
                setIsLoading(false);
          }
      };
  fetchData();
  }, []) ;  

  const [blogData , setBlogData] = useState([]);

    useEffect(() => {
      const fetchData1 = async () => {
        try{ 
          if(blogData.length === 0)
          setIsLoading(true)
        if (!navigator.onLine) {
          setNetworkError(true);
          setError(false);
          setIsLoading(false)
          return;
        }
        const response = await axios.get('http://localhost:5000/read/blogs') ;
        if(!response.ok){
          setError(true)
          setIsLoading(false)
          setError(false)
          setNetworkError(false)
        }
        setBlogData(response.data);
        if(newsData){
                setIsLoading(false)
                setError(false)
                setNetworkError(false)
              }
            } catch(error){
              if (error.message === "Network request failed") {
                setNetworkError(true);
                setIsLoading(false)
              } else {
                setError(true);
              }
              window.addEventListener("offline", () => {
                setNetworkError(true);
                setError(false);
                setIsLoading(false)
              });
              console.error("API Error: ", error);
              setIsLoading(false);
            }
          };
          fetchData1()
        }, []) ;  
        
        
    const errorStyle = {
      display: "flex",
      color: "red",
      padding: "10px",
      borderRadius: "5px",
    };

    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    };

  return (
    <div className={styles.Dashboard}>


      {!clicked ? (
        <>
        <nav className={styles.Navbar}>
        <div className={styles.Name}>Dashboard</div>
        <div className={styles.Buttons}>
            <ul className={styles.ul}>
              <li className={styles.li} onClick={toogleNews}>News</li>
              <li className={styles.li} onClick={toogleBlogs}>Blogs</li>
            </ul>
          </div>
        </nav>
        <div className={styles.Bottom}>
        <div className={styles.Manage}>
          <h1 className={styles.h1}>Manage News</h1>
          <span onClick={toogleNewsForm}>
            <Button color={"green"} text={'Add News'} size={width} subscribed={false}/>
          </span>
          { newsForm ? <NewsForm/> : ""}
        </div>
        {isLoading ? (
                        <div style={containerStyle}>
                            <h1 >Loading ...</h1>
                        </div>
                    ) : networkError? (
                <div style={containerStyle}>
                    <h1 style={errorStyle}>Newtwork Issue</h1>
                </div> 
                ) : error ? (
                    <div style={containerStyle}>
                        <h1 style={errorStyle}>News Not Found</h1>
                    </div>
                ): (
                    <> 
                    { newUpdate ? (
                      <NewsUpdate 
                      newsID = {newsID}
                      />
                    ) : ""
                    }
                        <div className={styles.cont}>
                            {newsData.map((key , index) => (  
                                  <DashboardCard 
                                      key={key._id}
                                      title={key.title}  
                                      author={key.author}
                                      date = {key.date}
                                      _id={key._id}
                                      newUpdate ={newUpdate}
                                      setNewUpdate = {setNewUpdate}
                                      setNewsID = {setNewsID}
                                      > 
                                  </DashboardCard>

                                ))}
                        </div>
                    </>
                )}
      </div>
      </>
      ) : (
        <>
        <nav className={styles.Navbar}>
        <div className={styles.Name}>Dashboard</div>
        <div className={styles.Logo}><Logo color={"green"}/></div>
        <div className={styles.Buttons}>
          <ul className={styles.ul}>
            <li className={styles.li} onClick={toogleNews}>News</li>
            <li className={styles.li} onClick={toogleBlogs}>Blogs</li>
          </ul>
        </div>
      </nav>
        <div className={styles.Bottom}>
        <div className={styles.Manage}>
          <h1 className={styles.h1}>Manage Blogs</h1>
          <Link to='/blogsForm' className={styles.Link}>
            <Button color={"green"} text={'Add Blogs'} size={width} subscribed={false}/>
          </Link>
        </div>
        {isLoading ? (
                        <div style={containerStyle}>
                            <h1 >Loading ...</h1>
                        </div>
                    ) : networkError? (
                <div style={containerStyle}>
                    <h1 style={errorStyle}>Newtwork Issue</h1>
                </div> 
                ) : error ? (
                    <div style={containerStyle}>
                        <h1 style={errorStyle}>News Not Found</h1>
                    </div>
                ): (
                    <>
                        <div className={styles.cont}>
                            {blogData.map((key , index) => (  
                                  <DashboardCard 
                                      key={key._id}
                                      title={key.title}  
                                      author={key.author}
                                      createdAt = {key.createdAt}
                                      _id={key._id}
                                      blog = {true}
                                      > 
                                  </DashboardCard>

                                ))}
                        </div>
                    </>
                )}
      </div>
      </>
      )
      }
      
      <ScrollButton/>
    </div>
  )
}

export default Dashboard