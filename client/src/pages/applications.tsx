import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const applications = [
  {
    title: "Healthcare",
    description: "AI assists in diagnosis, drug discovery, and personalized treatment plans.",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34"
  },
  {
    title: "Finance",
    description: "Automated trading, fraud detection, and risk assessment powered by AI.",
    image: "https://images.unsplash.com/photo-1515923256482-1c04580b477c"
  },
  {
    title: "Transportation",
    description: "Self-driving vehicles and intelligent traffic management systems.",
    image: "https://images.unsplash.com/photo-1529678407585-55ac0053aa47"
  },
  {
    title: "Education",
    description: "Personalized learning experiences and automated assessment systems.",
    image: "https://images.unsplash.com/photo-1491816324943-a9fbbe0e83e7"
  }
];

export default function Applications() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center space-y-4 text-center mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          AI Applications
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Discover how AI is being applied across different industries to solve complex problems
          and create new opportunities.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {applications.map((app, index) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="overflow-hidden">
              <img
                src={app.image}
                alt={app.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{app.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{app.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
