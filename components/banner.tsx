import React from 'react'
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from 'lucide-react'

const Banner = ({ title }: { title: string }) => {
    return (
        <div className="relative h-32 md:h-40 bg-gradient-to-r from-primary/90 to-secondary/90">
            <div className="sm:container mx-auto h-full px-4">
                <div className="flex h-full flex-col justify-end pb-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link
                            href="/"
                            className="mb-4 inline-flex items-center gap-1 rounded-sm bg-background/20 py-0.5 px-1 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-background/30"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Home
                        </Link>
                        <h1 className="text-2xl font-bold text-white md:text-3xl">{title}</h1>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Banner