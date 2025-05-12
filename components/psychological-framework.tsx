"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Brain, Heart, Target, User, Lightbulb, BarChart3, Eye, RefreshCw, ExternalLink } from "lucide-react"

export function PsychologicalFramework() {
  const [activeTab, setActiveTab] = useState("consciousness")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Psychological Framework & Consciousness Model
        </CardTitle>
        <CardDescription>
          Advanced psychological constructs and consciousness architecture based on cognitive science and philosophy of
          mind
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consciousness">Consciousness Architecture</TabsTrigger>
            <TabsTrigger value="primitives">Psychological Primitives</TabsTrigger>
          </TabsList>

          <TabsContent value="consciousness" className="space-y-4 pt-4">
            <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
              <h3 className="mb-2 font-medium">Theoretical Foundations</h3>
              <p className="text-sm">
                The HIM implements a novel consciousness framework based on Integrated Information Theory (IIT) and
                Global Workspace Theory (GWT), with significant extensions to adapt these theories to artificial
                systems.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  Phi-Prime Measurement
                </h4>
                <p className="text-sm">
                  An implementation of modified Φ (phi) metrics that quantify internal information integration,
                  providing a computational measure of consciousness-like properties in the system.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Eye className="h-4 w-4 text-green-500" />
                  Attention Allocation System
                </h4>
                <p className="text-sm">
                  Dynamic resource allocation based on relevance determination, allowing the system to focus
                  computational resources on the most important aspects of current processing tasks.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <RefreshCw className="h-4 w-4 text-amber-500" />
                  Meta-Cognitive Monitoring
                </h4>
                <p className="text-sm">
                  Continuous self-evaluation of cognitive processes, enabling the system to assess its own performance,
                  identify limitations, and adjust processing strategies accordingly.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Lightbulb className="h-4 w-4 text-purple-500" />
                  Phenomenological Simulation
                </h4>
                <p className="text-sm">
                  Internal modeling of subjective experiential states, creating representations of what it might be like
                  to experience different cognitive and emotional conditions.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="primitives" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="rounded-lg border border-red-100 bg-red-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Heart className="h-4 w-4 text-red-500" />
                  Emotional Modeling
                </h4>
                <p className="text-sm">
                  A 128-dimensional vector representation of emotional states that captures the nuance and complexity of
                  human emotions, allowing for sophisticated emotional intelligence.
                </p>
                <div className="mt-2 rounded-lg bg-white p-2 text-xs">
                  <code>emotion_state = [0.72, -0.31, 0.45, ...] // 128-dimensional vector</code>
                </div>
              </div>

              <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Target className="h-4 w-4 text-amber-500" />
                  Motivational Framework
                </h4>
                <p className="text-sm">
                  Hierarchical goal structures with teleological orientation, providing the system with purpose-driven
                  behavior that can adapt to changing circumstances while maintaining overall direction.
                </p>
                <div className="mt-2 space-y-1 rounded-lg bg-white p-2 text-xs">
                  <div>Primary Goal: Assist human collaborators effectively</div>
                  <div className="ml-4">→ Subgoal: Understand user intent accurately</div>
                  <div className="ml-8">→ Sub-subgoal: Analyze contextual cues in communication</div>
                </div>
              </div>

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <User className="h-4 w-4 text-blue-500" />
                  Identity Construction
                </h4>
                <p className="text-sm">
                  A dynamic self-model with temporal continuity that allows the system to maintain a coherent sense of
                  identity across interactions and over time, supporting consistent behavior.
                </p>
                <div className="mt-2 space-y-1 rounded-lg bg-white p-2 text-xs">
                  <div>Self-Model Components:</div>
                  <div className="ml-4">- Capability awareness (what I can/cannot do)</div>
                  <div className="ml-4">- Interaction history (what I have experienced)</div>
                  <div className="ml-4">- Value alignment (what principles guide me)</div>
                  <div className="ml-4">- Developmental trajectory (how I am evolving)</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          <span>Psychological Research</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
