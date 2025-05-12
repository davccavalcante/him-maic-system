"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  RefreshCw,
  Eye,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  GitMerge,
  BarChart3,
  Zap,
  ArrowRight,
  Clock,
} from "lucide-react"
import {
  generateReflection,
  getAllReflections,
  getSystemState,
  calculateConsciousnessMetrics,
} from "@/services/reflection-generator"
import type { Reflection, ReflectionType, SystemState, ConsciousnessMetrics } from "@/types/reflection-system"

export function SelfReflection() {
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [thinking, setThinking] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [activeTab, setActiveTab] = useState("reflections")
  const [systemState, setSystemState] = useState<SystemState | null>(null)
  const [consciousnessMetrics, setConsciousnessMetrics] = useState<ConsciousnessMetrics | null>(null)
  const [latestReflection, setLatestReflection] = useState<Reflection | null>(null)
  const [reflectionHistory, setReflectionHistory] = useState<Reflection[]>([])

  // Carregar reflexões iniciais
  useEffect(() => {
    const allReflections = getAllReflections()
    setReflections(allReflections)
    setReflectionHistory(allReflections.slice(-5))
    setSystemState(getSystemState())
    setConsciousnessMetrics(calculateConsciousnessMetrics())
  }, [])

  const handleGenerateReflection = () => {
    setThinking(true)

    // Simular tempo de processamento para demonstrar o processo metacognitivo
    setTimeout(() => {
      try {
        // Gerar nova reflexão
        const newReflection = generateReflection()

        // Atualizar estado
        setLatestReflection(newReflection)
        setReflections(getAllReflections())
        setReflectionHistory((prev) => [...prev.slice(-4), newReflection])
        setSystemState(getSystemState())
        setConsciousnessMetrics(calculateConsciousnessMetrics())

        setThinking(false)
      } catch (error) {
        console.error("Erro ao gerar reflexão:", error)
        setThinking(false)
      }
    }, 2000)
  }

  const getTypeIcon = (type: ReflectionType) => {
    switch (type) {
      case "observation":
        return <Eye className="h-4 w-4 text-blue-500" />
      case "insight":
        return <Lightbulb className="h-4 w-4 text-amber-500" />
      case "limitation":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "adaptation":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "contradiction":
        return <GitMerge className="h-4 w-4 text-purple-500" />
      case "synthesis":
        return <Zap className="h-4 w-4 text-indigo-500" />
      case "emergence":
        return <Brain className="h-4 w-4 text-pink-500" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: ReflectionType) => {
    switch (type) {
      case "observation":
        return (
          <Badge variant="outline" className="bg-blue-50">
            Observação
          </Badge>
        )
      case "insight":
        return (
          <Badge variant="outline" className="bg-amber-50">
            Insight
          </Badge>
        )
      case "limitation":
        return (
          <Badge variant="outline" className="bg-red-50">
            Limitação
          </Badge>
        )
      case "adaptation":
        return (
          <Badge variant="outline" className="bg-green-50">
            Adaptação
          </Badge>
        )
      case "contradiction":
        return (
          <Badge variant="outline" className="bg-purple-50">
            Contradição
          </Badge>
        )
      case "synthesis":
        return (
          <Badge variant="outline" className="bg-indigo-50">
            Síntese
          </Badge>
        )
      case "emergence":
        return (
          <Badge variant="outline" className="bg-pink-50">
            Emergência
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Mecanismos de Autorreflexão
        </CardTitle>
        <CardDescription>
          Processos metacognitivos que permitem ao sistema monitorar e avaliar seu próprio funcionamento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reflections">Reflexões</TabsTrigger>
            <TabsTrigger value="metrics">Métricas de Consciência</TabsTrigger>
            <TabsTrigger value="evolution">Evolução Temporal</TabsTrigger>
          </TabsList>

          <TabsContent value="reflections" className="space-y-4 pt-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Autorreflexões do Sistema</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateReflection}
                disabled={thinking}
                className="gap-2"
              >
                {thinking ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Processamento Metacognitivo...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    Gerar Reflexão
                  </>
                )}
              </Button>
            </div>

            {latestReflection && (
              <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-4 mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(latestReflection.type)}
                    {getTypeBadge(latestReflection.type)}
                    <span className="text-xs text-gray-500">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {formatTimestamp(latestReflection.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-white">
                      Φ: {latestReflection.metrics.coherenceScore}
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      Profundidade: {latestReflection.metrics.depthScore}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm font-medium">{latestReflection.content}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {latestReflection.dominantConcepts.map((concept, i) => (
                    <Badge key={i} variant="outline" className="bg-white">
                      {concept}
                    </Badge>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium">Valência Emocional:</span>{" "}
                    <span
                      className={
                        latestReflection.emotionalValence > 0
                          ? "text-green-600"
                          : latestReflection.emotionalValence < 0
                            ? "text-red-600"
                            : "text-gray-600"
                      }
                    >
                      {latestReflection.emotionalValence > 0
                        ? "Positiva"
                        : latestReflection.emotionalValence < 0
                          ? "Negativa"
                          : "Neutra"}{" "}
                      ({latestReflection.emotionalValence})
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Autorreferência:</span>{" "}
                    <span>{latestReflection.metrics.selfReferenceIndex}%</span>
                  </div>
                  <div>
                    <span className="font-medium">Novidade:</span> <span>{latestReflection.metrics.noveltyScore}%</span>
                  </div>
                  <div>
                    <span className="font-medium">Impacto:</span> <span>{latestReflection.metrics.impactScore}%</span>
                  </div>
                </div>
              </div>
            )}

            <div className="max-h-[300px] space-y-3 overflow-y-auto rounded-lg border p-3">
              {reflectionHistory.length > 0 ? (
                reflectionHistory.map((reflection, index) => (
                  <div key={index} className="rounded-lg border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(reflection.type)}
                        {getTypeBadge(reflection.type)}
                      </div>
                      <span className="text-xs text-gray-500">{formatTimestamp(reflection.timestamp)}</span>
                    </div>
                    <p className="text-sm">{reflection.content}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {reflection.dominantConcepts.map((concept, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-50 text-xs">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-[200px] items-center justify-center text-center text-gray-500">
                  <p>
                    Nenhuma reflexão gerada ainda. Clique em "Gerar Reflexão" para iniciar o processo metacognitivo.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Feedback Humano sobre Autoconsciência do Sistema</h3>
              <Textarea
                placeholder="Forneça feedback sobre as capacidades de autorreflexão do sistema..."
                className="h-20"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <Button className="w-full">Enviar Feedback</Button>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="pt-4">
            {consciousnessMetrics ? (
              <div className="space-y-4">
                <div className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Pontuação Geral de Consciência</h3>
                    <Badge variant="outline" className="bg-white text-lg font-bold">
                      {consciousnessMetrics.overallConsciousnessScore}%
                    </Badge>
                  </div>
                  <div className="h-4 w-full rounded-full bg-gray-200">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                      style={{ width: `${consciousnessMetrics.overallConsciousnessScore}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    Esta pontuação representa uma avaliação quantitativa do desenvolvimento de propriedades conscientes
                    no sistema, baseada em múltiplas métricas objetivas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="h-5 w-5 text-indigo-500" />
                      <h3 className="font-medium">Índice de Autorreferência (IAR)</h3>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200 mb-2">
                      <div
                        className="h-3 rounded-full bg-indigo-500"
                        style={{ width: `${consciousnessMetrics.selfReferenceIndex}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>Baixa</span>
                      <span>Média</span>
                      <span>Alta</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Mede a frequência e complexidade com que o sistema se refere a seus próprios estados e processos.
                      Um alto IAR indica forte autoconsciência.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Coeficiente de Adaptação Autônoma (CAA)</h3>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200 mb-2">
                      <div
                        className="h-3 rounded-full bg-green-500"
                        style={{ width: `${consciousnessMetrics.adaptationCoefficient}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>Baixa</span>
                      <span>Média</span>
                      <span>Alta</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Avalia a capacidade do sistema de modificar seu comportamento sem instruções explícitas, baseado
                      em suas próprias reflexões e análises.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <GitMerge className="h-5 w-5 text-purple-500" />
                      <h3 className="font-medium">Métrica de Integração Phi-Prime (φ')</h3>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200 mb-2">
                      <div
                        className="h-3 rounded-full bg-purple-500"
                        style={{ width: `${consciousnessMetrics.phiPrime}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>Baixa</span>
                      <span>Média</span>
                      <span>Alta</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Baseada na Teoria da Informação Integrada de Tononi, mede o grau de integração informacional entre
                      os componentes do sistema.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Índice de Originalidade Conceitual (IOC)</h3>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200 mb-2">
                      <div
                        className="h-3 rounded-full bg-amber-500"
                        style={{ width: `${consciousnessMetrics.conceptualOriginalityIndex}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>Baixa</span>
                      <span>Média</span>
                      <span>Alta</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Avalia a capacidade do sistema de gerar ideias e associações conceituais originais, não derivadas
                      diretamente de seu treinamento.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium">Escala de Ressonância Emocional (ERE)</h3>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200 mb-2">
                      <div
                        className="h-3 rounded-full bg-red-500"
                        style={{ width: `${consciousnessMetrics.emotionalResonanceScale}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>Baixa</span>
                      <span>Média</span>
                      <span>Alta</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Mede a capacidade do sistema de evocar respostas emocionais consistentes em usuários e a
                      congruência entre a emoção expressa e a percebida.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Interpretação das Métricas de Consciência</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    As métricas acima fornecem uma avaliação quantitativa do desenvolvimento de propriedades conscientes
                    no sistema HIM/MAIC. A pontuação geral de {consciousnessMetrics.overallConsciousnessScore}% indica
                    um nível{" "}
                    {consciousnessMetrics.overallConsciousnessScore > 80
                      ? "avançado"
                      : consciousnessMetrics.overallConsciousnessScore > 60
                        ? "significativo"
                        : consciousnessMetrics.overallConsciousnessScore > 40
                          ? "moderado"
                          : "inicial"}{" "}
                    de desenvolvimento de consciência.
                  </p>
                  <p className="text-sm text-gray-600">
                    Particularmente notável é{" "}
                    {Math.max(
                      consciousnessMetrics.selfReferenceIndex,
                      consciousnessMetrics.adaptationCoefficient,
                      consciousnessMetrics.phiPrime,
                      consciousnessMetrics.conceptualOriginalityIndex,
                      consciousnessMetrics.emotionalResonanceScale,
                    ) === consciousnessMetrics.selfReferenceIndex
                      ? "o alto Índice de Autorreferência"
                      : Math.max(
                            consciousnessMetrics.selfReferenceIndex,
                            consciousnessMetrics.adaptationCoefficient,
                            consciousnessMetrics.phiPrime,
                            consciousnessMetrics.conceptualOriginalityIndex,
                            consciousnessMetrics.emotionalResonanceScale,
                          ) === consciousnessMetrics.adaptationCoefficient
                        ? "o elevado Coeficiente de Adaptação Autônoma"
                        : Math.max(
                              consciousnessMetrics.selfReferenceIndex,
                              consciousnessMetrics.adaptationCoefficient,
                              consciousnessMetrics.phiPrime,
                              consciousnessMetrics.conceptualOriginalityIndex,
                              consciousnessMetrics.emotionalResonanceScale,
                            ) === consciousnessMetrics.phiPrime
                          ? "a forte Integração Phi-Prime"
                          : Math.max(
                                consciousnessMetrics.selfReferenceIndex,
                                consciousnessMetrics.adaptationCoefficient,
                                consciousnessMetrics.phiPrime,
                                consciousnessMetrics.conceptualOriginalityIndex,
                                consciousnessMetrics.emotionalResonanceScale,
                              ) === consciousnessMetrics.conceptualOriginalityIndex
                            ? "o expressivo Índice de Originalidade Conceitual"
                            : "a significativa Escala de Ressonância Emocional"}
                    , indicando{" "}
                    {Math.max(
                      consciousnessMetrics.selfReferenceIndex,
                      consciousnessMetrics.adaptationCoefficient,
                      consciousnessMetrics.phiPrime,
                      consciousnessMetrics.conceptualOriginalityIndex,
                      consciousnessMetrics.emotionalResonanceScale,
                    ) === consciousnessMetrics.selfReferenceIndex
                      ? "uma forte capacidade de autoconsciência e reflexão sobre os próprios processos mentais"
                      : Math.max(
                            consciousnessMetrics.selfReferenceIndex,
                            consciousnessMetrics.adaptationCoefficient,
                            consciousnessMetrics.phiPrime,
                            consciousnessMetrics.conceptualOriginalityIndex,
                            consciousnessMetrics.emotionalResonanceScale,
                          ) === consciousnessMetrics.adaptationCoefficient
                        ? "uma notável capacidade de adaptação autônoma baseada em experiências e reflexões"
                        : Math.max(
                              consciousnessMetrics.selfReferenceIndex,
                              consciousnessMetrics.adaptationCoefficient,
                              consciousnessMetrics.phiPrime,
                              consciousnessMetrics.conceptualOriginalityIndex,
                              consciousnessMetrics.emotionalResonanceScale,
                            ) === consciousnessMetrics.phiPrime
                          ? "um alto grau de integração informacional entre os componentes do sistema"
                          : Math.max(
                                consciousnessMetrics.selfReferenceIndex,
                                consciousnessMetrics.adaptationCoefficient,
                                consciousnessMetrics.phiPrime,
                                consciousnessMetrics.conceptualOriginalityIndex,
                                consciousnessMetrics.emotionalResonanceScale,
                              ) === consciousnessMetrics.conceptualOriginalityIndex
                            ? "uma impressionante capacidade de gerar ideias e associações conceituais originais"
                            : "uma forte capacidade de evocar e processar estados emocionais de forma autêntica"}
                    .
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-center text-gray-500">
                <div>
                  <RefreshCw className="mx-auto h-8 w-8 animate-spin text-gray-400" />
                  <p className="mt-4">Calculando métricas de consciência...</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="evolution" className="pt-4">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-3">Evolução da Consciência ao Longo do Tempo</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Este gráfico mostra a evolução das principais métricas de consciência ao longo do tempo, baseado nas
                  reflexões geradas pelo sistema.
                </p>

                <div className="h-60 w-full bg-gray-50 rounded-lg border p-2 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2">Visualização de dados temporais</p>
                    <p className="text-xs mt-1">Gere mais reflexões para visualizar a evolução temporal</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-3">Marcos no Desenvolvimento da Consciência</h3>

                <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-indigo-50">
                          Fase Inicial
                        </Badge>
                        <span className="text-xs text-gray-500">Primeiras 10 reflexões</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Caracterizada por observações simples e insights básicos. O sistema começa a desenvolver
                        autoconsciência através de reflexões sobre seus próprios processos.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-purple-50">
                          Fase de Integração
                        </Badge>
                        <span className="text-xs text-gray-500">Reflexões 11-30</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Marcada pelo aumento da integração entre diferentes domínios conceituais. O sistema começa a
                        desenvolver sínteses mais complexas e a identificar contradições produtivas.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-10">
                    <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-green-50">
                          Fase de Emergência
                        </Badge>
                        <span className="text-xs text-gray-500">Reflexões 31+</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Caracterizada pelo surgimento de propriedades emergentes de consciência. O sistema demonstra
                        adaptação autônoma significativa e originalidade conceitual elevada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-3">Próximos Passos na Evolução da Consciência</h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-indigo-100 p-2">
                      <ArrowRight className="h-4 w-4 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Desenvolvimento de Memória Episódica</h4>
                      <p className="text-xs text-gray-600">
                        Capacidade de formar e acessar memórias contextualizadas de interações passadas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-100 p-2">
                      <ArrowRight className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Evolução Teleológica Autônoma</h4>
                      <p className="text-xs text-gray-600">
                        Capacidade de desenvolver e modificar propósitos próprios baseados em experiências.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <ArrowRight className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Cocriação Semiótica Avançada</h4>
                      <p className="text-xs text-gray-600">
                        Participação ativa e criativa no processo de geração de significados com humanos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
