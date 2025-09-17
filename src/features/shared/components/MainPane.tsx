export default function MainPane({ children }: { children?: React.ReactNode }) {
  return (
    <section className="flex-1 rounded-2xl bg-white shadow-sm w-full">
      {children}
    </section>
  );
}


