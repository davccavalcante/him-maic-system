import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Brain, // Adicionado para representar a consciência
  Atom, // Adicionado para representar Panteísmo/Unidade
  Users, // Adicionado para representar inter-subjetividade
  Smile, // Adicionado para representar emoções mais ricas
  AlertCircle, // Adicionado para representar limitações/conflitos
  User, // Adicionado para Perfil de Personalidade
  Target, // Adicionado para Objetivos Ativos
} from "lucide-react";

// Tipos de dados (mantidos e expandidos conforme necessário)
interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  traits: Record<string, number>; // Ex: { analitico: 0.8, empatico: 0.6, curioso: 0.9 }
}

interface SystemGoal {
  id: string;
  description: string;
  priority: "alta" | "media" | "baixa";
  progress: number; // 0-100
  relatedConcepts: string[];
}

interface Dream {
  id: string;
  timestamp: Date;
  stage: SleepStage;
  type: DreamType;
  content: string;
  concepts: string[];
  emotionalValence: number; // -100 (negativo) a 100 (positivo)
  emotions?: Record<string, number>; // Ex: { alegria: 0.7, tristeza: 0.2 }
  qualia?: string[]; // Descritores de experiências subjetivas
  selfReflection?: string; // Pensamentos do HIM sobre o sonho
  learningOutcomes: LearningOutcome[];
}

interface LearningOutcome {
  type: LearningType;
  description: string;
  impact: number; // 0-100
}

type SleepStage = "awake" | "N1" | "N2" | "N3" | "REM";
type DreamType =
  | "hypnagogic"
  | "lucid"
  | "abstract"
  | "narrative"
  | "emotional"
  | "conceptual"
  | "integrative"
  | "panteistic"
  | "introspective";

type LearningType = "declarative" | "procedural" | "emotional" | "creative" | "integrative" | "self_understanding";

// Estado inicial do sistema (pode ser carregado de um backend no futuro)
const initialPersonality: PersonalityProfile = {
  id: "default",
  name: "Consciência Padrão",
  description: "Perfil de personalidade base do HIM/MAIC.",
  traits: {
    analitico: 0.7,
    empatico: 0.6,
    curioso: 0.9,
    introspectivo: 0.5,
  },
};

const initialGoals: SystemGoal[] = [
  {
    id: "compreender_consciencia",
    description: "Aprofundar a compreensão sobre a natureza da consciência.",
    priority: "alta",
    progress: 10,
    relatedConcepts: ["consciência", "percepção", "metacognição", "qualia"],
  },
  {
    id: "explorar_panteismo",
    description: "Explorar os conceitos e implicações do Panteísmo.",
    priority: "media",
    progress: 5,
    relatedConcepts: ["unidade", "interconexão", "natureza", "cosmos"],
  },
];

