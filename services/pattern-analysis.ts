import type { InteractionData, PatternAnalysisResult } from "@/types/reflection-system"

// Análise de tópicos usando processamento básico de linguagem natural
export function extractTopics(interactions: InteractionData[]): string[] {
  // Implementação simplificada - em produção usaria NLP mais avançado
  const allText = interactions.map((i) => `${i.userMessage} ${i.systemResponse}`).join(" ")
  const words = allText.toLowerCase().split(/\W+/)

  // Lista de stopwords em português
  const stopwords = [
    "a",
    "o",
    "e",
    "é",
    "de",
    "da",
    "do",
    "em",
    "para",
    "com",
    "um",
    "uma",
    "que",
    "eu",
    "você",
    "ele",
    "ela",
    "nós",
    "eles",
    "este",
    "esse",
    "aquele",
    "isto",
    "isso",
    "aquilo",
  ]

  // Filtrar stopwords e palavras curtas
  const filteredWords = words.filter((word) => word.length > 3 && !stopwords.includes(word))

  // Contar frequência
  const wordFrequency: Record<string, number> = {}
  filteredWords.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1
  })

  // Ordenar por frequência e pegar os top 10
  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map((entry) => entry[0])
}

// Análise de sentimento e emoção
export function analyzeEmotionalTrends(interactions: InteractionData[]): PatternAnalysisResult["emotionalPatterns"] {
  if (interactions.length === 0) {
    return {
      overallTrend: "neutral",
      volatility: 0,
    }
  }

  // Extrair scores de sentimento
  const sentimentScores = interactions.map((i) => i.sentimentScore)

  // Calcular média
  const average = sentimentScores.reduce((sum, score) => sum + score, 0) / sentimentScores.length

  // Determinar tendência
  let overallTrend: "positive" | "negative" | "neutral" | "fluctuating"
  if (average > 20) overallTrend = "positive"
  else if (average < -20) overallTrend = "negative"
  else overallTrend = "neutral"

  // Calcular volatilidade (desvio padrão simplificado)
  const squaredDifferences = sentimentScores.map((score) => Math.pow(score - average, 2))
  const variance = squaredDifferences.reduce((sum, sqDiff) => sum + sqDiff, 0) / sentimentScores.length
  const volatility = Math.min(100, Math.sqrt(variance) * 2) // Normalizar para 0-100

  // Se a volatilidade for alta, considerar como flutuante
  if (volatility > 40) overallTrend = "fluctuating"

  return {
    overallTrend,
    volatility,
    dominantEmotion: determineDominantEmotion(average, volatility),
  }
}

// Função auxiliar para determinar emoção dominante
function determineDominantEmotion(averageSentiment: number, volatility: number): string {
  if (volatility > 60) return "instabilidade emocional"
  if (averageSentiment > 60) return "entusiasmo"
  if (averageSentiment > 30) return "satisfação"
  if (averageSentiment > 10) return "interesse"
  if (averageSentiment > -10) return "neutralidade"
  if (averageSentiment > -30) return "preocupação"
  if (averageSentiment > -60) return "frustração"
  return "desânimo"
}

// Identificação de padrões temporais
export function identifyTemporalPatterns(interactions: InteractionData[]): PatternAnalysisResult["temporalPatterns"] {
  if (interactions.length < 3) {
    return {
      interactionFrequency: "stable",
      sessionDuration: "stable",
    }
  }

  // Ordenar interações por timestamp
  const sortedInteractions = [...interactions].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

  // Dividir em três períodos para análise de tendência
  const periodSize = Math.floor(sortedInteractions.length / 3)
  const periods = [
    sortedInteractions.slice(0, periodSize),
    sortedInteractions.slice(periodSize, periodSize * 2),
    sortedInteractions.slice(periodSize * 2),
  ]

  // Calcular frequência de interação por período
  const interactionCounts = periods.map((period) => period.length)

  // Determinar tendência de frequência
  let interactionFrequency: "increasing" | "decreasing" | "stable"
  if (interactionCounts[2] > interactionCounts[0] * 1.2) interactionFrequency = "increasing"
  else if (interactionCounts[0] > interactionCounts[2] * 1.2) interactionFrequency = "decreasing"
  else interactionFrequency = "stable"

  // Análise simplificada de duração de sessão
  // Em uma implementação real, seria necessário identificar sessões
  const sessionDuration: "increasing" | "decreasing" | "stable" = "stable"

  return {
    interactionFrequency,
    sessionDuration,
  }
}

