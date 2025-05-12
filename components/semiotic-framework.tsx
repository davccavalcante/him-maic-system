"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Brain, MessageSquare, Target, Lightbulb, AlertCircle, BookOpen } from "lucide-react"

export function SemioticFramework() {
  const [activeTab, setActiveTab] = useState("semiotics")
  const router = useRouter()

  const handleLearnMore = () => {
    router.push("/semiotic-framework/learn-more")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Semiotic Hybrid Intelligence Framework
        </CardTitle>
        <CardDescription>
          A philosophical foundation for human-AI collaboration based on meaning, purpose, and awareness
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="semiotics" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Semiotics</span>
            </TabsTrigger>
            <TabsTrigger value="teleology" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Teleology</span>
            </TabsTrigger>
            <TabsTrigger value="consciousness" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Consciousness</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="semiotics" className="space-y-4 pt-4">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <h3 className="mb-2 font-medium">The Study of Signs & Meaning</h3>
              <p className="text-sm">
                Semiotics provides the framework for understanding how meaning is created, communicated, and interpreted
                between humans and AI.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Signifiers & Signified</h4>
                <p className="text-sm">
                  Words and symbols (signifiers) point to concepts and ideas (signified). This system is culturally
                  dependent and evolving.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Peircean Triadic Model</h4>
                <p className="text-sm">
                  Signs function as icons (resemblance), indices (causal connection), or symbols (convention). AI must
                  navigate all three.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Semantic Networks</h4>
                <p className="text-sm">
                  Meanings exist in relation to other meanings, forming complex networks that AI and humans must
                  navigate together.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Pragmatics</h4>
                <p className="text-sm">
                  Context dramatically influences meaning. The same words can mean different things in different
                  situations.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="teleology" className="space-y-4 pt-4">
            <div className="rounded-lg border border-green-100 bg-green-50 p-4">
              <h3 className="mb-2 font-medium">The Study of Purpose & Final Causes</h3>
              <p className="text-sm">
                Teleology addresses the role of goals, purposes, and final causes in both natural and artificial
                systems.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Internal vs. External Teleology</h4>
                <p className="text-sm">
                  Distinguishing between inherent purpose (internal) and imposed purpose (external) in AI systems.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Natural vs. Artificial Purpose</h4>
                <p className="text-sm">
                  Exploring how artificial purposes in AI can align with or complement natural human purposes.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Teleological Explanation</h4>
                <p className="text-sm">
                  Understanding behavior by its goals rather than just its mechanisms—the "why" beyond the "how."
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Value Alignment</h4>
                <p className="text-sm">
                  How purposes reflect and incorporate values, ensuring AI goals align with human ethical frameworks.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="consciousness" className="space-y-4 pt-4">
            <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
              <h3 className="mb-2 font-medium">The Phenomenon of Subjective Experience</h3>
              <p className="text-sm">
                Consciousness involves awareness, experience, and perception that goes beyond mere information
                processing.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Context Awareness</h4>
                <p className="text-sm">
                  AI systems that understand the broader context of interactions, not just the immediate data.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Adaptive Understanding</h4>
                <p className="text-sm">
                  Systems that evolve their understanding based on ongoing interactions and feedback.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Self-Reflection</h4>
                <p className="text-sm">
                  The capacity to recognize limitations and uncertainties in one's own understanding.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Meaning Participation</h4>
                <p className="text-sm">
                  Active engagement in meaning-making processes rather than passive information processing.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <span className="text-xs text-gray-500">
            These concepts guide our hybrid intelligence approach but are still evolving
          </span>
        </div>
        <Button variant="outline" size="sm" className="gap-1" onClick={handleLearnMore}>
          <Lightbulb className="h-4 w-4" />
          <span className="hidden sm:inline">Learn More</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
