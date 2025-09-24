import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ProjectModal = ({ project, onClose }) => {
  // ปิด scroll เมื่อ modal เปิด
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // ปิด modal เมื่อกด Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform scale-95 animate-zoomIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 z-10"
        >
          <IoClose size={28} />
        </button>

        {/* Header + ภาพ */}
        <div className="relative">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-2xl" />
          <h3 className="absolute bottom-4 left-6 text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {project.title}
          </h3>
        </div>

        {/* เนื้อหา */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-lg">
            {project.desc}
          </p>

          {/* Tech Stack */}
          {project.tech && project.tech.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((techItem, index) => (
                  <span
                    key={index}
                    className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 text-sm font-medium px-3 py-1 rounded-full shadow-sm hover:bg-indigo-600/30 transition-all duration-300 cursor-default"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ปุ่มลิงก์ */}
          {project.link && project.link !== "#" && (
            <div className="pt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
              >
                <span className="text-white">ดูผลงาน</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, onOpenModal }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // ให้ animation แสดงแค่ครั้งเดียว
    threshold: 0.1, // เริ่ม animation เมื่อเห็น component 10%
    rootMargin: "-100px 0px", // เริ่ม animation เร็วขึ้น 100px
  });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`mb-16 flex items-center relative w-full ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Dot */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-indigo-500 rounded-full border-4 border-gray-900 z-10"></div>

      {/* Card Content */}
      <div className="md:w-1/2 w-full md:px-10">
        <div
          className={`bg-gray-800 p-8 rounded-2xl shadow-lg transform transition-all duration-700 ease-out hover:scale-105 ${
            isEven ? "md:text-right" : "md:text-left"
          } ${
            inView
              ? "translate-y-0 sm:translate-x-0 opacity-100"
              : `translate-y-10 sm:translate-y-0 ${
                  isEven ? "sm:-translate-x-10" : "sm:translate-x-10"
                } opacity-0`
          }`}
        >
          <span className="md:hidden text-indigo-500 font-bold text-2xl">
            {project.year}
          </span>
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg my-4"
          />
          <h4 className="text-2xl font-bold mb-3">{project.title}</h4>
          <p className="text-gray-300 mb-4">{project.desc}</p>
          <button
            onClick={() => onOpenModal(project)}
            className="mt-2 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300 shadow-md"
          >
            ดูเพิ่มเติม
          </button>
        </div>
      </div>

      {/* Spacer & Year for desktop */}
      <div
        className={`hidden md:flex w-1/2 px-10 items-center ${
          isEven ? "justify-start" : "justify-end"
        }`}
      >
        <span className="text-indigo-500 font-bold text-3xl">
          {project.year}
        </span>
      </div>
    </div>
  );
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState("WebDev");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const allProjects = {
    WebDev: [
      {
        year: "2025",
        title: "ระบบแนะนําอาหารที่เหมาะสมสําหรับผู้สูงอายุ",
        desc: "ระบบแนะนําอาหารที่เหมาะสมสําหรับผู้สูงอายุ โดยใช้ Machine Learning วิเคราะห์ข้อมูลสุขภาพและนําเสนอเมนูอาหารให้เหมาะสมต่อสุขภาพและโภชนาการเฉพาะบุคคล",
        img: "img/FoodRecomendSystem.jpg",
        link: "https://github.com/Armpa16/Food-Recommendation-System-By-Machine-Learning",
        tech: [
          "Python",
          "Flask",
          "PHP",
          "HTML",
          "CSS",
          "JavaScript",
          "Bootstrap",
          "MySQL",
          "Machine Learning",
          "Jupyter Notebook",
        ],
      },
      {
        year: "2025",
        title: "Jotify ระบบจดบันทึกงาน",
        desc: "เว็บแอปสำหรับการสร้าง แก้ไข และจัดการบันทึกงานออนไลน์ ช่วยให้ผู้ใช้สามารถบันทึกงานสำคัญได้สะดวก พร้อมระบบแจ้งเตือนที่ใช้งานง่าย และออกแบบ UX/UI ให้ใช้งานได้ลื่นไหล",
        img: "img/Jotify.png",
        link: "https://github.com/Armpa16/Jotify",
        tech: [
          "HTML",
          "CSS",
          "JavaScript",
          "Bootstrap",
          "MySQL",
          "PHP",
          "SweetAlert",
        ],
      },
      {
        year: "2024",
        title: "StudyNet เเพลตฟอร์มการเรียนรู้ออนไลน์",
        desc: "เว็บไซต์แพลตฟอร์มการเรียนรู้ออนไลน์ที่ช่วยให้นักเรียนสามารถเข้าถึงเนื้อหาการเรียนได้ทุกที่ทุกเวลา รองรับการใช้งานบนอุปกรณ์หลากหลาย (Responsive Design)",
        img: "img/WebStudyNet.png",
        link: "https://github.com/Armpa16/StudyNet",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      },
      {
        year: "2024",
        title: "Kena: Bridge of Spirits Webpage (Redesign)",
        desc: "ออกแบบและพัฒนาเว็บไซต์เกม Kena: Bridge of Spirits ใหม่ โดยมุ่งเน้นความสวยงามและประสบการณ์ผู้ใช้ (UX/UI) ให้สอดคล้องกับบรรยากาศของเกม",
        img: "img/WebKena.png",
        link: "https://armpa16.github.io/KENA-Bridge-OF-Spirits/",
        tech: ["HTML", "CSS"],
      },
      {
        year: "2024",
        title: "Speeddrifters Webpage (Redesign)",
        desc: "Redesign เว็บไซต์เกม Speeddrifters โดยเน้นประสบการณ์ผู้ใช้และความสวยงามในการนำเสนอคอนเทนต์",
        img: "img/SPD.png",
        link: "https://armpa16.github.io/Speeddrifter_Redesign/",
        tech: ["HTML", "CSS", "Bx Slider"],
      },
    ],
    UXUI: [
      {
        year: "2024",
        title: "ICT SU APP (Community)",
        desc: "วิเคราะห์และออกแบบ UX/UI สำหรับแอปพลิเคชัน ICT SU (Community) เพื่อให้ผู้ใช้สามารถแลกเปลี่ยนความรู้และสื่อสารกันได้สะดวกยิ่งขึ้น",
        img: "img/Ictsuapp.png",
        link: "https://www.figma.com/design/tgvUYoMc1z05kYyAAsQuCJ/Design-ICT-SU-APP-Aj.Umm?node-id=226-2&t=DTszfVZGCgo7IUkm-1",
        tech: ["Figma"],
      },
      {
        year: "2024",
        title: "Redesign Webpage Game",
        desc: "ออกแบบ UX/UI สำหรับเว็บไซต์เกม Kena: Bridge of Spirits โดยคงสไตล์ที่เข้ากับโทนเกม และเพิ่มประสบการณ์ผู้ใช้ให้ดียิ่งขึ้น",
        img: "img/Kena.png",
        link: "https://www.figma.com/site/bAoMnYkMgO8GbJxOUIQQAE/Untitled?node-id=1-129&t=rhg2IYrlSelSVFiV-1",
        tech: ["Figma"],
      },
      {
        year: "2024",
        title: "InnerGlow (Cosmetic Website)",
        desc: "ออกแบบ Webpage สำหรับเว็บไซต์เครื่องสำอาง เน้นความสวยงาม เรียบง่าย และสามารถนำไปใช้ต่อยอดในการพัฒนาเว็บไซต์จริง",
        img: "img/Cosmetic.png",
        link: "https://www.figma.com/site/LgL8ERisqTy2V5oukIrJLO/Untitled?node-id=1-250&t=LNns00CYUK4lwlWK-1",
        tech: ["Figma"],
      },
      {
        year: "2024",
        title: "INNOCENCE",
        desc: "ออกแบบ Webpage สำหรับเว็บไซต์เครื่องสำอาง เน้นการสร้างประสบการณ์ผู้ใช้ที่น่าดึงดูดด้วยดีไซน์ที่เรียบหรู ใช้โทนสีและองค์ประกอบที่สอดคล้องกับแบรนด์ พร้อมสร้าง UI Kit ที่สามารถนำไปพัฒนาต่อยอดได้จริง",
        img: "img/Innocence.png",
        link: "https://www.figma.com/site/OILn0jsENH1Iusq8wWLJiW/Untitled?node-id=1-375&t=qDoZPeXWHullo76d-1",
        tech: ["Figma"],
      },
    ],
  };

  const projects = allProjects[activeTab];

  return (
    <section id="projects" className="py-20 px-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center">Projects</h3>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("WebDev")}
            className={`px-6 py-2 font-semibold rounded-full transition-colors duration-300 ${
              activeTab === "WebDev"
                ? "bg-indigo-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Web Development
          </button>
          <button
            onClick={() => setActiveTab("UXUI")}
            className={`px-6 py-2 font-semibold rounded-full transition-colors duration-300 ${
              activeTab === "UXUI"
                ? "bg-indigo-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            UX/UI Design
          </button>
        </div>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 top-0 w-1 bg-gray-600 h-full transform -translate-x-1/2"></div>

          {projects.map((project, index) => (
            <ProjectCard
              key={`${activeTab}-${index}`}
              project={project}
              index={index}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </div>
    </section>
  );
}
