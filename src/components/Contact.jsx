import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="contact" className="py-16 sm:py-20 px-8 bg-gray-100 text-gray-900 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">Contact Me</h3>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            ช่องทางที่สะดวกที่สุดในการติดต่อคือทางอีเมล หรือผ่านโซเชียลมีเดียด้านล่างนี้ครับ
          </p>
        </div>

        {/* Email & Social Links */}
        <div className="flex flex-col items-center gap-8">
          <a
            href="mailto:panudech1419@gmail.com"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-1"
          >
            <FaEnvelope className="text-indigo-500" size={20} />
            panudech1419@gmail.com
          </a>

          <div className="flex items-center justify-center gap-5">
            <a href="https://www.linkedin.com/in/panudech-susankunthorn-b52197299/" aria-label="Linkedin" className="p-3 rounded-full bg-gray-200 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/Armpa16" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-full bg-gray-200 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110">
              <FaGithub size={24} />
            </a>
            <a href="https://web.facebook.com/Panudech.Susankunthorn" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-3 rounded-full bg-gray-200 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/armpa_p/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 rounded-full bg-gray-200 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