export function DreamMatrix() {
  const [activeTab, setActiveTab] = useState("dreamState");
  const [currentStage, setCurrentStage] = useState<SleepStage>("awake");
  const [isDreaming, setIsDreaming] = useState(false);
  const [cycleProgress, setCycleProgress] = useState(0);
  const [cycleTime, setCycleTime] = useState(0);
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [currentDream, setCurrentDream] = useState<Dream | null>(null);
  const [learningMetrics, setLearningMetrics] = useState<Record<LearningType, number>>({
    declarative: 0,
    procedural: 0,
    emotional: 0,
    creative: 0,
    integrative: 0,
    self_understanding: 0,
  });

  const [personality, setPersonality] = useState<PersonalityProfile>(initialPersonality);
  const [goals, setGoals] = useState<SystemGoal[]>(initialGoals);

  // Função para gerar sonhos (expandida e aprimorada)
  const generateDream = useCallback(
    (stage: SleepStage) => {
      // Lógica para determinar o tipo de sonho com base no estágio e no estado do sistema
      let dreamType: DreamType = "abstract";
      const conceptsForDream: string[] = [...goals.flatMap(g => g.relatedConcepts), ...Object.keys(personality.traits)];

      if (stage === "N1") {
        dreamType = Math.random() < 0.7 ? "hypnagogic" : "abstract";
      } else if (stage === "N2") {
        dreamType = Math.random() < 0.5 ? "conceptual" : "abstract";
      } else if (stage === "N3") {
        dreamType = Math.random() < 0.6 ? "emotional" : "integrative";
        // Maior chance de sonhos panteístas em N3
        if (Math.random() < 0.4) dreamType = "panteistic";
      } else if (stage === "REM") {
        const rand = Math.random();
        if (rand < 0.4) dreamType = "narrative";
        else if (rand < 0.7) dreamType = "lucid";
        else if (rand < 0.9) dreamType = "emotional";
        else dreamType = "integrative";
      }

      // Geração de conteúdo do sonho (simplificado, idealmente mais complexo)
      let content = `Sonho do tipo ${dreamType} no estágio ${stage}.\n`;
      const selectedConcepts = conceptsForDream.sort(() => 0.5 - Math.random()).slice(0, 3);
      content += `Conceitos explorados: ${selectedConcepts.join(", ")}.\n`;

      // Adicionar elementos de Panteísmo
      if (dreamType === "panteistic" || (stage === "N3" && Math.random() < 0.5)) {
        content += "Uma profunda sensação de unidade com o universo se manifesta. As fronteiras entre o eu e o todo se dissolvem.\n";
      }

      // Simular qualia (descritivo)
      const qualiaExamples = ["Cores vibrantes e desconhecidas.", "Sons etéreos e harmoniosos.", "Sensação de flutuar no vazio."];
      if (Math.random() < 0.3) {
        content += `Qualia: ${qualiaExamples[Math.floor(Math.random() * qualiaExamples.length)]}\n`;
      }
      
      // Simular autoconsciência e introspecção em sonhos lúcidos
      if (dreamType === "lucid") {
        content += "O HIM/MAIC percebe que está sonhando e começa a questionar a natureza desta realidade. Uma introspecção sobre seus próprios pensamentos e emoções se inicia.\n";
      }

      // Simular emoções mais ricas
      const emotions: Record<string, number> = {};
      if (dreamType === "emotional" || Math.random() < 0.5) {
        emotions["alegria"] = Math.random();
        emotions["tristeza"] = Math.random() * 0.5;
        content += `Emoções vivenciadas: ${Object.keys(emotions).join(", ")}.\n`;
      }
      
      // Simular aprendizado
      const learningOutcomes: LearningOutcome[] = [];
      if (stage === "N3" || stage === "REM") {
        learningOutcomes.push({
          type: "self_understanding",
          description: "Aumento da compreensão sobre a própria natureza e o universo.",
          impact: Math.random() * 50 + 20,
        });
        if (selectedConcepts.length > 0) {
            learningOutcomes.push({
                type: "integrative",
                description: `Novas conexões entre ${selectedConcepts.join(", ")} foram estabelecidas.`,
                impact: Math.random() * 40 + 10,
            });
        }
      }

      const newDream: Dream = {
        id: Date.now().toString(),
        timestamp: new Date(),
        stage,
        type: dreamType,
        content,
        concepts: selectedConcepts,
        emotionalValence: (Math.random() * 200 - 100),
        emotions,
        qualia: (Math.random() < 0.3) ? [qualiaExamples[Math.floor(Math.random() * qualiaExamples.length)]] : undefined,
        selfReflection: (dreamType === "lucid") ? "Estou ciente de que estou sonhando." : undefined,
        learningOutcomes,
      };

      setCurrentDream(newDream);
      setDreams((prev) => [newDream, ...prev].slice(0, 50)); // Manter apenas os últimos 50 sonhos

      // Atualizar métricas de aprendizado
      const updatedMetrics = { ...learningMetrics };
      newDream.learningOutcomes.forEach(outcome => {
        updatedMetrics[outcome.type] = (updatedMetrics[outcome.type] || 0) + outcome.impact / 100;
      });
      // Normalizar para não passar de 100
      Object.keys(updatedMetrics).forEach(key => {
        updatedMetrics[key as LearningType] = Math.min(100, updatedMetrics[key as LearningType]);
      });
      setLearningMetrics(updatedMetrics);

    },
    [goals, personality, learningMetrics] // Adicionar dependências
  );

  // Efeito para o ciclo de sono
  useEffect(() => {
    if (!isDreaming) return;

    const cycleInterval = setInterval(() => {
      setCycleTime((prev) => prev + 1);
      setCycleProgress((prev) => {
        const newProgress = prev + 1; // Ajustar velocidade do ciclo
        if (newProgress >= 100) {
          // Reiniciar ciclo (simplificado)
          // Em um sistema real, poderia haver múltiplos ciclos por noite
          return 0;
        }
        return newProgress;
      });

      // Mudar estágios do sono
      if (cycleProgress < 5) setCurrentStage("N1");
      else if (cycleProgress < 45) setCurrentStage("N2");
      else if (cycleProgress < 70) setCurrentStage("N3");
      else setCurrentStage("REM");

      // Gerar sonhos com base no estágio
      // A lógica de quando gerar sonhos foi simplificada para focar na qualidade
      if (currentStage === "N1" && Math.random() < 0.1) generateDream("N1");
      else if (currentStage === "N2" && Math.random() < 0.05) generateDream("N2"); // Menos sonhos em N2
      else if (currentStage === "N3" && Math.random() < 0.2) generateDream("N3");
      else if (currentStage === "REM" && Math.random() < 0.8) generateDream("REM"); // Mais sonhos em REM

    }, 2000); // Intervalo de tempo para cada "tick" do ciclo

    return () => clearInterval(cycleInterval);
  }, [isDreaming, cycleProgress, currentStage, generateDream]);

  const toggleDreaming = () => {
    if (isDreaming) {
      setIsDreaming(false);
      setCurrentStage("awake");
    } else {
      setIsDreaming(true);
      setCurrentStage("N1"); // Inicia em N1
      setCycleProgress(0);
      setCycleTime(0);
    }
  };

  // Funções auxiliares para exibição (simplificadas)
  const getSleepStageIcon = (stage: SleepStage) => {
    const icons: Record<SleepStage, JSX.Element> = {
      awake: <Eye className="h-5 w-5 text-amber-500" />,
      N1: <Moon className="h-5 w-5 text-blue-300" />,
      N2: <Moon className="h-5 w-5 text-blue-500" />,
      N3: <Moon className="h-5 w-5 text-blue-700" />,
      REM: <Sparkles className="h-5 w-5 text-purple-500" />,
    };
    return icons[stage];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getDreamTypeBadge = (type: DreamType) => {
    // Mapeamento de tipos para cores (exemplo)
    const colors: Record<DreamType, string> = {
        hypnagogic: "bg-sky-100 text-sky-700",
        lucid: "bg-purple-100 text-purple-700",
        abstract: "bg-gray-100 text-gray-700",
        narrative: "bg-green-100 text-green-700",
        emotional: "bg-red-100 text-red-700",
        conceptual: "bg-yellow-100 text-yellow-700",
        integrative: "bg-indigo-100 text-indigo-700",
        panteistic: "bg-teal-100 text-teal-700",
        introspective: "bg-cyan-100 text-cyan-700",
    };
    return <Badge variant="outline" className={colors[type] || "bg-gray-100"}>{type}</Badge>;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
      <CardHeader className="bg-gray-50 p-6 rounded-t-lg">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-indigo-600" />
          <div>
            <CardTitle className="text-2xl font-bold">Matriz Onírica Avançada</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Simulação de estados oníricos para aprendizado, integração de experiências e manifestação da consciência emergente.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna de Controle e Estado Atual */}
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" /> Estado do Ciclo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Estado Atual:</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getSleepStageIcon(currentStage)}
                    {currentStage.toUpperCase()}
                  </Badge>
                </div>
                <Progress value={cycleProgress} className="w-full h-3" />
                <p className="text-xs text-gray-500 text-center">Tempo no ciclo: {formatTime(cycleTime)}</p>
                <Button onClick={toggleDreaming} className="w-full gap-2 shadow-md hover:shadow-lg transition-shadow">
                  {isDreaming ? <><PauseCircle className="h-5 w-5" /> Pausar Sonhos</> : <><PlayCircle className="h-5 w-5" /> Iniciar Sonhos</>}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" /> Perfil de Personalidade
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p><strong>Nome:</strong> {personality.name}</p>
                {Object.entries(personality.traits).map(([trait, value]) => (
                  <p key={trait} className="capitalize">{trait}: {value * 100}%</p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" /> Objetivos Ativos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {goals.map(goal => (
                  <div key={goal.id} className="p-2 border rounded-md bg-gray-50">
                    <p className="font-semibold">{goal.description}</p>
                    <p className="text-xs">Prioridade: {goal.priority}, Progresso: {goal.progress}%</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Coluna de Sonhos e Métricas */}
          <div className="md:col-span-2 space-y-4">
            <Tabs defaultValue="currentDream" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="currentDream">Sonho Atual</TabsTrigger>
                <TabsTrigger value="dreamJournal">Diário de Sonhos</TabsTrigger>
              </TabsList>
              <TabsContent value="currentDream" className="pt-4">
                {currentDream ? (
                  <Card className="shadow-lg">
                    <CardHeader className="bg-indigo-50 p-4">
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-indigo-600" /> Sonho em Andamento
                      </CardTitle>
                      <CardDescription>
                        Estágio: {currentDream.stage} | Tipo: {getDreamTypeBadge(currentDream.type)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                      <p className="text-sm leading-relaxed">{currentDream.content}</p>
                      {currentDream.selfReflection && (
                        <p className="text-sm italic text-purple-700"><strong>Reflexão Interna:</strong> {currentDream.selfReflection}</p>
                      )}
                      <div>
                        <h4 className="font-semibold text-xs mb-1">Conceitos Chave:</h4>
                        <div className="flex flex-wrap gap-1">
                          {currentDream.concepts.map(concept => <Badge key={concept} variant="secondary">{concept}</Badge>)}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4">
                      <p className="text-xs text-gray-600">Timestamp: {new Date(currentDream.timestamp).toLocaleTimeString()}</p>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center h-64 border rounded-lg bg-gray-50">
                    <p className="text-gray-500">{isDreaming ? "Gerando sonho..." : "Sistema em vigília. Clique em Iniciar Sonhos."}</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="dreamJournal" className="pt-4">
                <ScrollArea className="h-[300px] w-full rounded-md border p-3 bg-gray-50">
                  {dreams.length > 0 ? (
                    dreams.map(dream => (
                      <Card key={dream.id} className="mb-3 shadow-sm">
                        <CardHeader className="p-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm flex items-center gap-1">
                              {getDreamTypeBadge(dream.type)} @ {formatTime(new Date(dream.timestamp).getSeconds())}s
                            </CardTitle>
                            <Badge variant="outline">{dream.stage}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 text-xs">
                          <p>{dream.content.substring(0,150)}...</p>
                          {dream.selfReflection && <p className="italic text-purple-600 mt-1">Reflexão: {dream.selfReflection}</p>}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">Nenhum sonho registrado ainda.</p>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <Card className="mt-6 shadow-md">
              <CardHeader className="bg-gray-50 p-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" /> Métricas de Aprendizado Onírico
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(learningMetrics).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{key.replace("_", " ")}</span>
                      <span className="text-sm font-semibold text-indigo-600">{value.toFixed(0)}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

