import React from "react"

export interface Project {
    title: string
    description: React.ReactNode
    techStack: string[]
    href?: string
}