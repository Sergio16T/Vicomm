import Header from './Layout/Header';
import { HomePage, StyledBanner, Main, Section } from './Styles/HomePageStyles';


const Home = () => {
    return (
        <HomePage>
            <Header/>
            <Main>
                <StyledBanner>
                    <div className="bannerColumn">
                        <h1>Ecommerce for everyone!</h1>
                        <p>Create your content, follow your favorite pages, shop, and generate revenue!</p>
                        <div className="blueSphere"></div>
                        <div className="purpleSphere"></div>
                    </div>
                </StyledBanner>
            </Main>
            <Section>
                <div className="sectionColumn">
                    <i className="fas fa-shopping-bag shopIcon faIcon" aria-hidden/>
                    <p>Create Your Store</p>
                </div>
                <div className="sectionColumn">
                    <i className="fab fa-youtube videoIcon faIcon" aria-hidden/>
                    <p>Upload Videos</p>
                </div>
                <div className="sectionColumn">
                    <i className="fas fa-pen-alt contentIcon faIcon" aria-hidden/>
                    <p>Share Content</p>
                </div>
                <div className="sectionColumn">
                    <i className="fas fa-chart-line chartLineIcon faIcon" aria-hidden/>
                    <p>Grow your business</p>
                </div>
            </Section>
        </HomePage>
    );
}

export default Home