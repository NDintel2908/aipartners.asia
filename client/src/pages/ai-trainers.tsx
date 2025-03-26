import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Phone, Mail, GraduationCap } from "lucide-react";
import Long from "./member/Long.png";
import Vinh from "./member/Vinh.jpeg";
import Mike from "./member/Mike.jpg";

const trainers = [
  {
    name: "Long Nguyen",
    role: "Data Engineer Lead",
    image: Long,
  },
  {
    name: "Vinh Nguyen",
    role: "AI Solution Architect",
    image: Vinh,
  },
  {
    name: "Mike Nguyen",
    role: "Fullstack Engineering Lead",
    image: Mike,
  },
];

const courses = {
  nontech: [
    {
      title: "AI Guidelines for Vietnamese CEO",
      level: "Intermediate",
      focus: "AI Awareness & Enablement",
      domain: "Cross-Funtional Areas (General AI Awareness)",
      modules: "4 modules",
      format: "Lectures",
      audience: "CEO",
      delivery: "In-person",
      trainer: "Vinh Nguyen",
      duration: "3 weeks",
    },
    {
      title: "AI Tools & Technologies / Prompt",
      level: "Beginner",
      focus: "Practical AI",
      domain: "Daily Life, Productivity",
      modules: "2 modules (AI Tools, Examples)",
      format: "Videos + Exercises",
      audience: "General Public",
      delivery: "Online, Interactive",
      trainer: "Mike Nguyen",
      duration: "2 weeks",
    },
  ],
  tech: [
    {
      title: "Introduction to NLP",
      level: "Beginner",
      focus: "AI Engineering",
      domain: "AI, NLP",
      modules: "4 modules",
      format: "Lectures + Coding",
      audience: "Tech Expert",
      delivery: "Online",
      trainer: "Long Nguyen",
      duration: "4 weeks",
    },
    {
      title: "GenAI Fundamentals",
      level: "Beginner",
      focus: "AI Awareness & Enablement",
      domain: "Cross-Funtional Areas (General AI Awareness)",
      modules: "4 modules",
      format: "Lectures",
      audience: "Software Developer",
      delivery: "Online",
      trainer: "Long Nguyen",
      duration: "3 weeks",
    },
  ],
};

export default function AITrainers() {
  return (
    <div className="min-h-screen">
      <section className="py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black">
              A training hub
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            A training hub—where our expert training team cultivates highly competent professionals who possess practicial knowledge and deep understanding, enabling them to proficiently apply and develop AI in real-world scenarios.					
          </p>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Trainers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="aspect-square mb-4 overflow-hidden rounded-full">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">{trainer.name}</h3>
                    <p className="text-gray-600 text-center">{trainer.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Available Courses</h2>
          <Tabs defaultValue="nontech" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="nontech">Non-Technical Courses</TabsTrigger>
              <TabsTrigger value="tech">Technical Courses</TabsTrigger>
            </TabsList>
            {Object.entries(courses).map(([category, courseList]) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {courseList.map((course, index) => (
                    <motion.div
                      key={course.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <GraduationCap className="h-8 w-8 text-primary mb-4" />
                          <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Level:</strong> {course.level}</p>
                            <p><strong>Focus:</strong> {course.focus}</p>
                            <p><strong>Domain:</strong> {course.domain}</p>
                            <p><strong>Modules:</strong> {course.modules}</p>
                            <p><strong>Format:</strong> {course.format}</p>
                            <p><strong>Audience:</strong> {course.audience}</p>
                            <p><strong>Delivery:</strong> {course.delivery}</p>
                            <p><strong>Duration:</strong> {course.duration}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      <section className="py-20">
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold mb-6">Develop AI skills that make a real impact!</h2>
          <Button size="lg" variant="secondary" className="mb-8">
            Get Consultant Now
          </Button>
          <p className="text-lg mb-6">
            Talent headhunters: Expand your network with us!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="mailto:huong.le@aipartners.asia" className="flex items-center gap-2 hover:underline">
              <Mail className="h-5 w-5" />
              huong.le@aipartners.asia
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}