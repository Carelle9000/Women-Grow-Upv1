import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
   
      <main className="flex-grow">{children}</main>
      
    </div>
  );
}
