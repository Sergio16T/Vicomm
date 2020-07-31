import { useQuery, gql } from '@apollo/client';
import Header from '../components/Header'; 
import { HomePage, StyledBanner, Main, Section } from './Styles/HomePageStyles'; 

const GET_USERS_QUERY = gql`
    query GET_USERS_QUERY {
        users {
            FST_NAME
            EMAIL
        }
    }
`; 


const Home = (props) => {
    return (
        <HomePage>
            <Header/>
            <Main>
                <StyledBanner>
                    <div className="bannerColumn">
                        <h1>Ecommerce for everyone!</h1>
                        <p>Create your content, follow your favorite pages, shop, and generate revenue!</p>

                    </div>
                    {/* <img  alt="" title="" data-srcset="https://data.world/wp-content/uploads/2020/06/Backend-UI-1.png 2644w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-1280x802.png 1280w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-980x614.png 980w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-480x301.png 480w" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 2644px, 100vw" data-src="https://data.world/wp-content/uploads/2020/06/Backend-UI-1.png" src="https://data.world/wp-content/uploads/2020/06/Backend-UI-1.png" loading="lazy" srcSet="https://data.world/wp-content/uploads/2020/06/Backend-UI-1.png 2644w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-1280x802.png 1280w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-980x614.png 980w, https://data.world/wp-content/uploads/2020/06/Backend-UI-1-480x301.png 480w"/> */}
                </StyledBanner>
            </Main>
            <Section>
                <div className="sectionColumn">
                    <i className="fas fa-shopping-bag shopIcon faIcon"></i>
                    <p>Create Your Store</p>
                </div>
                <div className="sectionColumn">
                    <i className="fab fa-youtube videoIcon faIcon"></i>
                    <p>Upload Videos</p>
                </div>
                <div className="sectionColumn">
                    <i className="fas fa-pen-alt contentIcon faIcon"></i>
                    <p>Share Content</p>
                </div>
                <div className="sectionColumn">
                    <i className="fas fa-chart-line chartLineIcon faIcon"></i>
                    <p>Grow your business</p>
                </div>
            </Section>
            {/* <Section/> */}
        </HomePage>
    )
}

export default Home