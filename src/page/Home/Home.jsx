import CategoriesSection from "../../component/CategoriesSection";
import Faq from "../../component/Faq";
import FeaturedProducts from "../../component/FeaturedProducts";
import HomeBanner from "../../component/HomeBanner";

const Home = () => {
    return (
        <div>
            <HomeBanner />
            <CategoriesSection />
            <FeaturedProducts />
            <Faq/>
        </div>
    );
};

export default Home;