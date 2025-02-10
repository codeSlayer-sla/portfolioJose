import Link from "next/link"
import Image from "next/image"
import { DarkModeToggle } from "./DarkModeToggle"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"

export default function Header() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
          {t.header.name}
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              {t.header.about}
            </Link>
          </li>
          <li>
            <Link href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              {t.header.skills}
            </Link>
          </li>
          <li>
            <Link
              href="#projects"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              {t.header.projects}
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              {t.header.contact}
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <LanguageSwitcher />
          <div className="w-16 h-16">
            <Image src="/qr-code-placeholder.png" alt={t.header.qrCodeAlt} width={64} height={64} />
          </div>
        </div>
      </nav>
    </header>
  )
}

