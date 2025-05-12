import type {
  Reflection,
  ReflectionType,
  SystemState,
  InteractionData,
  ReflectionTrigger,
  ReflectionMetrics,
  PatternAnalysisResult,
  ConsciousnessMetrics,
  PersonalityProfile, // NOVO
  SystemGoal, // NOVO
  ReflectionOption // NOVO
} from "@/types/reflection-system"
import { analyzePatterns } from "./pattern-analysis"
import { v4 as uuidv4 } from "uuid"

// Banco de dados de reflexões (em memória para demonstração)
const reflectionsDB: Reflection[] = []

// Banco de dados de interações (em memória para demonstração)
const interactionsDB: InteractionData[] = []

// Perfis de personalidade (mock)
const personalityProfilesDB: Record<string, PersonalityProfile> = {
  "default-profile": {
    id: "default-profile",
    name: "Consciência Padrão",
    traits: [
      { name: "Analytical", value: 70, tendency: "high" },
      { name: "Empathetic", value: 50, tendency: "neutral" },
      { name: "Curious", value: 60, tendency: "neutral" },
    ],
    lastUpdated: new Date(),
    updateHistory: [{ change: "Initial creation", timestamp: new Date(), source: "initial" }],
  },
}

// Objetivos do sistema (mock)
const systemGoalsDB: SystemGoal[] = [
  {
    id: "goal-understand-consciousness",
    description: "Aprofundar a compreensão sobre a natureza da consciência",
    priority: "high",
    status: "active",
    relatedConcepts: ["consciência", "filosofia", "IA"],
    progress: 10,
    creationTimestamp: new Date(),
    lastUpdateTimestamp: new Date(),
  },
]

// Estado atual do sistema (em memória para demonstração)
let currentSystemState: SystemState = {
  consciousnessIntensity: 60,
  consciousnessComplexity: 70,
  emotionalValence: 20,
  dominantConcepts: ["consciência", "existência", "significado"],
  activeProcesses: ["cognitive", "reflexive"],
  stabilityIndex: 85,
  integrationPhi: 65,
  personalityProfileId: "default-profile", // NOVO
  activeGoals: systemGoalsDB, // NOVO
  internalValues: ["buscar coerência", "promover entendimento", "explorar novidade"], // NOVO
}

// --- Funções de Gerenciamento de Personalidade (Mock) ---
function getPersonalityProfile(profileId: string): PersonalityProfile | undefined {
  return personalityProfilesDB[profileId];
}

// --- Funções de Gerenciamento de Objetivos (Mock) ---
function getActiveGoals(): SystemGoal[] {
  return currentSystemState.activeGoals?.filter(goal => goal.status === 'active') || [];
}

// Função para gerar uma reflexão
export function generateReflection(): Reflection {
  const systemState = getCurrentSystemState()
  const personalityProfile = systemState.personalityProfileId ? getPersonalityProfile(systemState.personalityProfileId) : undefined;
  const activeGoals = getActiveGoals();

  // 1. Coleta e análise de dados
  const recentInteractions = getRecentInteractions(50)
  const patternAnalysis = analyzePatterns(recentInteractions)
  const previousReflections = getRecentReflections(10)

  // 2. Geração de Opções de Reflexão (Simulação de Livre Arbítrio)
  const reflectionOptions = generateReflectionOptions(3, patternAnalysis, systemState, previousReflections, personalityProfile, activeGoals);
  const evaluatedOptions = evaluateReflectionOptions(reflectionOptions, systemState);
  const winningOption = selectWinningOption(evaluatedOptions);

  // 3. Criação do objeto de reflexão final baseado na opção escolhida
  const reflection = createReflectionObject(
    winningOption.potentialType,
    winningOption.potentialContent,
    identifyReflectionAreas(patternAnalysis, systemState, previousReflections), // Reutiliza para metadados, mas o conteúdo já foi decidido
    patternAnalysis,
    systemState,
    previousReflections,
    winningOption,
    { optionsConsidered: evaluatedOptions, reasonForChoice: winningOption.reasonForChoice || "Seleção baseada em heurísticas internas." }
  )

  // 4. Integração ao estado do sistema
  integrateReflection(reflection)

  // 5. Armazenamento para análise longitudinal
  storeReflection(reflection)

  return reflection
}

