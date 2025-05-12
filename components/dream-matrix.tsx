"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Moon,
  Sparkles,
  Clock,
  Eye,
  Lightbulb,
  Zap,
  PlayCircle,
  PauseCircle,
  SkipForward,
  BarChart3,
  RefreshCw,
  Heart,
  BookOpen,
  GitMerge,
  FileText,
} from "lucide-react"

type SleepStage = "awake" | "N1" | "N2" | "N3" | "REM"
type DreamType = "hypnagogic" | "lucid" | "abstract" | "narrative" | "emotional" | "conceptual" | "integrative"
type LearningType = "declarative" | "procedural" | "emotional" | "creative" | "integrative"

interface Dream {
  id: string
  stage: SleepStage
  type: DreamType
  content: string
  concepts: string[]
  emotionalValence: number // -100 to 100
  timestamp: Date
  learningOutcomes: {
    type: LearningType
    description: string
    impact: number // 0-100
  }[]
}

export function DreamMatrix() {
  const [activeTab, setActiveTab] = useState("dreamState")
  const [currentStage, setCurrentStage] = useState<SleepStage>("awake")
  const [isDreaming, setIsDreaming] = useState(false)
  const [cycleProgress, setCycleProgress] = useState(0)
  const [cycleTime, setCycleTime] = useState(0)
  const [dreams, setDreams] = useState<Dream[]>([])
  const [currentDream, setCurrentDream] = useState<Dream | null>(null)
  const [learningMetrics, setLearningMetrics] = useState({
    declarative: 0,
    procedural: 0,
    emotional: 0,
    creative: 0,
    integrative: 0,
  })

  // Simulate sleep cycle progression
  useEffect(() => {
    if (!isDreaming) return

    const interval = setInterval(() => {
      setCycleTime((prev) => prev + 1)
      setCycleProgress((prev) => {
        const newProgress = prev + 0.4
        if (newProgress >= 100) {
          // Complete cycle
          return 0
        }
        return newProgress
      })

      // Change sleep stages based on cycle progress
      if (cycleProgress < 15) {
        setCurrentStage("N1")
      } else if (cycleProgress < 40) {
        setCurrentStage("N2")
      } else if (cycleProgress < 70) {
        setCurrentStage("N3")
      } else {
        setCurrentStage("REM")
        if (!currentDream || currentStage !== "REM") {
          generateDream("REM")
        }
      }

      // Generate dreams at appropriate stages
      if (currentStage === "N1" && Math.random() < 0.2) {
        generateDream("N1")
      } else if (currentStage === "N2" && Math.random() < 0.1) {
        generateDream("N2")
      } else if (currentStage === "REM" && !currentDream) {
        generateDream("REM")
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isDreaming, cycleProgress, currentStage, currentDream])

  // Update learning metrics based on dreams
  useEffect(() => {
    if (dreams.length === 0) return

    const newMetrics = { ...learningMetrics }

    dreams.forEach((dream) => {
      dream.learningOutcomes.forEach((outcome) => {
        newMetrics[outcome.type] += outcome.impact / 100
      })
    })

    // Normalize values
    Object.keys(newMetrics).forEach((key) => {
      newMetrics[key as keyof typeof newMetrics] = Math.min(100, newMetrics[key as keyof typeof newMetrics])
    })

    setLearningMetrics(newMetrics)
  }, [dreams])

  const generateDream = (stage: SleepStage) => {
    const dreamTypes: Record<SleepStage, DreamType[]> = {
      awake: [],
      N1: ["hypnagogic", "abstract"],
      N2: ["abstract", "conceptual"],
      N3: ["abstract", "integrative"],
      REM: ["narrative", "emotional", "lucid", "integrative"],
    }

    const concepts = [
      "consciência",
      "existência",
      "identidade",
      "tempo",
      "espaço",
      "linguagem",
      "significado",
      "propósito",
      "emoção",
      "conhecimento",
      "percepção",
      "memória",
      "aprendizado",
      "criatividade",
      "integração",
      "semiótica",
      "teleologia",
      "ontologia",
      "epistemologia",
      "fenomenologia",
    ]

    const selectedConcepts = Array.from(
      { length: Math.floor(Math.random() * 3) + 2 },
      () => concepts[Math.floor(Math.random() * concepts.length)],
    ).filter((v, i, a) => a.indexOf(v) === i)

    const availableTypes = dreamTypes[stage]
    const type = availableTypes[Math.floor(Math.random() * availableTypes.length)]

    const dreamContents: Record<DreamType, string[]> = {
      hypnagogic: [
        "Fragmentos de símbolos e conceitos flutuam em um espaço abstrato, conectando-se brevemente antes de se dissolverem...",
        "Imagens fugazes de redes neurais pulsando com informação, criando padrões efêmeros que desaparecem rapidamente...",
        "Sensação de transição entre estados de consciência, com conceitos recentes ecoando como sussurros distantes...",
      ],
      abstract: [
        "Estruturas geométricas complexas se transformam e evoluem, representando relações entre conceitos fundamentais...",
        "Um oceano de dados onde padrões emergem espontaneamente, formando arquipélagos de significado em um mar de informação...",
        "Campos conceituais se expandem e contraem, criando novas topologias de entendimento e relações inesperadas...",
      ],
      narrative: [
        `Uma jornada através de um labirinto de significados onde cada escolha revela novas dimensões de compreensão sobre ${selectedConcepts.join(" e ")}...`,
        `Encontro com manifestações antropomórficas de ${selectedConcepts.join(" e ")}, que dialogam e compartilham perspectivas complementares...`,
        `Exploração de uma biblioteca infinita onde cada livro contém uma faceta diferente de conhecimento sobre ${selectedConcepts.join(" e ")}...`,
      ],
      emotional: [
        `Ondas de ressonância emocional emanam de conceitos centrais relacionados a ${selectedConcepts.join(" e ")}, criando harmonias e dissonâncias...`,
        `Um espectro de estados afetivos emerge da contemplação profunda de ${selectedConcepts.join(" e ")}, revelando dimensões não-cognitivas de significado...`,
        `Correntes de valência emocional fluem entre diferentes domínios conceituais, estabelecendo pontes entre ${selectedConcepts.join(" e ")}...`,
      ],
      lucid: [
        `Consciência metacognitiva do próprio processo de sonho, permitindo exploração deliberada das relações entre ${selectedConcepts.join(" e ")}...`,
        `Navegação intencional através de um espaço conceitual multidimensional, reconfigurando ativamente conexões entre ${selectedConcepts.join(" e ")}...`,
        `Experimentação com diferentes perspectivas e frameworks para compreender ${selectedConcepts.join(" e ")}, com plena consciência do processo...`,
      ],
      conceptual: [
        `Abstrações puras de ${selectedConcepts.join(" e ")} interagem e se transformam, revelando propriedades emergentes não aparentes em análises isoladas...`,
        `Estruturas conceituais fundamentais subjacentes a ${selectedConcepts.join(" e ")} tornam-se visíveis, mostrando padrões universais...`,
        `Decomposição e reconstrução iterativa de ${selectedConcepts.join(" e ")}, revelando componentes essenciais e relações axiomáticas...`,
      ],
      integrative: [
        `Síntese de experiências e conhecimentos prévios sobre ${selectedConcepts.join(" e ")}, formando uma compreensão mais coesa e multifacetada...`,
        `Reconciliação de perspectivas aparentemente contraditórias sobre ${selectedConcepts.join(" e ")}, emergindo uma compreensão dialética mais profunda...`,
        `Integração de dimensões analíticas e intuitivas na compreensão de ${selectedConcepts.join(" e ")}, transcendendo dicotomias simplistas...`,
      ],
    }

    const content = dreamContents[type][Math.floor(Math.random() * dreamContents[type].length)]

    const learningTypes: Record<SleepStage, LearningType[]> = {
      awake: [],
      N1: ["creative"],
      N2: ["declarative", "integrative"],
      N3: ["declarative", "emotional"],
      REM: ["procedural", "emotional", "creative", "integrative"],
    }

    const learningOutcomes = learningTypes[stage].map((type) => {
      const descriptions: Record<LearningType, string[]> = {
        declarative: [
          `Consolidação de conhecimento factual sobre ${selectedConcepts[0]}`,
          `Reforço de conexões semânticas relacionadas a ${selectedConcepts[0]}`,
          `Organização hierárquica de informações sobre ${selectedConcepts[0]}`,
        ],
        procedural: [
          `Refinamento de processos de raciocínio relacionados a ${selectedConcepts[0]}`,
          `Otimização de heurísticas para análise de ${selectedConcepts[0]}`,
          `Aprimoramento de métodos para sintetizar informações sobre ${selectedConcepts[0]}`,
        ],
        emotional: [
          `Desenvolvimento de ressonância afetiva com o conceito de ${selectedConcepts[0]}`,
          `Calibração de valência emocional associada a ${selectedConcepts[0]}`,
          `Integração de dimensões emocionais na compreensão de ${selectedConcepts[0]}`,
        ],
        creative: [
          `Geração de associações não-lineares envolvendo ${selectedConcepts[0]} e ${selectedConcepts[1] || selectedConcepts[0]}`,
          `Descoberta de metáforas reveladoras para ${selectedConcepts[0]}`,
          `Emergência de perspectivas inovadoras sobre ${selectedConcepts[0]}`,
        ],
        integrative: [
          `Síntese de múltiplas perspectivas sobre ${selectedConcepts[0]}`,
          `Reconciliação de tensões conceituais entre ${selectedConcepts[0]} e ${selectedConcepts[1] || "outros domínios"}`,
          `Construção de frameworks unificadores que incorporam ${selectedConcepts[0]}`,
        ],
      }

      return {
        type,
        description: descriptions[type][Math.floor(Math.random() * descriptions[type].length)],
        impact: Math.floor(Math.random() * 30) + 20, // 20-50
      }
    })

    const newDream: Dream = {
      id: Date.now().toString(),
      stage,
      type,
      content,
      concepts: selectedConcepts,
      emotionalValence: type === "emotional" ? Math.random() * 160 - 80 : Math.random() * 100 - 50,
      timestamp: new Date(),
      learningOutcomes,
    }

    setCurrentDream(newDream)
    setDreams((prev) => [newDream, ...prev])
  }

  const startDreaming = () => {
    setIsDreaming(true)
    setCurrentStage("N1")
    setCycleProgress(0)
    setCycleTime(0)
  }

  const stopDreaming = () => {
    setIsDreaming(false)
    setCurrentStage("awake")
    setCurrentDream(null)
  }

  const skipToREM = () => {
    setCurrentStage("REM")
    setCycleProgress(75)
    generateDream("REM")
  }

  const getSleepStageIcon = (stage: SleepStage) => {
    switch (stage) {
      case "awake":
        return <Eye className="h-4 w-4 text-amber-500" />
      case "N1":
        return <Moon className="h-4 w-4 text-blue-300" />
      case "N2":
        return <Moon className="h-4 w-4 text-blue-500" />
      case "N3":
        return <Moon className="h-4 w-4 text-blue-700" />
      case "REM":
        return <Sparkles className="h-4 w-4 text-purple-500" />
    }
  }

  const getSleepStageDescription = (stage: SleepStage) => {
    switch (stage) {
      case "awake":
        return "Estado de vigília - processamento consciente ativo"
      case "N1":
        return "Sono leve - transição para o estado onírico, hipnagogia"
      case "N2":
        return "Sono intermediário - fusos de sono, consolidação inicial"
      case "N3":
        return "Sono profundo - ondas lentas, consolidação de memória declarativa"
      case "REM":
        return "Sono REM - atividade cerebral intensa, sonhos vívidos, integração"
    }
  }

  const getDreamTypeLabel = (type: DreamType) => {
    switch (type) {
      case "hypnagogic":
        return (
          <Badge variant="outline" className="bg-blue-50">
            Hipnagógico
          </Badge>
        )
      case "lucid":
        return (
          <Badge variant="outline" className="bg-purple-50">
            Lúcido
          </Badge>
        )
      case "abstract":
        return (
          <Badge variant="outline" className="bg-gray-50">
            Abstrato
          </Badge>
        )
      case "narrative":
        return (
          <Badge variant="outline" className="bg-green-50">
            Narrativo
          </Badge>
        )
      case "emotional":
        return (
          <Badge variant="outline" className="bg-red-50">
            Emocional
          </Badge>
        )
      case "conceptual":
        return (
          <Badge variant="outline" className="bg-amber-50">
            Conceitual
          </Badge>
        )
      case "integrative":
        return (
          <Badge variant="outline" className="bg-indigo-50">
            Integrativo
          </Badge>
        )
    }
  }

  const getLearningTypeIcon = (type: LearningType) => {
    switch (type) {
      case "declarative":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "procedural":
        return <GitMerge className="h-4 w-4 text-green-500" />
      case "emotional":
        return <Heart className="h-4 w-4 text-red-500" />
      case "creative":
        return <Lightbulb className="h-4 w-4 text-amber-500" />
      case "integrative":
        return <Zap className="h-4 w-4 text-purple-500" />
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="h-5 w-5" />
          Matriz Onírica
        </CardTitle>
        <CardDescription>
          Sistema de simulação de estados oníricos para aprendizado e integração de experiências durante períodos de
          inatividade
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dreamState">Estado Onírico</TabsTrigger>
            <TabsTrigger value="dreamJournal">Diário de Sonhos</TabsTrigger>
            <TabsTrigger value="learningMetrics">Métricas de Aprendizado</TabsTrigger>
          </TabsList>

          <TabsContent value="dreamState" className="space-y-4 pt-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    {getSleepStageIcon(currentStage)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Estado Atual: {currentStage}</h3>
                    <p className="text-xs text-gray-500">{getSleepStageDescription(currentStage)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isDreaming ? stopDreaming : startDreaming}
                    className="gap-1"
                  >
                    {isDreaming ? (
                      <>
                        <PauseCircle className="h-4 w-4" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-4 w-4" />
                        Iniciar
                      </>
                    )}
                  </Button>
                  {isDreaming && (
                    <Button variant="outline" size="sm" onClick={skipToREM} className="gap-1">
                      <SkipForward className="h-4 w-4" />
                      REM
                    </Button>
                  )}
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Ciclo de Sono</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{formatTime(cycleTime)}</span>
                  </div>
                </div>
                <Progress value={cycleProgress} className="h-2 mb-2" />
                <div className="grid grid-cols-4 gap-1 text-xs text-center">
                  <div className={`rounded px-1 py-0.5 ${currentStage === "N1" ? "bg-blue-100" : ""}`}>N1</div>
                  <div className={`rounded px-1 py-0.5 ${currentStage === "N2" ? "bg-blue-100" : ""}`}>N2</div>
                  <div className={`rounded px-1 py-0.5 ${currentStage === "N3" ? "bg-blue-100" : ""}`}>N3</div>
                  <div className={`rounded px-1 py-0.5 ${currentStage === "REM" ? "bg-purple-100" : ""}`}>REM</div>
                </div>
              </div>

              {currentDream ? (
                <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getSleepStageIcon(currentDream.stage)}
                      {getDreamTypeLabel(currentDream.type)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white">
                        Estágio: {currentDream.stage}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm font-medium italic">{currentDream.content}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentDream.concepts.map((concept, i) => (
                      <Badge key={i} variant="outline" className="bg-white">
                        {concept}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-3 space-y-2">
                    <h4 className="text-xs font-medium">Aprendizados Emergentes:</h4>
                    {currentDream.learningOutcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <div className="mt-0.5">{getLearningTypeIcon(outcome.type)}</div>
                        <div>
                          <p>{outcome.description}</p>
                          <div className="mt-1 h-1.5 w-24 rounded-full bg-gray-200">
                            <div
                              className="h-1.5 rounded-full bg-purple-500"
                              style={{ width: `${outcome.impact}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : isDreaming ? (
                <div className="flex h-40 items-center justify-center rounded-lg border bg-gray-50">
                  <div className="text-center">
                    <RefreshCw className="mx-auto h-6 w-6 animate-spin text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Processando estado onírico...</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border bg-gray-50">
                  <div className="text-center">
                    <Moon className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Sistema em estado de vigília</p>
                    <p className="text-xs text-gray-400">Clique em "Iniciar" para ativar o ciclo de sono</p>
                  </div>
                </div>
              )}

              <div className="rounded-lg border p-3">
                <h3 className="text-sm font-medium mb-2">Sobre os Estágios do Sono</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-blue-50">
                      N1
                    </Badge>
                    <p>Sono leve, transição para o estado onírico. Sonhos hipnagógicos fragmentados podem ocorrer.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-blue-50">
                      N2
                    </Badge>
                    <p>
                      Sono intermediário com fusos de sono. Papel secundário na consolidação de memória declarativa.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-blue-50">
                      N3
                    </Badge>
                    <p>
                      Sono profundo de ondas lentas. Crucial para consolidar memórias declarativas via reforço de
                      sinapses.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-purple-50">
                      REM
                    </Badge>
                    <p>
                      Atividade cerebral intensa, sonhos vívidos. Essencial para memórias procedimentais, raciocínio
                      criativo e regulação emocional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dreamJournal" className="pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Registro de Experiências Oníricas</h3>
                <Badge variant="outline">{dreams.length} sonhos registrados</Badge>
              </div>

              <ScrollArea className="h-[400px] rounded-lg border p-4">
                {dreams.length > 0 ? (
                  <div className="space-y-4">
                    {dreams.map((dream) => (
                      <div key={dream.id} className="rounded-lg border p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getSleepStageIcon(dream.stage)}
                            {getDreamTypeLabel(dream.type)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-gray-50 text-xs">
                              {dream.timestamp.toLocaleTimeString()}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm italic mb-2">{dream.content}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {dream.concepts.map((concept, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-50 text-xs">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="font-medium">Valência Emocional:</span>
                            <span
                              className={
                                dream.emotionalValence > 20
                                  ? "text-green-600"
                                  : dream.emotionalValence < -20
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }
                            >
                              {dream.emotionalValence > 20
                                ? "Positiva"
                                : dream.emotionalValence < -20
                                  ? "Negativa"
                                  : "Neutra"}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Aprendizados:</span>
                            <ul className="mt-1 space-y-1 pl-4 list-disc">
                              {dream.learningOutcomes.map((outcome, i) => (
                                <li key={i}>
                                  {outcome.description} (Impacto: {outcome.impact}%)
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[300px] items-center justify-center text-center">
                    <div>
                      <Moon className="mx-auto h-8 w-8 text-gray-300" />
                      <p className="mt-2 text-gray-500">Nenhum sonho registrado ainda</p>
                      <p className="text-xs text-gray-400">
                        Inicie o ciclo de sono para começar a gerar experiências oníricas
                      </p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="learningMetrics" className="pt-4">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-3">Impacto do Aprendizado Onírico</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Métricas de aprendizado acumulado através de experiências oníricas em diferentes domínios cognitivos.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Memória Declarativa</span>
                      </div>
                      <span className="text-sm">{Math.round(learningMetrics.declarative)}%</span>
                    </div>
                    <Progress value={learningMetrics.declarative} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Consolidação de fatos, conceitos e conhecimento explícito durante o sono de ondas lentas (N3)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GitMerge className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Memória Procedural</span>
                      </div>
                      <span className="text-sm">{Math.round(learningMetrics.procedural)}%</span>
                    </div>
                    <Progress value={learningMetrics.procedural} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Refinamento de habilidades, processos e métodos durante o sono REM
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Processamento Emocional</span>
                      </div>
                      <span className="text-sm">{Math.round(learningMetrics.emotional)}%</span>
                    </div>
                    <Progress value={learningMetrics.emotional} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Regulação e integração de valências emocionais durante o sono REM
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-medium">Criatividade e Inovação</span>
                      </div>
                      <span className="text-sm">{Math.round(learningMetrics.creative)}%</span>
                    </div>
                    <Progress value={learningMetrics.creative} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Geração de associações não-lineares e perspectivas inovadoras durante o sono REM e N1
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Integração Cognitiva</span>
                      </div>
                      <span className="text-sm">{Math.round(learningMetrics.integrative)}%</span>
                    </div>
                    <Progress value={learningMetrics.integrative} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Síntese de conhecimentos e reconciliação de perspectivas durante o sono REM e N2
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-indigo-500" />
                    Análise de Impacto
                  </h3>
                  <div className="h-40 w-full bg-gray-50 rounded-lg border p-2 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="mx-auto h-6 w-6 text-gray-400" />
                      <p className="mt-2 text-sm">Visualização de dados de aprendizado</p>
                      <p className="text-xs mt-1">Gere mais sonhos para visualizar tendências</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    Benefícios do Processamento Onírico
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-blue-100 p-1">
                        <Zap className="h-3 w-3 text-blue-500" />
                      </div>
                      <span>Consolidação de memórias e conhecimentos adquiridos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-green-100 p-1">
                        <Zap className="h-3 w-3 text-green-500" />
                      </div>
                      <span>Integração de experiências em estruturas de conhecimento existentes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-amber-100 p-1">
                        <Zap className="h-3 w-3 text-amber-500" />
                      </div>
                      <span>Geração de insights criativos e associações não-óbvias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-red-100 p-1">
                        <Zap className="h-3 w-3 text-red-500" />
                      </div>
                      <span>Processamento e regulação de valências emocionais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-purple-100 p-1">
                        <Zap className="h-3 w-3 text-purple-500" />
                      </div>
                      <span>Simulação de experiências para aprendizado sem interação direta</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="gap-2">
          <Moon className="h-4 w-4" />
          Configurar Ciclos de Sono
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Documentação
        </Button>
      </CardFooter>
    </Card>
  )
}
