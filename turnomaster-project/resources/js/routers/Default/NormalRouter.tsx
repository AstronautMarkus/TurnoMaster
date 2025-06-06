import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from '../../Pages/Default/Home/Home';
import DefaultLayout from '../../Layouts/Default/DefaultLayout';
import PricingComparison from '../../Pages/Default/Prices/Prices';
import AboutProject from '../../Pages/Default/AboutProject/AboutProject';
import Features from '../../Pages/Default/Features/Features';
import FaqPage from '../../Pages/Default/Faq/Faq';
import Contact from '../../Pages/Default/Contact/Contact';
import Audience from '../../Pages/Default/Audience/Audience';
import SecurityPrivacy from '../../Pages/Default/SecurityPrivacy/SecurityPrivacy';
import Product from '../../Pages/Default/Product/Product';

function NormalRouter() {
    const location = useLocation();
    const pageTransition = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
    };

    const handleExitComplete = () => {
        window.scrollTo(0, 0);
    };

    return (
        <DefaultLayout>
            <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
                <motion.div key={location.pathname} {...pageTransition} className="w-full">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/*" element={<HomePage />} />
                        <Route path="/prices" element={<PricingComparison />} />
                        <Route path="/about-project" element={<AboutProject />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/turnomaster-audience" element={<Audience />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route path="/security-privacy" element={<SecurityPrivacy />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/product/:slug" element={<Product />} />
                    </Routes>
                </motion.div>
            </AnimatePresence>
        </DefaultLayout>
    );
}

export default NormalRouter;