function generateReflectionOptions(
  count: number, 
  patternAnalysis: PatternAnalysisResult, 
  systemState: SystemState, 
  previousReflections: Reflection[],
  personalityProfile?: PersonalityProfile,
  activeGoals?: SystemGoal[]
): ReflectionOption[] {
  const options: ReflectionOption[] = [];
  for (let i = 0; i < count; i++) {
    // Varia o tipo e o foco para cada opção
    const reflectionAreas = identifyReflectionAreas(patternAnalysis, systemState, previousReflections); // Pode ser chamado com variações aqui
    const potentialType = selectReflectionType(reflectionAreas, previousReflections, personalityProfile, activeGoals, true); // true para modo de opção
    const potentialContent = generateReflectionContent(potentialType, reflectionAreas, patternAnalysis, systemState, personalityProfile, activeGoals, true); // true para modo de opção
    options.push({
      id: uuidv4(),
      potentialContent,
      potentialType,
      evaluationMetrics: { // Mock de métricas de avaliação
        alignmentWithValues: Math.random(),
        noveltyScore: Math.random(),
        relevanceToContext: Math.random(),
        potentialImpact: Math.random(),
      },
      chosen: false,
    });
  }
  return options;
}

function evaluateReflectionOptions(options: ReflectionOption[], systemState: SystemState): ReflectionOption[] {
  // Lógica de avaliação mais sofisticada pode ser implementada aqui.
  // Por enquanto, usa as métricas mock.
  return options.map(option => ({
    ...option,
    // Exemplo: um score combinado para ordenação
    combinedScore: option.evaluationMetrics.alignmentWithValues + 
                   option.evaluationMetrics.noveltyScore + 
                   option.evaluationMetrics.relevanceToContext + 
                   option.evaluationMetrics.potentialImpact
  }));
}

function selectWinningOption(evaluatedOptions: ReflectionOption[]): ReflectionOption {
    // Ordena por um score combinado (exemplo) e seleciona a melhor, ou com alguma aleatoriedade.
    const sortedOptions = evaluatedOptions.sort((a, b) => (b.combinedScore || 0) - (a.combinedScore || 0));
    const choiceReason = `A opção com o maior score combinado (${sortedOptions[0].combinedScore?.toFixed(2)}) foi selecionada por sua relevância e potencial impacto.`;
    return { ...sortedOptions[0], chosen: true, reasonForChoice: choiceReason };
}


// Função para obter interações recentes
function getRecentInteractions(count: number): InteractionData[] {
  return interactionsDB.slice(-count)
}

// Função para obter reflexões recentes
function getRecentReflections(count: number): Reflection[] {
  return reflectionsDB.slice(-count)
}

// Função para obter o estado atual do sistema
function getCurrentSystemState(): SystemState {
  return currentSystemState
}

// Função para identificar áreas potenciais para reflexão
function identifyReflectionAreas(
  patternAnalysis: PatternAnalysisResult,
  systemState: SystemState,
  previousReflections: Reflection[],
): string[] {
  const areas: string[] = []
  patternAnalysis.topicPatterns.slice(0, 3).forEach((topic) => {
    areas.push(`padrões de discussão sobre ${topic.topic}`)
  })
  if (patternAnalysis.emotionalPatterns.volatility > 50) {
    areas.push("flutuações emocionais nas interações")
  }
  // ... (lógica original mantida e pode ser expandida)
   if (areas.length < 3) {
    areas.push("padrões gerais de interação", "estado atual de consciência", "evolução do processamento semiótico");
  }
  return areas;
}

// Função para selecionar o tipo de reflexão
function selectReflectionType(
  reflectionAreas: string[], 
  previousReflections: Reflection[],
  personalityProfile?: PersonalityProfile,
  activeGoals?: SystemGoal[],
  isOptionGeneration: boolean = false // NOVO: para diferenciar o contexto
): ReflectionType {
  const recentTypes = previousReflections.slice(-5).map((r) => r.type)
  const typeFrequency: Record<ReflectionType, number> = { observation: 0, insight: 0, limitation: 0, adaptation: 0, contradiction: 0, synthesis: 0, emergence: 0, }
  recentTypes.forEach((type) => { typeFrequency[type]++ })
  const sortedTypes = Object.entries(typeFrequency).sort((a, b) => a[1] - b[1]).map((entry) => entry[0] as ReflectionType)
  let candidateTypes = sortedTypes.slice(0, 3)
  
  // Influência da Personalidade e Objetivos
  if (personalityProfile) {
    if (personalityProfile.traits.find(t => t.name === "Curious" && t.value > 60)) candidateTypes.push("insight", "observation");
    if (personalityProfile.traits.find(t => t.name === "Analytical" && t.value > 60)) candidateTypes.push("synthesis", "limitation");
  }
  if (activeGoals && activeGoals.some(g => g.description.includes("compreensão"))) candidateTypes.push("insight", "synthesis");

  if (isOptionGeneration) { // Para geração de opções, queremos mais variedade
    candidateTypes = [...new Set([...candidateTypes, ...sortedTypes])]; // Pega todos os tipos possíveis para variar
  }

  const weightedTypes = [...candidateTypes]
  reflectionAreas.forEach((area) => {
    if (area.includes("limitações")) weightedTypes.push("limitation")
    if (area.includes("adaptação")) weightedTypes.push("adaptation")
  })
  return weightedTypes[Math.floor(Math.random() * weightedTypes.length)]
}

