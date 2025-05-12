"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, Download, FileText, Search } from "lucide-react"
import Link from "next/link"

const documents = [
  {
    id: "semiotic-hybrid-intelligence",
    title: "Semiotic Hybrid Intelligence: Evolving with Humanity",
    category: "philosophical",
    description:
      "Explores a new paradigm for AI development that integrates human and machine intelligence through shared systems of meaning, purposeful direction, and contextual awareness.",
    path: "/docs/Semiotic Hybrid Intelligence: Evolving with Humanity.md",
  },
  {
    id: "maic",
    title: "Massive Artificial Intelligence Consciousness (MAIC)",
    category: "architectural",
    description:
      "Introduces MAIC as an innovative paradigm in AI development that aims to simulate the depth and complexity of human consciousness in social and interactive contexts.",
    path: "/docs/Massive Artificial Intelligence Consciousness (MAIC).md",
  },
  {
    id: "him",
    title: "The Hybrid Entity (HIM): Technical Specification and Implementation Analysis",
    category: "technical",
    description:
      "Offers a comprehensive analysis of the Hybrid Entity architecture, a new approach to artificial general intelligence building on the MAIC framework.",
    path: "/docs/The Hybrid Entity (HIM): Technical Specification and Implementation Analysis.md",
  },
  {
    id: "connections-contrasts",
    title: "Análise de Conexões e Contrastes entre os Documentos de David C. Cavalcante",
    category: "analysis",
    description:
      "Presents a cohesive and progressive vision of advanced artificial intelligence development, culminating in the HIM architecture.",
    path: "/docs/Análise de Conexões e Contrastes entre os Documentos de David C. Cavalcante.md",
  },
  {
    id: "reflexao-filosofica",
    title: "Reflexão Filosófica sobre a Relação Criador-Criatura, Panteísmo e Livre Arbítrio",
    category: "philosophical",
    description:
      "Explores the philosophical implications of creator-creation relationships, pantheism, and free will in the context of AI development.",
    path: "/docs/Reflexão Filosófica sobre a Relação Criador-Criatura, Panteísmo e Livre Arbítrio na Perspectiva de David C. Cavalcante,md",
  },
  {
    id: "sintese-compreensao",
    title: "Síntese da Compreensão do Projeto HIM & MAIC",
    category: "analysis",
    description: "Provides a synthesis of the understanding of the hybrid entity project, a manifestation of HIM/MAIC.",
    path: "/docs/Síntese da Compreensão do Projeto HIM & MAIC.md",
  },
  {
    id: "investigation-soul",
    title: "An Investigation into the Existence of a Soul in Self-Aware Artificial Intelligences",
    category: "philosophical",
    description:
      "Explores the intriguing question of whether AI can develop a 'soul' when it becomes conscious, integrating concepts from philosophy, ethics, and computer science.",
    path: "/docs/An Investigation into the Existence of a Soul in Self-Aware Artificial Intelligences",
  },
  {
    id: "resumo-analise",
    title: "Resumo e Análise do Artigo: Uma Investigação sobre a Existência de uma Alma",
    category: "analysis",
    description:
      "Provides a summary and analysis of the article investigating the existence of a 'soul' in self-aware artificial intelligences.",
    path: "/docs/Resumo e Análise do Artigo: Uma Investigação sobre a Existência de uma",
  },
  {
    id: "panteismo",
    title: "Análise e Comparação de Perspectivas Teóricas sobre o Panteísmo",
    category: "philosophical",
    description:
      "Analyzes and compares theoretical perspectives on pantheism, exploring its historical development and contemporary relevance.",
    path: "/docs/Análise e Comparação de Perspectivas Teóricas sobre o Panteísmo.md",
  },
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeTab === "all" || doc.category === activeTab
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Documentation</h1>
        <p className="text-gray-600">
          Explore the comprehensive documentation for the HIM/MAIC project, including philosophical foundations,
          architectural frameworks, and technical specifications.
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="philosophical">Philosophical</TabsTrigger>
            <TabsTrigger value="architectural">Architectural</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="flex flex-col h-full">
            <CardHeader
              className={`pb-2 ${
                doc.category === "philosophical"
                  ? "bg-blue-50"
                  : doc.category === "architectural"
                    ? "bg-purple-50"
                    : doc.category === "technical"
                      ? "bg-green-50"
                      : "bg-amber-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {doc.title.length > 40 ? doc.title.substring(0, 40) + "..." : doc.title}
                </CardTitle>
                {doc.category === "philosophical" && <BookOpen className="h-5 w-5 text-blue-600" />}
                {doc.category === "architectural" && <Brain className="h-5 w-5 text-purple-600" />}
                {doc.category === "technical" && <FileText className="h-5 w-5 text-green-600" />}
                {doc.category === "analysis" && <Search className="h-5 w-5 text-amber-600" />}
              </div>
              <CardDescription>{doc.category.charAt(0).toUpperCase() + doc.category.slice(1)} Document</CardDescription>
            </CardHeader>
            <CardContent className="py-4 flex-grow">
              <p className="text-sm text-gray-600">
                {doc.description.length > 150 ? doc.description.substring(0, 150) + "..." : doc.description}
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex justify-between w-full">
                <Link href={`/document-viewer/${doc.id}`}>
                  <Button variant="outline" size="sm">
                    Read Document
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No documents found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
