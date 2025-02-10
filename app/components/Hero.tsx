"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import type React from "react"

const pulseAnimation = {
  scale: [1, 1.02, 1],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

interface ProgressBarProps {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2.5 mb-4">
    <motion.div
      className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  </div>
)

export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="bg-blue-600 dark:bg-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          {t.hero.greeting}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-6"
        >
          {t.hero.subtitle}
        </motion.p>
        <div className="flex justify-center space-x-8 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div animate={pulseAnimation} className="bg-blue-500 dark:bg-blue-700 rounded-lg p-4 shadow-lg w-64">
              <h2 className="text-lg font-semibold mb-2">{t.hero.currentlyLearning}</h2>
              <p className="text-blue-100 mb-2">{t.hero.learningTopic}</p>
              <ProgressBar progress={60} />
              <p className="text-sm text-blue-100">60% {t.hero.completed}</p>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div animate={pulseAnimation} className="bg-blue-500 dark:bg-blue-700 rounded-lg p-4 shadow-lg w-64">
              <h2 className="text-lg font-semibold mb-2">{t.hero.currentProject}</h2>
              <p className="text-blue-100 mb-2">{t.hero.projectDescription}</p>
              <ProgressBar progress={40} />
              <p className="text-sm text-blue-100">40% {t.hero.completed}</p>
            </motion.div>
          </motion.div>
        </div>
        <div className="flex justify-center space-x-4">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-400 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 dark:hover:bg-gray-700 transition duration-300"
          >
            {t.hero.cta}
          </motion.a>
          <motion.a
            href="/path-to-your-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-blue-500 dark:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-400 dark:hover:bg-blue-600 transition duration-300 border-2 border-white"
          >
            {t.hero.viewCV}
          </motion.a>
        </div>
      </div>
    </section>
  )
}

