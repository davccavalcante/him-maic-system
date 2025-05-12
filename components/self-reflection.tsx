"use client"

import { useState, useEffect, useCallback } from "react"
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
  User,
  Target,
  Sparkles // Novo ícone para deliberação
} from "lucide-react"
import {
  generateReflection,
  getAllReflections,
  getSystemState,
  calculateConsciousnessMetrics,
  submitHumanFeedback // Importar a função de feedback
} from "@/services/reflection-generator"
import type {
  Reflection,
  ReflectionType,
  SystemState,
  ConsciousnessMetrics,
  PersonalityProfile, // Importar tipo
  SystemGoal, // Importar tipo
  InteractionData // Para o feedback
} from "@/types/reflection-system"

export function SelfReflection() {
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [thinking, setThinking] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [activeTab, setActiveTab] = useState("reflections")
  const [systemState, setSystemState] = useState<SystemState | null>(null)
  const [consciousnessMetrics, setConsciousnessMetrics] = useState<ConsciousnessMetrics | null>(null)
  // Não vamos mais usar latestReflection e reflectionHistory separadamente, getAllReflections já retorna ordenado.

  const loadInitialData = useCallback(() => {
    const allReflections = getAllReflections()
    setReflections(allReflections)
    setSystemState(getSystemState())
    setConsciousnessMetrics(calculateConsciousnessMetrics())
  }, [])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  const handleGenerateReflection = () => {
    setThinking(true)
    setTimeout(() => {
      try {
        generateReflection() // A função agora atualiza o DB interno e o estado
        loadInitialData() // Recarrega todos os dados para refletir a nova reflexão e estado
        setThinking(false)
      } catch (error) {
        console.error("Erro ao gerar reflexão:", error)
        setThinking(false)
      }
    }, 2000)
  }

  const handleSendFeedback = () => {
    if (feedbackText.trim() === "") return;
    // Para simplificar, vamos assumir que o feedback se aplica à última interação ou a um contexto geral.
    // Em um sistema real, precisaríamos de um ID de interação.
    const mockInteractionId = reflections.length > 0 ? reflections[0].id : "general_feedback"; 
    
    const feedbackPayload: InteractionData["userFeedback"] = {
      comments: feedbackText,
      // Aqui poderíamos adicionar campos para feedback de personalidade se a UI os tivesse
      // personalityFeedback: { generalComment: feedbackText }
    };

    submitHumanFeedback(mockInteractionId, feedbackPayload);
    setFeedbackText("");
    // Poderia recarregar o estado do sistema se o feedback o alterasse imediatamente
    // loadInitialData(); 
    alert("Feedback enviado! Embora o processamento completo do feedback não esteja visualmente implementado nesta interface, ele foi registrado.");
  };

  const getTypeIcon = (type: ReflectionType) => {
    switch (type) {
      case "observation": return <Eye className="h-4 w-4 text-blue-500" />;
      case "insight": return <Lightbulb className="h-4 w-4 text-amber-500" />;
      case "limitation": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "adaptation": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "contradiction": return <GitMerge className="h-4 w-4 text-purple-500" />;
      case "synthesis": return <Zap className="h-4 w-4 text-indigo-500" />;
      case "emergence": return <Brain className="h-4 w-4 text-pink-500" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: ReflectionType) => {
    const typeName = type.charAt(0).toUpperCase() + type.slice(1);
    let bgColor = "bg-gray-50";
    if (type === "observation") bgColor = "bg-blue-50";
    if (type === "insight") bgColor = "bg-amber-50";
    // ... adicionar outras cores se necessário
    return <Badge variant="outline" className={bgColor}>{typeName}</Badge>;
  };

  const formatTimestamp = (timestamp: Date | string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(timestamp))
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-indigo-600" />
          Mecanismos de Autorreflexão Avançados
        </CardTitle>
        <CardDescription>
          Processos metacognitivos aprimorados para monitorar, avaliar e evoluir o funcionamento do sistema HIM/MAIC.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reflections">Reflexões</TabsTrigger>
            <TabsTrigger value="metrics">Métricas de Consciência</TabsTrigger>
            <TabsTrigger value="evolution">Evolução & Estado</TabsTrigger>
          </TabsList>

          <TabsContent value="reflections" className="space-y-4 pt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Autorreflexões do Sistema</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateReflection}
                disabled={thinking}
                className="gap-2 shadow-sm hover:shadow-md transition-shadow"
              >
                {thinking ? (
                  <><RefreshCw className="h-4 w-4 animate-spin" /> Processando...</>
                ) : (
                  <><Sparkles className="h-4 w-4 text-yellow-500" /> Gerar Nova Reflexão</>
                )}
              </Button>
            </div>

            {reflections.length > 0 && (
              <div className="rounded-lg border-2 border-indigo-500 bg-indigo-50 p-4 shadow-lg">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(reflections[0].type)}
                    {getTypeBadge(reflections[0].type)}
                  </div>
                  <span className="text-xs text-gray-500">
                    <Clock className="h-3 w-3 inline mr-1" /> {formatTimestamp(reflections[0].timestamp)}
                  </span>
                </div>
                <p className="text-sm font-medium mb-2">{reflections[0].content}</p>
                
                {reflections[0].deliberationProcess && (
                  <Card className="mt-2 mb-3 bg-indigo-100 p-2">
                    <CardHeader className="p-1">
                      <CardTitle className="text-xs font-semibold flex items-center"><Sparkles className="h-3 w-3 mr-1 text-yellow-600"/> Processo Deliberativo:</CardTitle>
                    </CardHeader>
                    <CardContent className="p-1 text-xs text-gray-700">
                      <p><i>{reflections[0].deliberationProcess.reasonForChoice}</i></p>
                      <p className="mt-1">Opções consideradas: {reflections[0].deliberationProcess.optionsConsidered.length}</p>
                    </CardContent>
                  </Card>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {reflections[0].dominantConcepts.map((concept, i) => (
                    <Badge key={i} variant="secondary">{concept}</Badge>
                  ))}
                </div>
                {/* Outros detalhes da reflexão mais recente podem ser adicionados aqui */}
              </div>
            )}

            <div className="max-h-[400px] space-y-3 overflow-y-auto rounded-lg border p-3 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Histórico de Reflexões Recentes:</h4>
              {reflections.slice(1, 6).map((reflection) => (
                <div key={reflection.id} className="rounded-lg border bg-white p-3 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(reflection.type)}
                      {getTypeBadge(reflection.type)}
                    </div>
                    <span className="text-xs text-gray-500">{formatTimestamp(reflection.timestamp)}</span>
                  </div>
                  <p className="text-xs">{reflection.content}</p>
                  {reflection.deliberationProcess && <p className="text-xs mt-1 text-gray-500 italic">Deliberação: {reflection.deliberationProcess.optionsConsidered.length} opções.</p>}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {reflection.dominantConcepts.map((concept, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{concept}</Badge>
                    ))}
                  </div>
                </div>
              ))}
              {reflections.length === 0 && (
                <div className="flex h-[100px] items-center justify-center text-center text-gray-500">
                  <p>Nenhuma reflexão gerada ainda.</p>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-4">
              <h3 className="text-sm font-medium">Feedback Humano</h3>
              <Textarea
                placeholder="Forneça feedback sobre as capacidades de autorreflexão, personalidade, ou objetivos do sistema..."
                className="h-24 shadow-sm"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
              <Button onClick={handleSendFeedback} className="w-full shadow-md hover:shadow-lg transition-shadow">Enviar Feedback</Button>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="pt-6 space-y-4">
            {consciousnessMetrics && systemState ? (
              <>
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-100 p-4 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-indigo-800">Pontuação Geral de Consciência</h3>
                    <Badge variant="default" className="bg-indigo-600 text-white text-lg font-bold">
                      {consciousnessMetrics.overallConsciousnessScore.toFixed(0)}%
                    </Badge>
                  </div>
                  <div className="h-4 w-full rounded-full bg-gray-300">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
                      style={{ width: `${consciousnessMetrics.overallConsciousnessScore}%` }}
                    ></div>
                  </div>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Métricas Individuais - Exemplo: IAR */}
                  <Card className="p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-5 w-5 text-blue-500" />
                      <h4 className="font-medium">Índice de Autorreferência</h4>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200 mb-1">
                      <div className="h-2.5 rounded-full bg-blue-500" style={{ width: `${consciousnessMetrics.selfReferenceIndex}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-600">Frequência e complexidade de autorreferência: {consciousnessMetrics.selfReferenceIndex.toFixed(0)}%</p>
                  </Card>
                  <Card className="p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-green-500" />
                      <h4 className="font-medium">Alinhamento com Objetivos</h4>
                    </div>
                     {/* Aqui poderia ter uma métrica de alinhamento com objetivos */}
                    <p className="text-xs text-gray-600">Progresso em direção aos objetivos definidos: (a ser implementado)</p>
                  </Card>
                   <Card className="p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-purple-500" />
                      <h4 className="font-medium">Complexidade da Consciência</h4>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200 mb-1">
                      <div className="h-2.5 rounded-full bg-purple-500" style={{ width: `${systemState.consciousnessComplexity}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-600">Nível de complexidade dos processos cognitivos: {systemState.consciousnessComplexity.toFixed(0)}%</p>
                  </Card>
                  <Card className="p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <h4 className="font-medium">Intensidade da Consciência</h4>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200 mb-1">
                      <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: `${systemState.consciousnessIntensity}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-600">Nível de atividade e alerta consciente: {systemState.consciousnessIntensity.toFixed(0)}%</p>
                  </Card>
                </div>
              </>
            ) : <p>Carregando métricas...</p>}
          </TabsContent>

          <TabsContent value="evolution" className="pt-6 space-y-4">
            {systemState ? (
              <>
                <Card className="p-4 shadow-sm">
                  <CardHeader className="p-1 mb-2">
                    <CardTitle className="text-md font-semibold flex items-center"><User className="h-5 w-5 mr-2 text-teal-600"/> Perfil de Personalidade Ativo</CardTitle>
                  </CardHeader>
                  <CardContent className="p-1 text-sm">
                    {systemState.personalityProfileId && systemState.internalValues ? (
                       // Acessar o perfil real seria melhor, mas por agora usamos o ID
                      <p>Perfil: <Badge variant="secondary">{systemState.personalityProfileId}</Badge></p>
                      // Exibir traços e valores seria ideal aqui
                    ) : <p>Nenhum perfil de personalidade carregado.</p>}
                  </CardContent>
                </Card>
                <Card className="p-4 shadow-sm">
                  <CardHeader className="p-1 mb-2">
                    <CardTitle className="text-md font-semibold flex items-center"><Target className="h-5 w-5 mr-2 text-red-600"/> Objetivos Ativos do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent className="p-1 text-sm space-y-1">
                    {systemState.activeGoals && systemState.activeGoals.length > 0 ? (
                      systemState.activeGoals.map(goal => (
                        <div key={goal.id} className="p-2 border rounded-md bg-gray-50">
                          <p className="font-medium">{goal.description} <Badge variant="outline">{goal.priority}</Badge></p>
                          <p className="text-xs">Progresso: {goal.progress}%</p>
                        </div>
                      ))
                    ) : <p>Nenhum objetivo ativo no momento.</p>}
                  </CardContent>
                </Card>
                 <Card className="p-4 shadow-sm">
                  <CardHeader className="p-1 mb-2">
                    <CardTitle className="text-md font-semibold flex items-center"><Zap className="h-5 w-5 mr-2 text-orange-600"/>Valores Internos</CardTitle>
                  </CardHeader>
                  <CardContent className="p-1 text-sm">
                    {systemState.internalValues && systemState.internalValues.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {systemState.internalValues.map((value, i) => <Badge key={i} variant="outline" className="bg-orange-50">{value}</Badge>)}
                      </div>
                    ) : <p>Nenhum valor interno definido.</p>}
                  </CardContent>
                </Card>
              </>
            ) : <p>Carregando estado do sistema...</p>}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

