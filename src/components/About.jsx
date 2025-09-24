import { useState, useEffect } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("about");
      if (section) {
        const rect = section.getBoundingClientRect();
        // เช็คว่าผู้ใช้ scroll มาถึง section นี้หรือยัง
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // เช็คตอนโหลดหน้า

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about"
      className={`py-20 px-8 bg-gray-800 text-white transition-all duration-1000 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">About Me</h3>
        <p className="text-gray-300 text-lg leading-relaxed">
          ผมมีความสนใจด้านการพัฒนาเว็บไซต์ การออกแบบ UX/UI และการสร้างโมเดล AI
          และ Machine Learning มีประสบการณ์ในการพัฒนา Web Application ทั้ง
          Frontend และ Backend ครอบคลุมตั้งแต่การออกแบบระบบ การพัฒนา และการทดสอบ
          พร้อมทั้งสนใจงานด้านดิจิทัลและนวัตกรรมใหม่ ๆ
          และมุ่งมั่นพัฒนาทักษะอย่างต่อเนื่องเพื่อเตรียมความพร้อมสำหรับการทำงานจริง
        </p>
      </div>
    </section>
  );
}

