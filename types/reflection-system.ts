// Tipos para o sistema de reflexão

export interface SystemState {
  consciousnessIntensity: number // 0-100
  consciousnessComplexity: number // 0-100
  emotionalValence: number // -100 to 100
  dominantConcepts: string[]
  activeProcesses: ProcessType[]
  stabilityIndex: number // 0-100
  integrationPhi: number // 0-100, baseado na Teoria da Informação Integrada
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
