import { motion } from "framer-motion";
import { ArrowRight, Brain, Heart, Menu, Sparkles } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { NodeBackground } from "../components/NodeBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Head>
        <title>Clarity - Your Personal Journey to Self-Discovery</title>
        <meta
          name="description"
          content="Embark on a transformative journey of self-discovery with Clarity. Our AI-powered platform helps you understand yourself better through interactive assessments and guided reflection."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Node Background */}
      <div className="fixed inset-0 z-0">
        <NodeBackground />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-semibold text-slate-900 dark:text-white"
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
              <a
                href="https://apps.apple.com/app/clarity"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                Get Started
              </a>
            </div>
            <button className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                The happier
                <br />
                <span className="text-slate-600 dark:text-slate-400">
                  self-discovery
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                Write. Reflect. Grow. With a little help from AI. Your personal
                guide to understanding yourself better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://apps.apple.com/app/clarity"
                  className="inline-flex items-center px-8 py-4 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  Download for iOS
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=clarity"
                  className="inline-flex items-center px-8 py-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Get it on Android
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
              >
                <Heart className="h-12 w-12 text-slate-600 dark:text-slate-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
                  Guided Reflection
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Explore deeper insights through AI-powered journaling and
                  thoughtfully designed assessments that help you understand
                  yourself better.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
              >
                <Brain className="h-12 w-12 text-slate-600 dark:text-slate-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
                  Personalized Mind Map
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Navigate your thoughts and emotions through an interactive
                  mind map that evolves with your journey of self-discovery.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
              >
                <Sparkles className="h-12 w-12 text-slate-600 dark:text-slate-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
                  Personal Growth
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Track your progress and unlock new insights as you grow, with
                  personalized resources and guidance along the way.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
              Begin Your Journey Today
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
              Take the first step towards understanding yourself better.
              Download Clarity now and start your path to self-discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://apps.apple.com/app/clarity"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                Download for iOS
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=clarity"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Get it on Android
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Clarity. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
