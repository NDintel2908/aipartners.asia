import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Users, Award, Briefcase, Trophy } from "lucide-react";
import Huong from "./member/Huong.jpg";
import Mike from "./member/Mike.jpg";
import Long from "./member/Long.png";

const members = [
  {
    name: "Long Nguyen",
    role: "Market Manager (VN)",
    image: Long,
  },
];

const programs = [
  {
    title: "AI Skill Development",
    description: "Basic AI training",
    icon: Users,
  },
  {
    title: "Professional AI Cert",
    description: "In-depth AI cert",
    icon: Award,
  },
  {
    title: "AI Job Placement",
    description: "Job guaranteed",
    icon: Briefcase,
  },
  {
    title: "Elite AI Training",
    description: "Expert training + recruitment",
    icon: Trophy,
  },
];

export default function AIWorkforce() {
  return (
    <div className="min-h-screen">
      <section className="py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black">
            AI Career Accelerator
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            An integrated training program provides proficient AI professionals and facilitates direct access to top-tier recruitment partners, ensuring placement prospects upon successful course completion.						
          </p>
        </motion.div>
      </section>

      {/* Our Members section - temporarily hidden
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Members</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {members.map((members, index) => (
              <motion.div
                key={members.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="aspect-square mb-4 overflow-hidden rounded-full">
                      <img
                        src={members.image}
                        alt={members.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">{members.name}</h3>
                    <p className="text-gray-600 text-center">{members.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      <section className="py-20">
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-10 text-center text-black">Our Programs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <program.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{program.title}</h3>
                        <p className="text-gray-600">{program.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your AI career?</h2>
          <Button size="lg" variant="secondary" className="mb-8">
            Get Consultant Now
          </Button>
          <p className="text-lg mb-6">
            Talent headhunters: Expand your network with us!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="mailto:info@aipartners.asia" className="flex items-center gap-2 hover:underline">
              <Mail className="h-5 w-5" />
              info@aipartners.asia
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}