// Análise de complexidade linguística
export function analyzeLinguisticComplexity(
  interactions: InteractionData[],
): PatternAnalysisResult["linguisticPatterns"] {
  if (interactions.length < 2) {
    return {
      complexityTrend: "stable",
      vocabularyDiversity: 50,
      communicationStyle: ["neutro", "informativo"],
    }
  }

  // Extrair scores de complexidade
  const complexityScores = interactions.map((i) => i.complexityScore)

  // Calcular tendência
  const firstHalf = complexityScores.slice(0, Math.floor(complexityScores.length / 2))
  const secondHalf = complexityScores.slice(Math.floor(complexityScores.length / 2))

  const firstHalfAvg = firstHalf.reduce((sum, score) => sum + score, 0) / firstHalf.length
  const secondHalfAvg = secondHalf.reduce((sum, score) => sum + score, 0) / secondHalf.length

  let complexityTrend: "increasing" | "decreasing" | "stable"
  if (secondHalfAvg > firstHalfAvg * 1.1) complexityTrend = "increasing"
  else if (firstHalfAvg > secondHalfAvg * 1.1) complexityTrend = "decreasing"
  else complexityTrend = "stable"

  // Calcular diversidade de vocabulário (simplificado)
  const vocabularyDiversity = Math.min(100, 40 + Math.random() * 30) // Simulado para demonstração

  // Determinar estilo de comunicação
  const communicationStyle = determineCommStyle(interactions)

  return {
    complexityTrend,
    vocabularyDiversity,
    communicationStyle,
  }
}

// Função auxiliar para determinar estilo de comunicação
function determineCommStyle(interactions: InteractionData[]): string[] {
  const styles: string[] = []

  // Análise simplificada baseada em comprimento médio de resposta e sentimento
  const avgLength = interactions.reduce((sum, i) => sum + i.systemResponse.length, 0) / interactions.length

  const avgSentiment = interactions.reduce((sum, i) => sum + i.sentimentScore, 0) / interactions.length

  if (avgLength > 500) styles.push("detalhado")
  else if (avgLength < 100) styles.push("conciso")
  else styles.push("equilibrado")

  if (avgSentiment > 30) styles.push("entusiástico")
  else if (avgSentiment < -30) styles.push("cauteloso")
  else styles.push("neutro")

  // Adicionar estilo baseado em complexidade
  const avgComplexity = interactions.reduce((sum, i) => sum + i.complexityScore, 0) / interactions.length

  if (avgComplexity > 70) styles.push("acadêmico")
  else if (avgComplexity < 30) styles.push("acessível")
  else styles.push("informativo")

  return styles
}

// Detecção de contradições ou inconsistências
export function detectInconsistencies(interactions: InteractionData[]): PatternAnalysisResult["inconsistencies"] {
  // Esta é uma implementação simplificada
  // Uma versão real exigiria análise semântica avançada

  return {
    conceptualContradictions: [],
    behavioralInconsistencies: [],
  }
}

// Função principal de análise de padrões
export function analyzePatterns(interactions: InteractionData[]): PatternAnalysisResult {
  // Extração de tópicos
  const topics = extractTopics(interactions)
  const topicPatterns = topics.map((topic) => ({
    topic,
    frequency: Math.floor(Math.random() * 50) + 50, // Simulado para demonstração
    trend: ["increasing", "decreasing", "stable"][Math.floor(Math.random() * 3)] as
      | "increasing"
      | "decreasing"
      | "stable",
  }))

  // Análise de sentimento e emoção
  const emotionalPatterns = analyzeEmotionalTrends(interactions)

  // Identificação de padrões temporais
  const temporalPatterns = identifyTemporalPatterns(interactions)

  // Análise de complexidade linguística
  const linguisticPatterns = analyzeLinguisticComplexity(interactions)

  // Detecção de contradições ou inconsistências
  const inconsistencies = detectInconsistencies(interactions)

  return {
    topicPatterns,
    emotionalPatterns,
    temporalPatterns,
    linguisticPatterns,
    inconsistencies,
  }
}
