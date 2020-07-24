import { useQuery, gql } from '@apollo/client';
import Header from '../components/Header'; 
import { StyledBanner, Main, Section } from './Styles/HomePageStyles'; 

const GET_USERS_QUERY = gql`
    query GET_USERS_QUERY {
        users {
            FST_NAME
            EMAIL
        }
    }
`; 


const Home = (props) => {
    const { loading, error, data } = useQuery(GET_USERS_QUERY); 
    if(loading) return null
    console.log('data', data); 
    return (
        <div>
            <Header/>
            <Main>
                <StyledBanner>
                    <div className="bannerColumn">
                       <h1>
                           All in 1 social platform. Create an online store, make posts, and host your videos for your followers. 
                        </h1> 
                    </div>
                    <img  alt="" title="" data-srcset="https://data.world/wp-content/uploads/2020/06/Backend-UI-1.png 2644w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-1280x802.png 1280w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-980x614.png 980w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-480x301.png 480w" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 2644px, 100vw" data-src="https://data.world/wp-content/uploads/2020/06/Backend-UI-1.png" src="https://data.world/wp-content/uploads/2020/06/Backend-UI-1.png" loading="lazy" srcSet="https://data.world/wp-content/uploads/2020/06/Backend-UI-1.png 2644w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-1280x802.png 1280w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-980x614.png 980w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-480x301.png 480w"/>
                </StyledBanner>
            </Main>
            <Section>
                <div className="sectionColumn">
                    <i className="fas fa-shopping-bag shopIcon"></i>
                    <p>Create Your Store</p>
                </div>
                <div className="sectionColumn">
                    <i className="fab fa-youtube videoIcon"></i>
                    <p>Upload Videos</p>
                </div>
                <div className="sectionColumn">
                    <i className="fas fa-pen-alt contentIcon"></i>
                    <p>Share Content</p>
                </div>
                <div className="sectionColumn">
                    <i className="fas fa-chart-line chartLineIcon"></i>
                    <p>Grow your business</p>
                </div>
            </Section>
            <Section/>
        </div>
    )
}

export default Home