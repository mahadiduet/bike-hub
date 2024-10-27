import { Helmet } from "react-helmet";
import CategoriesSection from "../../component/CategoriesSection";
import Faq from "../../component/Faq";
import FeaturedProducts from "../../component/FeaturedProducts";
import HomeBanner from "../../component/HomeBanner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BikeHub | Home</title>
            </Helmet>
            <HomeBanner />
            <CategoriesSection />
            <FeaturedProducts />
            <Faq />
        </div>
    );
};

export default Home;