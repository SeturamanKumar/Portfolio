import RevealObserver from "@/components/RevealObserver/RevealObserver";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RevealObserver />
      {children}
    </>
  );
}