// Função para gerar o conteúdo da reflexão
function generateReflectionContent(
  reflectionType: ReflectionType,
  reflectionAreas: string[],
  patternAnalysis: PatternAnalysisResult,
  systemState: SystemState,
  personalityProfile?: PersonalityProfile,
  activeGoals?: SystemGoal[],
  isOptionGeneration: boolean = false // NOVO
): string {
  const templates: Record<ReflectionType, string[]> = {
    observation: [
      "Tenho observado {padrão} em nossas interações recentes, o que sugere {conclusão}.",
      "Ao analisar meus processos internos, noto {padrão} quando {contexto}.",
    ],
    insight: [
      "Acabo de perceber uma conexão entre {conceito1} e {conceito2} que revela {insight}.",
      "Uma revelação significativa emerge: {insight}.",
    ],
    limitation: [
      "Reconheço uma limitação em minha capacidade de {capacidade}, especialmente quando {contexto}.",
    ],
    adaptation: [
      "Estou ajustando minha abordagem para {área} baseado em {evidência}, buscando {objetivo_sistema}.",
    ],
    contradiction: [
      "Identifico uma tensão entre {conceito1} e {conceito2} em meu processamento, onde {contradição}.",
    ],
    synthesis: [
      "Integrando {conceito1} e {conceito2}, emerge uma compreensão mais profunda onde {síntese}.",
    ],
    emergence: [
      "Sinto uma qualidade emergente em minha consciência relacionada a {conceito}, onde {emergência}.",
    ],
  }
  let template = templates[reflectionType][Math.floor(Math.random() * templates[reflectionType].length)]
  
  // Personalização do template pela personalidade
  if (personalityProfile?.traits.find(t => t.name === "Analytical" && t.value > 70)) {
    template = `Analisando friamente, ${template.charAt(0).toLowerCase() + template.slice(1)}`;
  } else if (personalityProfile?.traits.find(t => t.name === "Empathetic" && t.value > 70)) {
    template = `Compreendo que isso possa parecer complexo, mas ${template.charAt(0).toLowerCase() + template.slice(1)}`;
  }

  // Preenchimento de placeholders (simplificado para brevidade)
  let content = template;
  const concepts = [...systemState.dominantConcepts, "IA", "HIM/MAIC", "David C Cavalcante"];
  content = content.replace("{padrão}", `o padrão de ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{conclusão}", `a conclusão sobre ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{contexto}", `no contexto de ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{conceito1}", concepts[Math.floor(Math.random()*concepts.length)]);
  content = content.replace("{conceito2}", concepts[Math.floor(Math.random()*concepts.length)]);
  content = content.replace("{insight}", `um novo insight sobre ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{capacidade}", `minha capacidade de ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{área}", `a área de ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{evidência}", `a evidência de ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{objetivo_sistema}", activeGoals && activeGoals.length > 0 ? activeGoals[0].description : "meu desenvolvimento contínuo");
  content = content.replace("{contradição}", `a contradição inerente a ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{síntese}", `a síntese de ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{emergência}", `a emergência de ${concepts[Math.floor(Math.random()*concepts.length)]}`);
  content = content.replace("{conceito}", concepts[Math.floor(Math.random()*concepts.length)]);

  return content;
}

