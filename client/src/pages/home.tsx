import { Button } from "../components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Trophy,
  Users,
  Star,
  Award,
  Briefcase,
  Target,
} from "lucide-react";
import Chloe from "./member/Chloe.jpg";
import Harold from "./member/Harold.jpeg";
import Hien from "./member/Hien.jpg";
import Horie from "./member/Horie.jpg";
import Huong from "./member/Huong.jpg";
import Huu from "./member/Huu.jpg";
import Long from "./member/Long.png";
import Quang from "./member/Quang.png";
import Ryuji from "./member/Ryuji.jpeg";
import Seo from "./member/Seo.jpg";
import Tan from "./member/Tan.jpeg";
import TrungBB from "./member/TrungBB.png";
import Vinh from "./member/Vinh.jpeg";
import bg from "./background.mp4";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useLanguage } from "../lib/languageContext";

const services = [
  {
    title: "AI Builders",
    description:
      "Expert development teams crafting custom AI solutions tailored to your needs",
    icon: "🛠️",
  },
  {
    title: "AI Trainers",
    description:
      "Specialized training services to optimize your AI models and systems",
    icon: "📚",
  },
  {
    title: "AI Workforce",
    description: "Professional AI teams ready to enhance your operations",
    icon: "👥",
  },
  {
    title: "AI Store",
    description: "Marketplace for ready-to-use AI agents and solutions",
    icon: "🏪",
  },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative left-1/2 w-screen py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden -translate-x-1/2">
        {/* Gradient background */}
        <div className="absolute inset-0 w-screen bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-600/20 -z-20" />

        {/* Animated pattern overlay */}
        <div
          className="absolute inset-0 w-full h-full opacity-20 -z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: "slide 20s linear infinite",
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {t("home.title")}
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {t("home.subtitle")}
            </p>
            <div className="space-x-4">
              <Link href="/contact">
                <Button size="lg">
                  {t("home.getStarted")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="p-4 rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Vision</h3>
              <p className="text-muted-foreground">
                One-Stop Winning AI Transformation
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="p-4 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Mission</h3>
              <p className="text-muted-foreground">
                Synergy & Leverage members' capabilities
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="p-4 rounded-full bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Values</h3>
              <p className="text-muted-foreground">
                Transformation, Growth, and Maximum Optimization by AI
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Slideshow */}
      <section className="w-full py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Business Units
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold">{t("home.team.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                {t("home.team.description")}
              </p>
            </div>

            {/* Tabs for team categories */}
            <div className="flex flex-col items-center space-y-8">
              <Tabs defaultValue="operation" className="w-full max-w-5xl">
                <div className="relative mb-10 flex justify-center">
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800"></div>
                  <TabsList className="relative z-10 inline-flex gap-2 p-0 bg-transparent shadow-none">
                    <TabsTrigger
                      value="operation"
                      className="group relative px-6 py-3 rounded-none bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg"
                    >
                      <span className="relative z-10 font-medium transition-colors duration-300 group-data-[state=active]:text-primary group-hover:text-primary/80">
                        Operation Team
                      </span>
                      <span className="absolute bottom-0 left-0 h-1 w-full scale-x-0 rounded-full bg-primary transition-transform duration-300 group-data-[state=active]:scale-x-100"></span>
                      <span className="absolute -bottom-[1px] left-0 h-[2px] w-full scale-x-0 bg-background transition-transform duration-300 group-data-[state=active]:scale-x-100"></span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="advisory"
                      className="group relative px-6 py-3 rounded-none bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg"
                    >
                      <span className="relative z-10 font-medium transition-colors duration-300 group-data-[state=active]:text-primary group-hover:text-primary/80">
                        Advisory Team
                      </span>
                      <span className="absolute bottom-0 left-0 h-1 w-full scale-x-0 rounded-full bg-primary transition-transform duration-300 group-data-[state=active]:scale-x-100"></span>
                      <span className="absolute -bottom-[1px] left-0 h-[2px] w-full scale-x-0 bg-background transition-transform duration-300 group-data-[state=active]:scale-x-100"></span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="consulting"
                      className="group relative px-6 py-3 rounded-none bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg"
                    >
                      <span className="relative z-10 font-medium transition-colors duration-300 group-data-[state=active]:text-primary group-hover:text-primary/80">
                        Consulting Team
                      </span>
                      <span className="absolute bottom-0 left-0 h-1 w-full scale-x-0 rounded-full bg-primary transition-transform duration-300 group-data-[state=active]:scale-x-100"></span>
                      <span className="absolute -bottom-[1px] left-0 h-[2px] w-full scale-x-0 bg-background transition-transform duration-300 group-data-[state=active]:scale-x-100"></span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Operation Team - 4 members */}
                <TabsContent value="operation" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        name: "Harold Duong",
                        role: "Program Director",
                        imgSrc: Harold,
                      },
                      {
                        name: "Tan Mai",
                        role: "Head of Business",
                        imgSrc: Tan,
                      },

                      {
                        name: "Huynh Nguyen",
                        role: "Head of Marketing",
                        imgSrc: Chloe,
                      },
                    ].map((member, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <img
                          src={member.imgSrc}
                          alt={member.name}
                          className="rounded-full w-32 h-32 object-cover shadow-md"
                        />
                        <p className="font-medium mt-3 text-center">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground text-center">
                          {member.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Advisory Team - 5 members */}
                <TabsContent value="advisory" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        name: "Ryuji Ishikawa",
                        role: "Strategy Advisor",
                        imgSrc: Ryuji,
                      },
                      {
                        name: "Fumeo Seo",
                        role: "Business Advisor",
                        imgSrc: Seo,
                      },
                      {
                        name: "Truong Chu",
                        role: "Media Advisor",
                        imgSrc:
                          "https://tse4.mm.bing.net/th?id=OIP.zeeoSeLcH19kuQ1ABNOGCwHaHU&pid=Api&P=0&h=180",
                      },
                      { name: "Huu Pham", role: "Tech Advisor", imgSrc: Huu },
                      {
                        name: "Yutaka Horie",
                        role: "Marketing Advisor",
                        imgSrc: Horie,
                      },
                    ].map((member, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <img
                          src={member.imgSrc}
                          alt={member.name}
                          className="rounded-full w-32 h-32 object-cover shadow-md"
                        />
                        <p className="font-medium mt-3 text-center">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground text-center">
                          {member.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Technologies & Business Consulting Team - 8 members */}
                <TabsContent value="consulting" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: "Hien Ha", role: "AI Technology", imgSrc: Hien },
                      {
                        name: "Quang Nguyen",
                        role: "AI Technology",
                        imgSrc: Quang,
                      },
                      {
                        name: "Tuan Nguyen",
                        role: "AI Solutions",
                        imgSrc:
                          "https://tse4.mm.bing.net/th?id=OIP.zeeoSeLcH19kuQ1ABNOGCwHaHU&pid=Api&P=0&h=180",
                      },
                      {
                        name: "Long Nguyen",
                        role: "Data Solutions",
                        imgSrc: Long,
                      },

                      {
                        name: "Trung BB",
                        role: "AI Technology",
                        imgSrc: TrungBB,
                      },
                    ].map((member, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <img
                          src={member.imgSrc}
                          alt={member.name}
                          className="rounded-full w-32 h-32 object-cover shadow-md"
                        />
                        <p className="font-medium mt-3 text-center">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground text-center">
                          {member.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="w-full py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are proud of our track record of excellence in AI innovation
              and implementation across various industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "20+ AI Projects",
                description:
                  "Successfully delivered AI-driven solutions across industries.",
              },
              {
                icon: Users,
                title: "10+ Global Clients",
                description:
                  "Trusted by businesses worldwide for AI transformation.",
              },
              {
                icon: Trophy,
                title: "3 Industry Awards",
                description: "Recognized for excellence in AI innovation.",
              },
              {
                icon: Briefcase,
                title: "5+ Years Experience",
                description:
                  "Proven expertise in artificial intelligence solutions.",
              },
            ].map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <achievement.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground flex-grow">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 relative text-white mb-20 rounded-lg overflow-hidden">
        {/* GIF Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>{" "}
          {/* Overlay để làm tối GIF */}
          <img
            src="https://framerusercontent.com/images/TFbSKqMJShVMjIRlXpZ6KLSn8.gif"
            alt="AI Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold">
              Ready to Transform Your Business?
            </h2>
            <p className="max-w-[600px] text-white/90">
              Start your AI transformation journey today with our expert team.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="mt-4 bg-white text-black"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
