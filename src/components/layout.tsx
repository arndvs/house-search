import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
// import { useAuth } from "src/auth/useAuth";


interface IProps {
    main: ReactNode;
  }

  const authenticated = false;

  const Layout: FunctionComponent<IProps> = ({ main }) => {
    // const { logout, authenticated } = useAuth();
    const logout = () => {};
    return ( <div className="max-w-screen-2xl mx-auto text-white bg-gray-900"> <nav className="bg-gray-800" style={{ height: "64px" }}>
    <div className="px-6 flex items-center justify-between h-16">
      <Link href="/">

          <Image
            src="/home-color.svg"
            alt="home house"
            className="inline w-6"
            width={24}
            height={24}
          />

      </Link>
      {authenticated ? (
        <>
          <Link href="/houses/add">
            Add House
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link href="/auth">
          <div>Login / Signup</div>
        </Link>
       )}
    </div>
  </nav>
  <main style={{ minHeight: "calc(100vh - 64px)" }}>{main}</main>
  </div>
    );
};
  export default Layout;
