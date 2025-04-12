import { motion } from "framer-motion";
import { Brain, Heart, Menu, Sparkles } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { NodeBackground } from "../components/NodeBackground";
import { StoreButtons } from "../components/store-buttons";
import { Button } from "../components/ui/button";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative">
      <Head>
        <title>Clarity - Your Journey to Self-Understanding</title>
        <meta
          name="description"
          content="Embark on a research-backed journey of self-discovery with Clarity. Understand yourself better through thoughtfully designed assessments and personalized guidance."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Node Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NodeBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white"
                >
                  Clarity
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="#features"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#download"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Download
                </Link>
                <Button
                  disabled
                  data-tooltip-id="clarity-tooltip"
                  data-tooltip-content="Coming soon!"
                >
                  Start Your Journey
                </Button>
              </div>
              <button
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: mobileMenuOpen ? "auto" : 0,
                opacity: mobileMenuOpen ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
            >
              <div className="px-4 py-4 space-y-4">
                <Link
                  href="#features"
                  className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#download"
                  className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Download
                </Link>
                <Button
                  disabled
                  data-tooltip-id="clarity-tooltip"
                  data-tooltip-content="Coming soon!"
                  fullWidth
                >
                  Start Your Journey
                </Button>
              </div>
            </motion.div>
          </div>
        </nav>

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative pt-28 md:pt-42 pb-32 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tight">
                  <span className="inline md:inline-block">
                    Discover your path to
                  </span>{" "}
                  <span className="inline md:inline-block text-slate-600 dark:text-slate-400">
                    deeper understanding
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto">
                  Navigate your personal growth through research-backed
                  assessments. Gain insights and receive guidance tailored to
                  your unique journey.
                </p>
                <StoreButtons disabled />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                >
                  <Brain className="h-10 w-10 md:h-12 md:w-12 text-slate-600 dark:text-slate-400 mb-4 md:mb-6" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-slate-900 dark:text-white">
                    Research-Backed Insights
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                    Answer thoughtfully designed questions based on established
                    psychological research, helping you understand different
                    aspects of your life.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                >
                  <Heart className="h-10 w-10 md:h-12 md:w-12 text-slate-600 dark:text-slate-400 mb-4 md:mb-6" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-slate-900 dark:text-white">
                    Personalized Resources
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                    Receive curated guidance and resources that evolve with your
                    journey, tailored to your unique experiences and responses.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                >
                  <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-slate-600 dark:text-slate-400 mb-4 md:mb-6" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-slate-900 dark:text-white">
                    Connected Understanding
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                    Watch as your responses create a unique map of
                    interconnected insights, revealing patterns and connections
                    in your personal journey.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-slate-900 dark:text-white">
                Begin Your Journey of Discovery
              </h2>
              <p className="text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
                Take the first step towards deeper self-understanding. Start
                exploring the connections that shape who you are.
              </p>
              <StoreButtons disabled />
            </div>
          </section>
        </main>

        <footer className="relative bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-12 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} Clarity. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <Tooltip
        id="clarity-tooltip"
        className="z-50 !bg-slate-900 dark:!bg-white !text-white dark:!text-slate-900 !px-2 !py-1 !text-sm !font-medium !rounded"
      />
    </div>
  );
}
