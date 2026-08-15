// import Header from '@/components/Header';
// import { HomeHeader } from '@/components/UserHeader';
// import BeforeFooter from '@/components/home/BeforeFooter';
import FirstSection from "@/components/home/FirstSection";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/web/Navbar";
export default function Home() {
  return (
    <>
      {/* <HomeHeader /> */}
      <header className="container">
        <Navbar />
      </header>
      <main className="container mt-2">
        <Hero />

        <FirstSection />
        {/* <BeforeFooter /> */}
      </main>
    </>
  );
}
