import Hero from "@/components/Hero/Hero";
import SquadHostFeature from "@/components/SquadHostFeature/SquadHostFeature";

export default function Home() {
  return (
    <main className="page" style={{ paddingTop: 0 }}>
      <Hero />
      <SquadHostFeature />
    </main>
  );
}
