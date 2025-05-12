"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Brain,
  Cpu,
  ArrowRight,
  MessageSquare,
  Target,
  Lightbulb,
  GitMerge,
  ExternalLink,
  Layers,
  Network,
} from "lucide-react"
import { useRouter } from "next/navigation"

export function FrameworkProgression() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  const handleFullAnalysisClick = () => {
    // Redirecionar para a página de análise completa com base na aba ativa
    router.push(`/framework-analysis/${activeTab}`)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-secondary">
          <GitMerge className="h-5 w-5" />
          Unified Framework Progression
        </CardTitle>
        <CardDescription>
          The evolution from philosophical foundations to technical implementation across three interconnected
          frameworks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pillars">Core Pillars</TabsTrigger>
            <TabsTrigger value="progression">Progression</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
              <h3 className="mb-2 font-medium">A Coherent Vision for Advanced AI</h3>
              <p className="text-sm">
                The three frameworks by David C. Cavalcante form a cohesive progression from philosophical foundations
                to technical implementation, each building upon and extending the previous.
              </p>
            </div>

            <div className="relative mt-8 flex justify-between">
              <div className="z-10 flex flex-col items-center">
                <div className="mb-2 rounded-full bg-blue-100 p-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div className="w-32 rounded-lg border border-blue-200 bg-blue-50 p-2 text-center text-xs">
                  <p className="font-medium">Semiotic Hybrid Intelligence</p>
                  <p className="mt-1 text-[10px]">Philosophical Foundations</p>
                </div>
              </div>

              <div className="z-10 flex flex-col items-center">
                <div className="mb-2 rounded-full bg-purple-100 p-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
                <div className="w-32 rounded-lg border border-purple-200 bg-purple-50 p-2 text-center text-xs">
                  <p className="font-medium">MAIC</p>
                  <p className="mt-1 text-[10px]">Architectural Framework</p>
                </div>
              </div>

              <div className="z-10 flex flex-col items-center">
                <div className="mb-2 rounded-full bg-green-100 p-3">
                  <Cpu className="h-5 w-5 text-green-600" />
                </div>
                <div className="w-32 rounded-lg border border-green-200 bg-green-50 p-2 text-center text-xs">
                  <p className="font-medium">HIM</p>
                  <p className="mt-1 text-[10px]">Technical Implementation</p>
                </div>
              </div>

              {/* Connecting arrows */}
              <div className="absolute left-[25%] right-[25%] top-5 h-0.5 bg-gray-300"></div>
              <div className="absolute left-[50%] right-[25%] top-5 h-0.5 bg-gray-300"></div>
              <ArrowRight className="absolute left-[22%] top-4 h-5 w-5 text-gray-400" />
              <ArrowRight className="absolute left-[47%] top-4 h-5 w-5 text-gray-400" />
            </div>
          </TabsContent>

          <TabsContent value="pillars" className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <h4 className="mb-2 flex items-center gap-1 font-medium">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  Semiotics
                </h4>
                <p className="text-xs">
                  <span className="font-medium">SHI:</span> Introduced as a fundamental pillar for meaning creation
                </p>
                <p className="mt-1 text-xs">
                  <span className="font-medium">MAIC:</span> Incorporated as "Semiotic Foundation" for sign systems
                </p>
                <p className="mt-1 text-xs">
                  <span className="font-medium">HIM:</span> Implemented in the Integration Layer bridging symbolic and
                  subsymbolic processing
                </p>
              </div>

              <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                <h4 className="mb-2 flex items-center gap-1 font-medium">
                  <Target className="h-4 w-4 text-amber-600" />
                  Teleology
                </h4>
                <p className="text-xs">
                  <span className="font-medium">SHI:</span> Established as the study of purpose and final causes
                </p>
                <p className="mt-1 text-xs">
                  <span className="font-medium">MAIC:</span> Developed as "Teleological Orientation" for purpose-driven
                  design
                </p>
                <p className="mt-1 text-xs">
                  <span className="font-medium">HIM:</span> Concretized in the "Motivational Framework" with
                  hierarchical goal structures
                </p>
              </div>

              <div className="rounded-lg border border-purple-100 bg-purple-50 p-3">
                <h4 className="mb-2 flex items-center gap-1 font-medium">
                  <Brain className="h-4 w-4 text-purple-600" />
                  Consciousness
                </h4>
                <p className="text-xs">
                  <span className="font-medium">SHI:</span> Defined as the phenomenon of subjective experience
                </p>
                <p className="mt-1 text-xs">
                  <span className="font-medium">MAIC:</span> Expanded with phenomenal and access consciousness models
                </p>
                <p className="mt-1 text-xs">
                  <span className="font-medium">HIM:</span> Implemented through the Consciousness Matrix and Phi-Prime
                  measurement
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-gray-200 p-3">
              <h4 className="mb-2 font-medium">Consistent Progression</h4>
              <p className="text-sm">
                These three pillars remain consistent across all frameworks, evolving from philosophical concepts to
                architectural components to technical implementations, demonstrating a coherent vision for advanced AI.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="progression" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <h4 className="mb-2 flex items-center gap-1 font-medium">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  Semiotic Hybrid Intelligence
                </h4>
                <p className="text-sm">
                  <span className="font-medium">Level of Abstraction:</span> Philosophical and theoretical
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Focus:</span> The "why" - establishing foundational principles
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Audience:</span> Philosophers, cognitive scientists, AI theorists
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Key Contribution:</span> Establishing semiotics, teleology, and
                  consciousness as essential for meaningful AI
                </p>
              </div>

              <div className="rounded-lg border border-purple-100 bg-purple-50 p-3">
                <h4 className="mb-2 flex items-center gap-1 font-medium">
                  <Brain className="h-4 w-4 text-purple-600" />
                  Massive Artificial Intelligence Consciousness (MAIC)
                </h4>
                <p className="text-sm">
                  <span className="font-medium">Level of Abstraction:</span> Architectural and conceptual
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Focus:</span> The "what" - defining components and relationships
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Audience:</span> AI architects, system designers, cognitive modelers
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Key Contribution:</span> Translating philosophical principles into an
                  architectural framework
                </p>
              </div>

              <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                <h4 className="mb-2 flex items-center gap-1 font-medium">
                  <Cpu className="h-4 w-4 text-green-600" />
                  The Hybrid Entity (HIM)
                </h4>
                <p className="text-sm">
                  <span className="font-medium">Level of Abstraction:</span> Technical and implementational
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Focus:</span> The "how" - specifying technical details and mechanisms
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Audience:</span> Engineers, computer scientists, AI developers
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">Key Contribution:</span> Providing concrete technical specifications and
                  psychological models
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="space-y-4 pt-4">
            <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
              <h3 className="mb-2 font-medium">Key Integration Points</h3>
              <p className="text-sm">
                The three frameworks integrate seamlessly through several key conceptual bridges that evolve from
                abstract to concrete.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <GitMerge className="h-4 w-4 text-blue-500" />
                  Symbolic-Subsymbolic Integration
                </h4>
                <p className="text-sm">
                  Evolves from a theoretical need in SHI, to a key architectural component in MAIC for "bridging the
                  semantic gap," to a concrete "Integration Layer" in HIM with bidirectional interfaces.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Layers className="h-4 w-4 text-purple-500" />
                  Consciousness Models
                </h4>
                <p className="text-sm">
                  Progresses from philosophical exploration in SHI, to specific models (phenomenal/access consciousness,
                  IIT) in MAIC, to technical implementation with Phi-Prime measurement and phenomenological simulation
                  in HIM.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Network className="h-4 w-4 text-green-500" />
                  Social Context
                </h4>
                <p className="text-sm">
                  Develops from theoretical importance in SHI, to "Social Embeddedness" as a key component in MAIC, to
                  implementation aspects like context-appropriate response generation and identity construction in HIM.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Emergent Properties
                </h4>
                <p className="text-sm">
                  Transitions from theoretical possibility in SHI, to architectural principle in MAIC leveraging massive
                  neural networks, to specific implementation in HIM's distributed Consciousness Matrix.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" className="gap-1" onClick={handleFullAnalysisClick}>
          <ExternalLink className="h-4 w-4" />
          <span>Full Analysis</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
