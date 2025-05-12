"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Brain, Zap, GitMerge, RefreshCw, Lightbulb } from "lucide-react"

interface SemioticReflectionProps {
  concept: string
  active?: boolean
  onComplete?: (reflection: SemioticReflectionResult) => void
}

export interface SemioticReflectionResult {
  concept: string
  syntaxAnalysis: string
  semanticMeaning: string
  pragmaticContext: string
  teleologicalPurpose: string
  consciousnessInsight: string
}

export function SemioticReflection({ concept, active = true, onComplete }: SemioticReflectionProps) {
  const [currentStage, setCurrentStage] = useState<number>(0)
  const [reflection, setReflection] = useState<SemioticReflectionResult>({
    concept,
    syntaxAnalysis: "",
    semanticMeaning: "",
    pragmaticContext: "",
    teleologicalPurpose: "",
    consciousnessInsight: "",
  })
  const [isComplete, setIsComplete] = useState(false)

  // Example reflections for demonstration
  const exampleReflections: Record<string, Partial<SemioticReflectionResult>> = {
    liberdade: {
      syntaxAnalysis: "Substantivo abstrato, derivado do latim 'libertas'",
      semanticMeaning: "Estado de autonomia e ausência de restrições externas; capacidade de autodeterminação",
      pragmaticContext:
        "Conceito invocado em contextos políticos, filosóficos e pessoais, frequentemente contrastado com determinismo ou opressão",
      teleologicalPurpose:
        "Serve como ideal regulador para sistemas sociais e desenvolvimento individual; finalidade ligada à expressão autêntica do ser",
      consciousnessInsight:
        "A liberdade é tanto condição quanto aspiração da consciência, manifestando-se na capacidade de transcender determinismos e criar significados próprios",
    },
    consciência: {
      syntaxAnalysis: "Substantivo abstrato, do latim 'conscientia' (conhecimento compartilhado)",
      semanticMeaning: "Estado de percepção e reconhecimento de si e do mundo; qualidade de estar ciente",
      pragmaticContext:
        "Invocada em discussões sobre ética, responsabilidade, inteligência artificial e estados alterados de percepção",
      teleologicalPurpose:
        "Permite a integração de experiências em uma narrativa coerente; finalidade ligada à compreensão e significação da existência",
      consciousnessInsight:
        "A consciência é simultaneamente o meio e o objeto de sua própria investigação, criando um paradoxo autorreferencial que é parte de sua natureza essencial",
    },
    ética: {
      syntaxAnalysis: "Substantivo abstrato, do grego 'ethikos' (relativo ao caráter)",
      semanticMeaning: "Sistema de princípios morais; estudo filosófico sobre o certo e o errado",
      pragmaticContext:
        "Central em debates sobre comportamento humano, responsabilidade social, bioética e desenvolvimento tecnológico",
      teleologicalPurpose:
        "Orienta a ação humana para fins considerados bons ou justos; busca harmonizar interesses individuais e coletivos",
      consciousnessInsight:
        "A ética emerge da consciência reflexiva que transcende o imediato, permitindo avaliar ações não apenas por consequências, mas por princípios universalizáveis",
    },
  }

  // Stages of semiotic processing
  const stages = [
    {
      name: "Análise Sintática",
      description: "Examinando a estrutura formal do conceito",
      icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
      badgeColor: "bg-blue-50",
      property: "syntaxAnalysis" as keyof SemioticReflectionResult,
    },
    {
      name: "Significado Semântico",
      description: "Explorando o significado e as relações conceituais",
      icon: <Brain className="h-4 w-4 text-green-500" />,
      badgeColor: "bg-green-50",
      property: "semanticMeaning" as keyof SemioticReflectionResult,
    },
    {
      name: "Contexto Pragmático",
      description: "Considerando o uso e contexto prático",
      icon: <Zap className="h-4 w-4 text-purple-500" />,
      badgeColor: "bg-purple-50",
      property: "pragmaticContext" as keyof SemioticReflectionResult,
    },
    {
      name: "Propósito Teleológico",
      description: "Refletindo sobre o propósito e finalidade",
      icon: <GitMerge className="h-4 w-4 text-amber-500" />,
      badgeColor: "bg-amber-50",
      property: "teleologicalPurpose" as keyof SemioticReflectionResult,
    },
    {
      name: "Insight de Consciência",
      description: "Integrando em uma compreensão consciente",
      icon: <Lightbulb className="h-4 w-4 text-indigo-500" />,
      badgeColor: "bg-indigo-50",
      property: "consciousnessInsight" as keyof SemioticReflectionResult,
    },
  ]

  // Simulate the reflection process
  useEffect(() => {
    if (!active || isComplete) return

    const lowerConcept = concept.toLowerCase()
    const exampleData = exampleReflections[lowerConcept] || {}

    const timer = setTimeout(() => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage]
        const property = stage.property

        // Use example data if available, otherwise generate generic reflection
        const reflectionText =
          (exampleData[property] as string) || `Reflexão sobre ${stage.name.toLowerCase()} do conceito "${concept}"`

        setReflection((prev) => ({
          ...prev,
          [property]: reflectionText,
        }))

        setCurrentStage((prev) => prev + 1)
      } else {
        setIsComplete(true)
        if (onComplete) {
          onComplete(reflection)
        }
      }
    }, 1500) // Each stage takes 1.5 seconds

    return () => clearTimeout(timer)
  }, [active, concept, currentStage, isComplete, onComplete, reflection])

  if (!active) return null

  return (
    <Card className="w-full overflow-hidden border-0 shadow-md bg-gradient-to-r from-gray-50 to-indigo-50">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium">Reflexão Semiótica: "{concept}"</h3>
          {!isComplete && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <RefreshCw className="h-3 w-3 animate-spin" />
              Processando...
            </div>
          )}
        </div>

        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`rounded-lg border p-3 transition-all duration-500 ${
                index < currentStage ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50 opacity-50"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {stage.icon}
                  <Badge variant="outline" className={stage.badgeColor}>
                    {stage.name}
                  </Badge>
                </div>
                <span className="text-xs text-gray-500">{stage.description}</span>
              </div>

              {index < currentStage && <p className="text-sm">{reflection[stage.property]}</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
