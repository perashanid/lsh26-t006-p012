import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Tent } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
interface NavigationProps {
  variant?: "default" | "dark";
}
const Navigation = ({
  variant = "default"
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = variant === "dark";
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const handleBookNow = () => {
    if (isHomePage) {
      document.getElementById('booking')?.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  };
  const navItems = [{
    label: "Home",
    href: "/",
    isRoute: true
  }, {
    label: "Dashboard",
    href: "/dashboard",
    isRoute: true
  }, {
    label: "Expenses",
    href: "/expenses",
    isRoute: true
  }, {
    label: "Savings",
    href: "/savings",
    isRoute: true
  }, {
    label: "Settings",
    href: "/settings",
    isRoute: true
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: isVisible ? 0 : -100
  }} transition={{
    duration: 0.3
  }} className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 bg-card/95 backdrop-blur-lg shadow-soft`}>
    <div className="container mx-auto px-6 lg:px-12 py-5">
      <div className="flex items-center justify-between">
        <Link to="/">
          <motion.div whileHover={{
            scale: 1.02
          }} className="flex items-center gap-2 cursor-pointer">
            <Tent className="h-4 w-4 text-primary" />
            <span className="text-sm font-normal tracking-wide text-foreground">
              Personal Ledger
            </span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map(item => item.isRoute ? <Link key={item.label} to={item.href} className="text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 text-foreground">
            {item.label}
          </Link> : <a key={item.label} href={item.href} className="text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 text-foreground">
            {item.label}
          </a>)}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
          opacity: 0,
          clipPath: "inset(0 0 100% 0)"
        }} animate={{
          opacity: 1,
          clipPath: "inset(0 0 0% 0)"
        }} exit={{
          opacity: 0,
          clipPath: "inset(0 0 100% 0)"
        }} transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1]
        }} className="md:hidden mt-6 pb-4 -mx-6 px-6 rounded-b-xl bg-card">
          {navItems.map(item => item.isRoute ? <Link key={item.label} to={item.href} className="block py-3 text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
            {item.label}
          </Link> : <a key={item.label} href={item.href} className="block py-3 text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
            {item.label}
          </a>)}
        </motion.div>}
      </AnimatePresence>
    </div>
  </motion.nav>;
};
export default Navigation;