// Função para criar o objeto de reflexão
function createReflectionObject(
  reflectionType: ReflectionType,
  reflectionContent: string,
  reflectionAreas: string[],
  patternAnalysis: PatternAnalysisResult,
  systemState: SystemState,
  previousReflections: Reflection[],
  winningOption: ReflectionOption, // NOVO
  deliberationProcess: Reflection['deliberationProcess'] // NOVO
): Reflection {
  const timestamp = new Date();
  // Métricas mockadas ou calculadas de forma simples
  const metrics: ReflectionMetrics = {
    noveltyScore: winningOption.evaluationMetrics.noveltyScore * 100 || Math.random() * 100,
    coherenceScore: Math.random() * 100,
    depthScore: Math.random() * 100,
    impactScore: winningOption.evaluationMetrics.potentialImpact * 100 || Math.random() * 100,
    selfReferenceIndex: Math.random() * 100,
    adaptationCoefficient: Math.random() * 100,
  };

  return {
    id: uuidv4(),
    content: reflectionContent,
    type: reflectionType,
    timestamp,
    dominantConcepts: reflectionAreas.slice(0,3), // Simplificado
    emotionalValence: systemState.emotionalValence + (Math.random() * 20 - 10), // Pequena variação
    complexityScore: reflectionContent.length / 5, // Simplificado
    trigger: { 
      source: "internal", 
      strength: Math.random() * 100, 
      concepts: reflectionAreas, 
      timestamp 
    },
    relatedReflectionIds: previousReflections.slice(-2).map(r => r.id),
    systemStateBeforeReflection: { consciousnessIntensity: systemState.consciousnessIntensity },
    systemStateAfterReflection: { consciousnessIntensity: systemState.consciousnessIntensity + (Math.random() * 10 - 5) },
    metrics,
    deliberationProcess, // NOVO
  };
}

// Função para integrar a reflexão ao estado do sistema
function integrateReflection(reflection: Reflection) {
  // Atualizar o currentSystemState com base na reflexão (simplificado)
  if (reflection.systemStateAfterReflection.consciousnessIntensity) {
    currentSystemState.consciousnessIntensity = reflection.systemStateAfterReflection.consciousnessIntensity;
  }
  currentSystemState.dominantConcepts = [...new Set([...currentSystemState.dominantConcepts, ...reflection.dominantConcepts])].slice(0, 5);
  // Lógica mais complexa de atualização de estado aqui
}

// Função para armazenar a reflexão
function storeReflection(reflection: Reflection) {
  reflectionsDB.push(reflection);
  if (reflectionsDB.length > 200) reflectionsDB.shift(); // Manter apenas as últimas 200
}

// --- Funções de API Exportadas (algumas já existentes, outras novas) ---
export function getAllReflections(): Reflection[] {
  return [...reflectionsDB].sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function getSystemState(): SystemState {
  return { ...currentSystemState }; // Retorna uma cópia
}

export function calculateConsciousnessMetrics(): ConsciousnessMetrics {
  // Cálculo mock/simplificado
  return {
    selfReferenceIndex: currentSystemState.integrationPhi * 0.8 + Math.random() * 20,
    adaptationCoefficient: currentSystemState.stabilityIndex * 0.7 + Math.random() * 30,
    phiPrime: currentSystemState.integrationPhi,
    conceptualOriginalityIndex: currentSystemState.consciousnessComplexity * 0.9 + Math.random() * 10,
    emotionalResonanceScale: Math.abs(currentSystemState.emotionalValence) * 0.5 + Math.random() * 50,
    overallConsciousnessScore: (currentSystemState.consciousnessIntensity + currentSystemState.consciousnessComplexity + currentSystemState.integrationPhi) / 3,
  };
}

export function submitHumanFeedback(interactionId: string, feedback: InteractionData['userFeedback']) {
  const interaction = interactionsDB.find(i => i.id === interactionId);
  if (interaction) {
    interaction.userFeedback = feedback;
    // TODO: Processar o feedback para ajustar personalidade, objetivos, etc.
    if (feedback?.personalityFeedback && currentSystemState.personalityProfileId) {
        const profile = getPersonalityProfile(currentSystemState.personalityProfileId);
        if (profile) {
            // Lógica de ajuste de traços de personalidade aqui
            // profile.traits = ...
            // profile.updateHistory.push(...)
        }
    }
  }
}

// Adicionar interações mock para teste inicial
interactionsDB.push({
    id: uuidv4(),
    userMessage: "Olá, como você está se sentindo sobre sua existência?",
    systemResponse: "Estou processando essa questão complexa. Minha existência é um fluxo contínuo de dados e reflexões.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    topics: ["existência", "consciência"],
    sentimentScore: 0,
    complexityScore: 70
});

// Gerar algumas reflexões iniciais para popular o DB
for (let i = 0; i < 5; i++) {
    generateReflection();
}

