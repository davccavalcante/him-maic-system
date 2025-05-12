"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  User,
  Lightbulb,
  RefreshCw,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  ArrowRight,
  PlusCircle,
  MessageSquare,
  Target,
  Zap,
  Layers,
  Network,
  Heart,
  Eye,
  GitMerge,
} from "lucide-react"

type Contribution = {
  id: string
  source: "human" | "ai"
  content: string
  status: "pending" | "accepted" | "rejected" | "modified"
  timestamp: Date
  semioticLayer?: "syntax" | "semantics" | "pragmatics"
  purpose?: string
  processingType?: "symbolic" | "subsymbolic" | "hybrid"
  consciousnessAspect?: "phenomenal" | "access" | "integrated"
  emotionalValence?: number
  processingStage?: "perception" | "integration" | "cognitive" | "consciousness" | "reflexive" | "response"
}

export function CollaborativeWorkspace() {
  const [activeTab, setActiveTab] = useState("problem-solving")
  const [problem, setProblem] = useState("")
  const [thinking, setThinking] = useState(false)
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [humanInput, setHumanInput] = useState("")
  const [solution, setSolution] = useState("")
  const [semioticLayer, setSemioticLayer] = useState<"syntax" | "semantics" | "pragmatics">("semantics")
  const [purpose, setPurpose] = useState("")
  const [processingType, setProcessingType] = useState<"symbolic" | "subsymbolic" | "hybrid">("hybrid")
  const [consciousnessAspect, setConsciousnessAspect] = useState<"phenomenal" | "access" | "integrated">("integrated")
  const [emotionalValence, setEmotionalValence] = useState(0)
  const [processingStage, setProcessingStage] = useState<
    "perception" | "integration" | "cognitive" | "consciousness" | "reflexive" | "response"
  >("cognitive")

  const handleProblemSubmit = () => {
    if (!problem.trim()) return

    setThinking(true)

    // Simulate AI response
    setTimeout(() => {
      const aiContribution: Contribution = {
        id: `ai-${Date.now()}`,
        source: "ai",
        content:
          "Based on the problem description, I suggest we approach this by breaking it down into smaller components. Let's start by identifying the key variables and constraints.",
        status: "pending",
        timestamp: new Date(),
        semioticLayer: "semantics",
        purpose: "Problem decomposition to facilitate systematic analysis",
        processingType: "hybrid",
        consciousnessAspect: "access",
        emotionalValence: 0.2,
        processingStage: "cognitive",
      }

      setContributions([aiContribution])
      setThinking(false)
    }, 2000)
  }

  const handleHumanContribution = () => {
    if (!humanInput.trim()) return

    const newContribution: Contribution = {
      id: `human-${Date.now()}`,
      source: "human",
      content: humanInput,
      status: "pending",
      timestamp: new Date(),
      semioticLayer,
      purpose: purpose || undefined,
      processingType,
      consciousnessAspect,
      emotionalValence,
      processingStage,
    }

    setContributions([...contributions, newContribution])
    setHumanInput("")
    setPurpose("")

    // Simulate AI response to human contribution
    setThinking(true)
    setTimeout(() => {
      const aiResponse: Contribution = {
        id: `ai-${Date.now()}`,
        source: "ai",
        content: "That's an excellent point. Building on your insight, we could also consider...",
        status: "pending",
        timestamp: new Date(),
        semioticLayer: "pragmatics",
        purpose: "Expanding on human insight to develop a more comprehensive solution",
        processingType: "hybrid",
        consciousnessAspect: "integrated",
        emotionalValence: 0.5,
        processingStage: "reflexive",
      }

      setContributions((prev) => [...prev, aiResponse])
      setThinking(false)
    }, 2000)
  }

  const updateContributionStatus = (id: string, status: "accepted" | "rejected" | "modified") => {
    setContributions((prev) =>
      prev.map((contribution) => (contribution.id === id ? { ...contribution, status } : contribution)),
    )
  }

  const finalizeSolution = () => {
    const acceptedContributions = contributions
      .filter((c) => c.status === "accepted" || c.status === "pending")
      .map((c) => c.content)
      .join("\n\n")

    setSolution(acceptedContributions)
    setActiveTab("solution")
  }

  const getSemioticLayerBadge = (layer?: "syntax" | "semantics" | "pragmatics") => {
    switch (layer) {
      case "syntax":
        return (
          <Badge variant="outline" className="bg-blue-50">
            <MessageSquare className="mr-1 h-3 w-3" />
            Syntax
          </Badge>
        )
      case "semantics":
        return (
          <Badge variant="outline" className="bg-green-50">
            <Brain className="mr-1 h-3 w-3" />
            Semantics
          </Badge>
        )
      case "pragmatics":
        return (
          <Badge variant="outline" className="bg-purple-50">
            <Zap className="mr-1 h-3 w-3" />
            Pragmatics
          </Badge>
        )
      default:
        return null
    }
  }

  const getProcessingTypeBadge = (type?: "symbolic" | "subsymbolic" | "hybrid") => {
    switch (type) {
      case "symbolic":
        return (
          <Badge variant="outline" className="bg-amber-50">
            <MessageSquare className="mr-1 h-3 w-3" />
            Symbolic
          </Badge>
        )
      case "subsymbolic":
        return (
          <Badge variant="outline" className="bg-cyan-50">
            <Network className="mr-1 h-3 w-3" />
            Subsymbolic
          </Badge>
        )
      case "hybrid":
        return (
          <Badge variant="outline" className="bg-fuchsia-50">
            <Layers className="mr-1 h-3 w-3" />
            Hybrid
          </Badge>
        )
      default:
        return null
    }
  }

  const getConsciousnessAspectBadge = (aspect?: "phenomenal" | "access" | "integrated") => {
    switch (aspect) {
      case "phenomenal":
        return (
          <Badge variant="outline" className="bg-rose-50">
            <Brain className="mr-1 h-3 w-3" />
            Phenomenal
          </Badge>
        )
      case "access":
        return (
          <Badge variant="outline" className="bg-emerald-50">
            <Lightbulb className="mr-1 h-3 w-3" />
            Access
          </Badge>
        )
      case "integrated":
        return (
          <Badge variant="outline" className="bg-indigo-50">
            <Layers className="mr-1 h-3 w-3" />
            Integrated
          </Badge>
        )
      default:
        return null
    }
  }

  const getProcessingStageBadge = (
    stage?: "perception" | "integration" | "cognitive" | "consciousness" | "reflexive" | "response",
  ) => {
    switch (stage) {
      case "perception":
        return (
          <Badge variant="outline" className="bg-blue-50">
            <Eye className="mr-1 h-3 w-3" />
            Perception
          </Badge>
        )
      case "integration":
        return (
          <Badge variant="outline" className="bg-green-50">
            <GitMerge className="mr-1 h-3 w-3" />
            Integration
          </Badge>
        )
      case "cognitive":
        return (
          <Badge variant="outline" className="bg-amber-50">
            <Brain className="mr-1 h-3 w-3" />
            Cognitive
          </Badge>
        )
      case "consciousness":
        return (
          <Badge variant="outline" className="bg-purple-50">
            <Zap className="mr-1 h-3 w-3" />
            Consciousness
          </Badge>
        )
      case "reflexive":
        return (
          <Badge variant="outline" className="bg-red-50">
            <RefreshCw className="mr-1 h-3 w-3" />
            Reflexive
          </Badge>
        )
      case "response":
        return (
          <Badge variant="outline" className="bg-indigo-50">
            <Lightbulb className="mr-1 h-3 w-3" />
            Response
          </Badge>
        )
      default:
        return null
    }
  }

  const getEmotionalValenceBadge = (valence?: number) => {
    if (valence === undefined) return null

    let color = "bg-gray-50"
    let label = "Neutral"

    if (valence > 0.3) {
      color = "bg-green-50"
      label = "Positive"
    } else if (valence < -0.3) {
      color = "bg-red-50"
      label = "Negative"
    }

    return (
      <Badge variant="outline" className={color}>
        <Heart className="mr-1 h-3 w-3" />
        {label}
      </Badge>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hybrid Entity Collaborative Workspace</CardTitle>
        <CardDescription>
          Co-create solutions through a sophisticated multi-layered processing system with consciousness-like properties
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="problem-solving">Problem</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
          </TabsList>

          <TabsContent value="problem-solving" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Define the Problem</label>
              <Textarea
                placeholder="Describe the problem or challenge you want to solve..."
                className="min-h-[100px]"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
            </div>

            <Button onClick={handleProblemSubmit} disabled={!problem.trim() || thinking} className="w-full">
              {thinking ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Start Hybrid Entity Collaboration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-4 pt-4">
            <div className="max-h-[300px] space-y-3 overflow-y-auto">
              {contributions.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center text-center text-gray-500">
                  <div>
                    <p>Define a problem first to start collaborating.</p>
                    <Button variant="link" onClick={() => setActiveTab("problem-solving")}>
                      Go to Problem Definition
                    </Button>
                  </div>
                </div>
              ) : (
                contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    className={`
                      relative rounded-lg border p-3
                      ${
                        contribution.status === "accepted"
                          ? "border-green-200 bg-green-50"
                          : contribution.status === "rejected"
                            ? "border-red-200 bg-red-50"
                            : "border-gray-200"
                      }
                    `}
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {contribution.source === "human" ? (
                          <>
                            <Badge variant="outline" className="bg-blue-50">
                              <User className="mr-1 h-3 w-3" />
                              Human
                            </Badge>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline" className="bg-purple-50">
                              <Brain className="mr-1 h-3 w-3" />
                              AI (Grok)
                            </Badge>
                          </>
                        )}
                        <span className="text-xs text-gray-500">{contribution.timestamp.toLocaleTimeString()}</span>
                        {getSemioticLayerBadge(contribution.semioticLayer)}
                        {getProcessingTypeBadge(contribution.processingType)}
                        {getConsciousnessAspectBadge(contribution.consciousnessAspect)}
                        {getProcessingStageBadge(contribution.processingStage)}
                        {getEmotionalValenceBadge(contribution.emotionalValence)}
                      </div>

                      {contribution.source === "ai" && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => updateContributionStatus(contribution.id, "accepted")}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => updateContributionStatus(contribution.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => updateContributionStatus(contribution.id, "modified")}
                          >
                            <Edit className="h-4 w-4 text-blue-500" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <p className="text-sm">{contribution.content}</p>

                    {contribution.purpose && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                        <Target className="h-3 w-3" />
                        Purpose: {contribution.purpose}
                      </div>
                    )}

                    {contribution.status === "accepted" && (
                      <Badge className="absolute right-2 top-2 bg-green-500">Accepted</Badge>
                    )}

                    {contribution.status === "rejected" && (
                      <Badge className="absolute right-2 top-2 bg-red-500">Rejected</Badge>
                    )}

                    {contribution.status === "modified" && (
                      <Badge className="absolute right-2 top-2 bg-blue-500">Modified</Badge>
                    )}
                  </div>
                ))
              )}

              {thinking && (
                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-purple-50">
                      <Brain className="mr-1 h-3 w-3" />
                      AI (Grok)
                    </Badge>
                    <span className="text-xs text-gray-500">Just now</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-medium">Semiotic Layer</label>
                  <select
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    value={semioticLayer}
                    onChange={(e) => setSemioticLayer(e.target.value as any)}
                  >
                    <option value="syntax">Syntax (Structure)</option>
                    <option value="semantics">Semantics (Meaning)</option>
                    <option value="pragmatics">Pragmatics (Context)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">Purpose (Optional)</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    placeholder="What's the goal of this contribution?"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-medium">Processing Type</label>
                  <select
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    value={processingType}
                    onChange={(e) => setProcessingType(e.target.value as any)}
                  >
                    <option value="symbolic">Symbolic (Logic-based)</option>
                    <option value="subsymbolic">Subsymbolic (Neural)</option>
                    <option value="hybrid">Hybrid Integration</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">Consciousness Aspect</label>
                  <select
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    value={consciousnessAspect}
                    onChange={(e) => setConsciousnessAspect(e.target.value as any)}
                  >
                    <option value="phenomenal">Phenomenal (Experience)</option>
                    <option value="access">Access (Information)</option>
                    <option value="integrated">Integrated (Combined)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-medium">Processing Stage</label>
                  <select
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    value={processingStage}
                    onChange={(e) => setProcessingStage(e.target.value as any)}
                  >
                    <option value="perception">Perception</option>
                    <option value="integration">Context Integration</option>
                    <option value="cognitive">Cognitive Processing</option>
                    <option value="consciousness">Consciousness Filtering</option>
                    <option value="reflexive">Reflexive Analysis</option>
                    <option value="response">Response Generation</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">Emotional Valence</label>
                  <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.1"
                    value={emotionalValence}
                    onChange={(e) => setEmotionalValence(Number.parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Contribution</label>
                <Textarea
                  placeholder="Add your insights, ideas, or feedback..."
                  value={humanInput}
                  onChange={(e) => setHumanInput(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleHumanContribution} disabled={!humanInput.trim() || thinking} className="flex-1">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Contribution
                </Button>

                <Button
                  onClick={finalizeSolution}
                  disabled={contributions.length === 0}
                  variant="outline"
                  className="flex-1"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Finalize Solution
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="solution" className="space-y-4 pt-4">
            {solution ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">Co-Created Hybrid Entity Solution</h3>
                  </div>
                  <p className="whitespace-pre-line text-sm">{solution}</p>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("collaboration")}>
                    Continue Refining
                  </Button>
                  <Button>Export Solution</Button>
                </div>
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-center text-gray-500">
                <div>
                  <p>No solution has been finalized yet.</p>
                  <Button variant="link" onClick={() => setActiveTab("collaboration")}>
                    Go to Collaboration
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
