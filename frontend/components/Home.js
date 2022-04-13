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
                        <p>Everything you need to create your store, start selling, and build your business.</p>
                        <div className="blueSphere"></div>
                        <div className="purpleSphere">
                            <img src="https://res.cloudinary.com/dddnhychw/image/upload/v1619407006/Web-Images/9eacf7cedc0893ff8192c1db0e5c6326-closed-box-with-package-signs-by-vexels_f5ecgf.png"/>
                        </div>
                    </div>
                </StyledBanner>
            </Main>
            <Section>
                <div className="sectionColumn">
                    <i className="fas fa-shopping-bag shopIcon faIcon" aria-hidden/>
                    <p>Create Your Store</p>
                </div>
                <div className="sectionColumn">
                    <i className="fas fa-credit-card cardIcon faIcon" aria-hidden/>
                    <p>Sell your products</p>
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