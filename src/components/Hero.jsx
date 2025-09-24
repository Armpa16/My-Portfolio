import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

export default function Hero() {
  const text = "Web Developer | UI/UX Designer | AI Developer";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // เพิ่มสำหรับ animation

  useEffect(() => {
    // เปิด animation หลังโหลดหน้า
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200); // รอ 200ms ก่อนเริ่ม animation
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timeout;

    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 50);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, 50);
    } else {
      timeout = setTimeout(() => setIsDeleting(!isDeleting), 1000);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text]);

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-6 sm:px-8 pt-24 sm:pt-16 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20 pb-16">
        {/* รูปวงกลม */}
        <div className="w-60 h-60 md:w-90 md:h-90 rounded-full overflow-hidden shadow-md transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
          <img
            src="/img/ภาณุเดช.jpg"
            alt="Panudech"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* ข้อความ */}
        <div className="text-center md:text-left max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Hi, I'm{" "}
            <span className="text-indigo-400">Panudech Susankunthorn</span>
          </h2>

          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h3>

          <p className="text-gray-300 mb-8 text-lg md:text-xl max-w-2xl">
            I'm a passionate Web Developer building modern, responsive, and
            user-friendly websites.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/Armpa16"
              target="_blank"
              className="group flex items-center justify-center gap-2 bg-white hover:bg-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-450"
            >
              <FaGithub
                size={20}
                className="text-black group-hover:text-white"
              />
              <span className="text-black group-hover:text-white">GitHub</span>
            </a>

            <a
              href="/Resume_Panudech_Silpakorn-1.pdf"
              download
              className="group flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-inner transition-all duration-300"
            >
              <HiDownload
                size={20}
                className="text-black transition-colors duration-300"
              />
              <span className="text-black transition-colors duration-300">
                Resume
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
