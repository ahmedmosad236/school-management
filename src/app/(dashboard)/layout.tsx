import Image from "next/image";
import Link from "next/link";
import Menu from "../../components/Menu";
import Navbar from "../../components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <div className="p-4 w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]  ">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">Schoolly</span>
        </Link>
        <Menu />
      </div>
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] flex flex-col ">
        <Navbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
