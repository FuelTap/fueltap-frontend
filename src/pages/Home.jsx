import Header from '@/components/Header';
import { HomeHeader } from '@/components/UserHeader';
import BeforeFooter from '@/features/home/BeforeFooter';
import FirstSection from '@/features/home/FirstSection';
import Hero from '@/features/home/Hero';

const Home = () => {
  return (
    <>
      <HomeHeader />
      <main className="container mt-2">
        <Hero />

        <FirstSection />
        <BeforeFooter />
      </main>
    </>
  );
};

export default Home;
