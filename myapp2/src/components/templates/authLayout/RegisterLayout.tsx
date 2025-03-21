import { ReactNode } from "react";

interface RegisterLayoutProps {
  children: ReactNode;
}

export const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <div className="m-auto my-5 bg-white rounded-2xl w-[90%] md:w-[600px] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] flex flex-col px-3 py-4">
      {children}
    </div>
  );
};