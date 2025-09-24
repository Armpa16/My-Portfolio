import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const sections = ["hero", "about", "skills", "projects", "contact"];
    const handleActiveLink = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSection = "hero";

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          currentSection = sectionId;
          break;
        }
      }
      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleActiveLink);
    handleActiveLink();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleActiveLink);
    };
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    if (isOpen) toggleMenu();
  };

  const navLinks = [
    { id: "about", title: "About" },
    { id: "skills", title: "Skills" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" },
  ];

  const renderNavLink = (id, title, isMobile = false) => {
    const isActive = activeLink === id;
    return (
      <a
        href={`#${id}`}
        onClick={(e) => handleNavClick(e, id)}
        className={`relative font-medium tracking-wide transition-colors duration-300 ${
          isMobile ? "text-xl py-2" : "text-lg"
        } ${isActive ? "text-indigo-400" : "text-gray-400 hover:text-indigo-400"}`}
      >
        {title}
        {/* เส้นใต้สำหรับ desktop และมือถือ */}
        <span
          className={`absolute left-0 -bottom-1.5 w-full h-0.5 bg-indigo-400 transform transition-transform duration-300 ease-out ${
            isActive ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </a>
    );
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-40 transition-all duration-300 ${
        isScrolled || isOpen ? "bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-4 relative z-50">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="text-2xl font-bold text-white hover:text-indigo-300 transition-colors duration-300 cursor-pointer"
        >
          <span className="text-indigo-300">My</span>Portfolio
        </a>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>{renderNavLink(link.id, link.title)}</li>
          ))}
        </ul>

        {/* Hamburger Mobile */}
        <button
          className="md:hidden text-white text-2xl cursor-pointer z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center justify-center gap-6 py-6 bg-gray-900/95 backdrop-blur-md shadow-lg">
          {navLinks.map((link) => (
            <li key={link.id} className="w-full text-center relative">
              {renderNavLink(link.id, link.title, true)}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

