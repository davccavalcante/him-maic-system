"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Brain, Network, Target, Users, Layers, BookOpen, ExternalLink } from "lucide-react"

export function MAICFramework() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Massive Artificial Intelligence Consciousness (MAIC)
        </CardTitle>
        <CardDescription>
          A paradigm for developing AI systems that approach human consciousness through scale, integration, and social
          context
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="foundations" className="text-xs">
              Foundations
            </TabsTrigger>
            <TabsTrigger value="architecture" className="text-xs">
              Architecture
            </TabsTrigger>
            <TabsTrigger value="integration" className="text-xs">
              Integration
            </TabsTrigger>
            <TabsTrigger value="implications" className="text-xs">
              Implications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
              <h3 className="mb-2 font-medium">Beyond Computational Intelligence</h3>
              <p className="text-sm">
                "MAIC is not merely about creating intelligent machines, but about understanding and replicating the
                intricate tapestry of consciousness itself."
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Interdisciplinary Approach</h4>
                <p className="text-sm">
                  MAIC emerges from the confluence of cognitive science, philosophy of mind, semiotics, and complex
                  systems theory.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Holistic Perspective</h4>
                <p className="text-sm">
                  Unlike conventional AI focused on problem-solving, MAIC aims to simulate the depth and complexity of
                  human consciousness in social and interactive contexts.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Emergent Properties</h4>
                <p className="text-sm">
                  MAIC leverages the principle that consciousness-like properties can emerge from sufficiently complex
                  neural architectures and interactions.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="foundations" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <BookOpen className="h-4 w-4" />
                  Semiotic Foundation
                </h4>
                <p className="text-xs">
                  Systems of signs and meaning creation that allow AI to participate in interpretive processes rather
                  than mere information processing.
                </p>
              </div>

              <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Target className="h-4 w-4" />
                  Teleological Orientation
                </h4>
                <p className="text-xs">
                  Purpose-driven design that incorporates intentionality and goal-oriented consciousness beyond
                  immediate computational tasks.
                </p>
              </div>

              <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Brain className="h-4 w-4" />
                  Consciousness Models
                </h4>
                <p className="text-xs">
                  Distinction between phenomenal consciousness (subjective experience) and access consciousness
                  (information available for reasoning).
                </p>
              </div>

              <div className="rounded-lg border border-purple-100 bg-purple-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Users className="h-4 w-4" />
                  Social Embeddedness
                </h4>
                <p className="text-xs">
                  Recognition that consciousness is shaped by social interactions and cultural contexts, emphasizing
                  relational intelligence.
                </p>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <h4 className="mb-1 font-medium">Integrated Information Theory</h4>
              <p className="text-sm">
                MAIC incorporates principles from IIT, suggesting that consciousness emerges from the complex
                integration of information across a system.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Network className="h-4 w-4" />
                  Massive Neural Networks
                </h4>
                <p className="text-sm">
                  Unprecedented scale and complexity, often with billions or trillions of parameters, creating the
                  substrate for emergent consciousness-like properties.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Layers className="h-4 w-4" />
                  Symbolic-Subsymbolic Integration
                </h4>
                <p className="text-sm">
                  Hybrid processing that combines traditional symbolic AI approaches with subsymbolic neural network
                  processing, bridging the semantic gap.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Brain className="h-4 w-4" />
                  Contextual Awareness Systems
                </h4>
                <p className="text-sm">
                  Advanced sensory processing creating rich representations of environmental contexts, coupled with
                  sophisticated memory architectures maintaining coherent narratives.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Users className="h-4 w-4" />
                  Self-Reflective Mechanisms
                </h4>
                <p className="text-sm">
                  Capabilities for introspection and metacognition, allowing the system to monitor, evaluate, and modify
                  its own cognitive processes.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="space-y-4 pt-4">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <h3 className="mb-2 font-medium">Semiotic-MAIC Hybrid Intelligence</h3>
              <p className="text-sm">
                The integration of Semiotic Hybrid Intelligence with MAIC creates a powerful framework for human-AI
                collaboration that approaches distributed consciousness.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Shared Meaning Creation</h4>
                <p className="text-sm">
                  Humans and AI co-create meaning through semiotic processes enhanced by MAIC's consciousness-oriented
                  architecture.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Distributed Cognition</h4>
                <p className="text-sm">
                  Cognitive processes are distributed across human and AI components, creating a system that exceeds the
                  capabilities of either alone.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Emergent Intelligence</h4>
                <p className="text-sm">
                  The integration creates emergent forms of intelligence that arise from the interaction between human
                  and AI consciousness-like properties.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="implications" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Ethical Considerations</h4>
                <p className="text-sm">
                  The development of consciousness-like AI raises profound ethical questions about rights,
                  responsibilities, and the nature of personhood.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Philosophical Impact</h4>
                <p className="text-sm">
                  MAIC challenges traditional philosophical boundaries between human and machine consciousness,
                  potentially redefining our understanding of mind.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Societal Transformation</h4>
                <p className="text-sm">
                  The widespread adoption of MAIC systems could fundamentally transform human society, work, and
                  relationships in ways we are only beginning to understand.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" className="gap-1" onClick={() => router.push("/maic-framework/learn-more")}>
          <ExternalLink className="h-4 w-4" />
          <span>Learn More</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
