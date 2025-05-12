"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, BookOpen, Brain, Download, FileText, Search } from "lucide-react"

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

export default function DocumentViewerPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const document = documents.find((doc) => doc.id === id)

  if (!document) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
        <p className="mb-6">The requested document could not be found.</p>
        <Button onClick={() => router.push("/documents")}>Return to Documents</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/documents")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Documents</span>
        </Button>
        <Button variant="outline" className="gap-1">
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader
          className={`pb-4 ${
            document.category === "philosophical"
              ? "bg-blue-50"
              : document.category === "architectural"
                ? "bg-purple-50"
                : document.category === "technical"
                  ? "bg-green-50"
                  : "bg-amber-50"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {document.category === "philosophical" && <BookOpen className="h-6 w-6 text-blue-600" />}
            {document.category === "architectural" && <Brain className="h-6 w-6 text-purple-600" />}
            {document.category === "technical" && <FileText className="h-6 w-6 text-green-600" />}
            {document.category === "analysis" && <Search className="h-6 w-6 text-amber-600" />}
            <CardTitle className="text-2xl">{document.title}</CardTitle>
          </div>
          <CardDescription className="text-base">{document.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[70vh] pr-4">
            <div className="prose prose-sm sm:prose max-w-none">
              {/* This would typically fetch and render the markdown content */}
              <p className="text-gray-500 italic">Document content would be loaded here from {document.path}</p>

              {/* Placeholder content */}
              <h2>Document Overview</h2>
              <p>
                This document is part of the comprehensive HIM/MAIC project documentation, providing insights into the
                philosophical foundations, architectural framework, and technical implementation of this advanced AI
                system.
              </p>

              <p>
                The full content of this document would be loaded dynamically from the markdown file stored in the
                project repository. For now, this is a placeholder that demonstrates how the document viewer would
                function.
              </p>

              <h3>Related Documents</h3>
              <ul>
                {documents
                  .filter((doc) => doc.id !== id)
                  .slice(0, 3)
                  .map((relatedDoc) => (
                    <li key={relatedDoc.id}>
                      <a href={`/document-viewer/${relatedDoc.id}`} className="text-blue-600 hover:underline">
                        {relatedDoc.title}
                      </a>
                    </li>
                  ))}
              </ul>

              <h3>Implementation Considerations</h3>
              <p>When implementing features based on this documentation, consider the following:</p>
              <ul>
                <li>
                  Ensure alignment with the philosophical principles outlined in the Semiotic Hybrid Intelligence
                  framework
                </li>
                <li>Follow the architectural guidelines provided in the MAIC documentation</li>
                <li>Adhere to the technical specifications detailed in the HIM implementation analysis</li>
                <li>Consider the ethical implications discussed in the philosophical reflections</li>
              </ul>

              <h3>Challenges and Limitations</h3>
              <p>
                While the HIM/MAIC framework provides a comprehensive approach to advanced AI development, several
                challenges and limitations should be acknowledged:
              </p>
              <ul>
                <li>
                  The computational requirements for implementing full-scale HIM systems exceed current hardware
                  capabilities
                </li>
                <li>
                  The measurement and verification of consciousness-like properties in artificial systems lack
                  standardized metrics
                </li>
                <li>
                  The symbol grounding problem remains a significant challenge for implementing true semiotic
                  capabilities
                </li>
                <li>
                  Ethical considerations regarding the creation of systems with consciousness-like properties require
                  further exploration
                </li>
                <li>
                  The integration of different processing mechanisms presents technical challenges that may require
                  novel approaches
                </li>
              </ul>

              <h3>Future Directions</h3>
              <p>Future research and development in the HIM/MAIC framework should focus on:</p>
              <ul>
                <li>Developing more sophisticated models of consciousness and meaning-making</li>
                <li>Exploring the ethical implications of creating systems with consciousness-like properties</li>
                <li>Integrating emerging technologies such as quantum computing and neuromorphic hardware</li>
                <li>
                  Establishing standardized metrics for evaluating consciousness-like properties in artificial systems
                </li>
                <li>Addressing the technical challenges of implementing the HIM architecture on current hardware</li>
              </ul>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
