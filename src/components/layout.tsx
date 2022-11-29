import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
// import { useAuth } from "src/auth/useAuth";


interface IProps {
    main: ReactNode;
  }

  const Layout: FunctionComponent<IProps> = ({ main }) => {
    // const { logout, authenticated } = useAuth();
    return ( <div className="max-w-screen-2xl mx-auto text-white bg-red-500">{main}</div>
    );
};
  export default Layout;
