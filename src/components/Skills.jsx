import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython, FaPhp, FaBootstrap } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiMysql, SiGithub, SiPostman, SiFigma, SiJupyter, SiXampp, SiFlask, SiRender, SiRailway } from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import { useInView } from "react-intersection-observer";

const SkillCard = ({ icon, label, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center gap-3 w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44
                 bg-white rounded-xl shadow-md hover:shadow-xl 
                 transform transition-all duration-500 ease-out hover:scale-105
                 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {icon}
      <span className="font-medium text-center">{label}</span>
    </div>
  );
};

export default function Skills() {
  const skillsData = [
    { icon: <FaHtml5 size={50} className="text-[#E44D26]" />, label: "HTML5" },
    { icon: <FaCss3Alt size={50} className="text-[#1572B6]" />, label: "CSS3" },
    { icon: <SiJavascript size={50} className="text-[#F7DF1E]" />, label: "JavaScript" },
    { icon: <FaReact size={50} className="text-[#61DAFB]" />, label: "React" },
    { icon: <SiTailwindcss size={50} className="text-[#3dc0e0]" />, label: "TailwindCSS" },
    { icon: <FaNodeJs size={50} className="text-[#339933]" />, label: "Node.js" },
    { icon: <SiMysql size={50} className="text-[#4479A1]" />, label: "MySQL" },
    { icon: <FaPython size={50} className="text-[#3776AB]" />, label: "Python" },
    { icon: <FaPhp size={50} className="text-[#777BB4]" />, label: "PHP" },
    { icon: <FaBootstrap size={50} className="text-[#7952B3]" />, label: "Bootstrap" },
    { icon: <SiFlask size={50} className="text-[#000000]" />, label: "Flask" },
  ];

  const toolsData = [
    { icon: <DiVisualstudio size={50} className="text-[#007ACC]" />, label: "VS Code" },
    { icon: <SiGithub size={50} className="text-gray-800" />, label: "GitHub" },
    { icon: <SiPostman size={50} className="text-orange-500" />, label: "Postman" },
    { icon: <SiFigma size={50} className="text-pink-500" />, label: "Figma" },
    { icon: <SiJupyter size={50} className="text-orange-400]" />, label: "Jupyter Notebook" },
    { icon: <SiXampp size={50} className="text-orange-400]" />, label: "XAMPP" },
    { icon: <SiRender size={50} className="text-gray-800]" />, label: "Render" },
    { icon: <SiRailway size={50} className="text-gray-800]" />, label: "Railway" },
  ];

  return (
    <section id="skills" className="py-24 bg-gray-100 text-gray-900 px-8 overflow-hidden">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-16 text-center text-indigo-500">Skills & Tools</h2>

    {/* Tech Stack */}
    <div className="mb-16">
      <h3 className="text-2xl font-semibold mb-8 text-indigo-500 text-center">Skills / ทักษะ</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {skillsData.map((skill, index) => (
          <SkillCard key={`skill-${index}`} icon={skill.icon} label={skill.label} index={index} />
        ))}
      </div>
    </div>

    {/* Tools */}
    <div>
      <h3 className="text-2xl font-semibold mb-8 text-indigo-500 text-center">Tools / เครื่องมือ</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {toolsData.map((tool, index) => (
          <SkillCard key={`tool-${index}`} icon={tool.icon} label={tool.label} index={index} />
        ))}
      </div>
    </div>
  </div>
</section>
  );
}
