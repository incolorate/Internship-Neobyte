import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <div className="m-4 min-h-full flex-grow rounded-xl bg-slate-300 bg-opacity-10 p-4 text-white">
        <div>{children}</div>
      </div>
    </div>
  );
}
