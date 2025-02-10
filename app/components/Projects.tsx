"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Modal from "./Modal"

const projects = [
  {
    title: "Project 1",
    description: "A brief description of your first project.",
    technologies: ["React", "Node.js", "MongoDB"],
    longDescription:
      "This is a longer description of Project 1. It includes more details about the project's goals, challenges, and outcomes. You can elaborate on the technologies used, your role in the project, and any notable features or achievements.",
  },
  {
    title: "Project 2",
    description: "A brief description of your second project.",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
    longDescription:
      "Here's a detailed explanation of Project 2. Discuss the problem it solves, the approach you took in development, and the impact of the final product. You can also mention any interesting technical challenges you overcame or lessons learned during the project.",
  },
  // Add more projects as needed
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          My Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProject(project)}
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
            <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
            <p className="text-gray-600 mb-4">{selectedProject.longDescription}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.technologies.map((tech) => (
                <span key={tech} className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  )
}

