import React from "react";
import { motion } from "framer-motion";
import { InfoIcon } from "lucide-react";

const Steps2 = () => {
  const steps = [
    { title: "Sign Up", desc: "New to our website? Sign up and get started!", num: "01" },
    { title: "Create Post", desc: "Facing an issue? Share your experience with a post.", num: "02" },
    { title: "Read Posts", desc: "Curious about what's happening around you? Explore posts.", num: "03" },
    { title: "Access Helplines", desc: "Need help but unsure where to go? Find trusted helplines.", num: "04" },
    { title: "Read Blogs", desc: "Want quick safety tips or the latest updates? Check out our blogs.", num: "05" },
    { title: "About Us", desc: "Have doubts about our platform? Learn more about us.", num: "06" },
    { title: "Contact Us", desc: "Facing issues and need to connect? Reach out to us anytime.", num: "07" },
    { title: "Stay Updated", desc: "Stay informed with the latest news and security updates.", num: "08" },
  ];

  const leftSections = [
    {
      title: (
        <div className="flex items-center gap-2 text-[#7A2F46]">
          <InfoIcon className="w-6 h-6 text-[#7A2F46]" />
          <span className="font-semibold">Did You Know?</span>
        </div>
      ),
      content: (
        <ul className="list-disc ml-6 text-[#7A2F46] space-y-1 text-justify">
          <li>Poorly lit streets are 2.5x more likely to become hotspots for harassment and stalking at night.</li>
          <li>Areas without CCTV cameras see a 70% lower reporting rate, making it easier for offenders to get away.</li>
          <li>Eve teasing, often brushed off as “minor,” is a common precursor to more violent crimes against women.</li>
          <li>Eve teasing, often brushed off as “minor,” is a common precursor to more violent crimes against women.</li>
        </ul>
      )
    },
    {
      title: "🗣 Words from Women Like You",
      content: (
        <div className="space-y-6 text-[#7A2F46] italic">
  <div>
    <p>🔸 “It’s not just the attacker. It’s the broken streetlight, the empty road, the silence.”</p>
    <p className="text-right font-semibold not-italic">– Priya Ramesh, urban safety researcher</p>
  </div>
  <div>
    <p>🔸 “I avoid lane every day, not because I’m weak, but because no one fixed the damn CCTV.”</p>
    <p className="text-right font-semibold not-italic">– Shraddha, 21, Mumbai student</p>
  </div>
  <div>
    <p>🔸 “It starts with lewd comments, ends with trauma. In between, there’s no one watching.”</p>
    <p className="text-right font-semibold not-italic">– Anonymous post on Safecity platform</p>
  </div>
  <div>
    <p>🔸 “Badly lit streets are warnings. And we keep ignoring them.”</p>
    <p className="text-right font-semibold not-italic">– ElsaMarie D’Silva, founder of Red Dot Foundation</p>
  </div>
</div>

      )
    },
    {
      title: "💡 Know Your Rights",
      content: (
        <ul className="list-disc ml-6 text-[#7A2F46] space-y-1">
          <li>👉 Eve teasing is punishable under Section 509 of the IPC – report it immediately.</li>
          <li>👉 Touching or groping in public without consent falls under Section 354 of IPC – it’s a criminal offence.</li>
          <li>👉 Poorly maintained public spaces can be reported to municipal authorities as safety hazards.</li>
          <li>👉 You have the right to demand functioning streetlights, CCTV, and safe public transport as a matter of civic safety.</li>
          <li>👉 Under the Vishaka Guidelines and the POSH Act, harassment isn’t limited to offices – public institutions must ensure safety too.</li>
        </ul>
      )
    }
    
  ];

  return (
    <div className="w-full flex flex-col items-center px-6 py-16 bg-[#e6b7c5]">
      <motion.h3
        className="text-3xl font-bold text-[#7A2F46] mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        How to Use Our Platform
      </motion.h3>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-12">
        {/* Left Content Sections */}
        <div className="lg:w-9/10 space-y-10">
          {leftSections.map((section, idx) => (
            <motion.div
              key={idx}
              className="bg-[#f8dbe4] p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-[#7A2F46] mb-2">{section.title}</h2>
              <div className="text-md">{section.content}</div>
            </motion.div>
          ))}
        </div>

        {/* Right Steps Section */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`relative p-6 bg-[#cc738d] text-white rounded-xl shadow-lg transition duration-200 ease-out cursor-pointer 
                ${index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"} 
                hover:scale-105 hover:bg-[#b04a68] hover:shadow-2xl 
                hover:${index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"}
              `}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="text-sm">{step.desc}</p>
              <span className="absolute top-3 right-3 text-4xl font-bold text-white opacity-80">
                {step.num}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps2;
