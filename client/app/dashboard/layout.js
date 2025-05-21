import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 md:pt-16">
      <Navbar />
      {children}
    </div>
  );
}