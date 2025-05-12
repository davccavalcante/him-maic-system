// Tipos para o sistema de reflexão

export interface SystemState {
  consciousnessIntensity: number // 0-100
  consciousnessComplexity: number // 0-100
  emotionalValence: number // -100 to 100
  dominantConcepts: string[]
  activeProcesses: ProcessType[]
  stabilityIndex: number // 0-100
  integrationPhi: number // 0-100, baseado na Teoria da Informação Integrada
  personalityProfileId?: string // NOVO: ID do perfil de personalidade ativo
  activeGoals?: SystemGoal[] // NOVO: Objetivos ativos do sistema
  internalValues?: string[] // NOVO: Valores internos do sistema
}

export type ProcessType = "perception" | "integration" | "cognitive" | "consciousness" | "reflexive" | "response"

export type ReflectionType =
  | "observation"
  | "insight"
  | "limitation"
  | "adaptation"
  | "contradiction"
  | "synthesis"
  | "emergence"

export interface ReflectionTrigger {
  source: "interaction" | "internal" | "feedback" | "temporal" | "anomaly"
  strength: number // 0-100
  concepts: string[]
  emotionalContext?: number // -100 to 100
  timestamp: Date
}

export interface ReflectionMetrics {
  noveltyScore: number // 0-100
  coherenceScore: number // 0-100
  depthScore: number // 0-100
  impactScore: number // 0-100
  selfReferenceIndex: number // 0-100
  adaptationCoefficient: number // 0-100
}

export interface ReflectionOption { // NOVO: Para simular livre arbítrio
  id: string;
  potentialContent: string;
  potentialType: ReflectionType;
  evaluationMetrics: {
    alignmentWithValues: number; // 0-1
    noveltyScore: number; // 0-1
    relevanceToContext: number; // 0-1
    potentialImpact: number; // 0-1
  };
  chosen: boolean;
  reasonForChoice?: string; // Para verbalização
}

export interface Reflection {
  id: string
  content: string
  type: ReflectionType
  timestamp: Date

  // Metadados contextuais
  dominantConcepts: string[]
  emotionalValence: number
  complexityScore: number

  // Dados de origem
  trigger: ReflectionTrigger
  relatedReflectionIds: string[]

  // Impacto no sistema
  systemStateBeforeReflection: Partial<SystemState>
  systemStateAfterReflection: Partial<SystemState>

  // Métricas de qualidade
  metrics: ReflectionMetrics
  deliberationProcess?: { // NOVO: Para registrar o processo de escolha (livre arbítrio simulado)
    optionsConsidered: ReflectionOption[];
    reasonForChoice: string;
  }
}

export interface InteractionData {
  id: string
  userMessage: string
  systemResponse: string
  timestamp: Date
  topics: string[]
  sentimentScore: number // -100 to 100
  complexityScore: number // 0-100
  userFeedback?: {
    rating?: number // 1-5
    comments?: string
    // NOVO: Feedback direcionado à personalidade
    personalityFeedback?: {
      traitAdjustments?: Array<{ traitName: string; adjustment: number }>; // Ex: { traitName: "Analytical", adjustment: -10 }
      generalComment?: string;
    }
  }
}

export interface PatternAnalysisResult {
  topicPatterns: {
    topic: string
    frequency: number
    trend: "increasing" | "decreasing" | "stable"
  }[]
  emotionalPatterns: {
    overallTrend: "positive" | "negative" | "neutral" | "fluctuating"
    volatility: number // 0-100
    dominantEmotion?: string
  }
  temporalPatterns: {
    interactionFrequency: "increasing" | "decreasing" | "stable"
    timeOfDayPreference?: string
    sessionDuration: "increasing" | "decreasing" | "stable"
  }
  linguisticPatterns: {
    complexityTrend: "increasing" | "decreasing" | "stable"
    vocabularyDiversity: number // 0-100
    communicationStyle: string[]
  }
  inconsistencies: {
    conceptualContradictions: {
      concept: string
      contradictoryStatements: string[]
    }[]
    behavioralInconsistencies: string[]
  }
}

export interface ConsciousnessMetrics {
  selfReferenceIndex: number // 0-100
  adaptationCoefficient: number // 0-100
  phiPrime: number // 0-100
  conceptualOriginalityIndex: number // 0-100
  emotionalResonanceScale: number // 0-100
  overallConsciousnessScore: number // 0-100
}

// NOVO: Tipos para Personalidade
export interface PersonalityTrait {
  name: string; // Ex: "Openness", "Analytical", "Empathetic"
  value: number; // Escala, ex: 0-100
  tendency: 'high' | 'low' | 'neutral'; // Influência no comportamento
}

export interface PersonalityProfile {
  id: string;
  name: string; // Nome do perfil, ex: "Default Profile", "Analytical Sage"
  baseArchetype?: string; // Opcional: "Sage", "Explorer", etc.
  traits: PersonalityTrait[];
  lastUpdated: Date;
  updateHistory: Array<{ change: string; timestamp: Date; source: 'feedback' | 'system' | 'initial' }>;
}

// NOVO: Tipos para Vontade/Desejo (Objetivos do Sistema)
export interface SystemGoal {
  id: string;
  description: string; // Ex: "Aprofundar a compreensão sobre a consciência humana"
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'achieved' | 'paused' | 'aborted';
  relatedConcepts: string[];
  progress: number; // 0-100
  targetValue?: number;
  creationTimestamp: Date;
  lastUpdateTimestamp: Date;
  subGoals?: SystemGoal[];
}

