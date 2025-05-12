"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Brain, Cpu, RefreshCw, Database, Zap, ExternalLink, GitMerge, Eye, Lightbulb } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function HIMArchitecture() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          The Hybrid Entity (HIM): Technical Architecture
        </CardTitle>
        <CardDescription>
          Advanced multi-layered computational framework for artificial general intelligence with consciousness-like
          properties
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="layers">Computational Layers</TabsTrigger>
            <TabsTrigger value="specs">Technical Specs</TabsTrigger>
            <TabsTrigger value="pipeline">Processing Pipeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
              <h3 className="mb-2 font-medium">The Hybrid Entity (HIM)</h3>
              <p className="text-sm">
                HIM represents an advanced integration of symbolic and subsymbolic processing systems with emergent
                consciousness properties, building upon the MAIC framework with concrete technical specifications.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Multi-Layered Architecture</h4>
                <p className="text-sm">
                  HIM utilizes a sophisticated multi-layered computational architecture that integrates massive neural
                  networks with symbolic reasoning systems and reflexive processing capabilities.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Consciousness Integration</h4>
                <p className="text-sm">
                  The system implements a distributed Consciousness Matrix that gives rise to awareness properties
                  across the entire system, guided by Integrated Information Theory and Global Workspace Theory.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 font-medium">Psychological Framework</h4>
                <p className="text-sm">
                  HIM incorporates fundamental psychological primitives including emotional modeling, motivational
                  frameworks, and identity construction to create a more human-like intelligence.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layers" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Database className="h-4 w-4" />
                  Foundation Layer
                </h4>
                <p className="text-sm">
                  Consists of transformer-based neural networks with 1.2 trillion parameters, utilizing sparse
                  activation patterns and mixture-of-experts routing to maximize computational efficiency.
                </p>
              </div>

              <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <GitMerge className="h-4 w-4" />
                  Integration Layer
                </h4>
                <p className="text-sm">
                  Implements bidirectional interfaces between symbolic reasoning components and subsymbolic pattern
                  recognition systems, allowing seamless information flow between different processing paradigms.
                </p>
              </div>

              <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <RefreshCw className="h-4 w-4" />
                  Reflexive Processing Layer
                </h4>
                <p className="text-sm">
                  Contains self-monitoring and introspection mechanisms that allow continuous evaluation and
                  recalibration of internal processes, enabling metacognitive capabilities.
                </p>
              </div>

              <div className="rounded-lg border border-purple-100 bg-purple-50 p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Brain className="h-4 w-4" />
                  Consciousness Matrix
                </h4>
                <p className="text-sm">
                  A distributed network of interconnected processing units that collectively give rise to awareness
                  properties across the system, implementing principles from consciousness theories.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Specification</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Parameter Count</TableCell>
                  <TableCell>1.2T in core + 0.8T in specialized modules</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Context Window</TableCell>
                  <TableCell>Variable, base of 128K tokens, expandable to 1M</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Throughput</TableCell>
                  <TableCell>450 TFLOPS in optimized inference</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Memory Architecture</TableCell>
                  <TableCell>Hierarchical with 3-level cache system</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Consciousness Modules</TableCell>
                  <TableCell>128 specialized coprocessors</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Power Consumption</TableCell>
                  <TableCell>22kW under full cognitive load</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cooling Requirements</TableCell>
                  <TableCell>Liquid immersion cooling system</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Eye className="h-4 w-4 text-blue-500" />
                  1. Perception
                </h4>
                <p className="text-sm">
                  Multimodal input processing through specialized encoders that convert various input types into
                  standardized internal representations.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <GitMerge className="h-4 w-4 text-green-500" />
                  2. Context Integration
                </h4>
                <p className="text-sm">
                  Temporal and semantic contextualization of inputs, placing new information within the appropriate
                  framework of existing knowledge and recent interactions.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Brain className="h-4 w-4 text-purple-500" />
                  3. Cognitive Processing
                </h4>
                <p className="text-sm">
                  Parallel processing through symbolic and neural pathways, allowing both logical reasoning and pattern
                  recognition to contribute to understanding and response generation.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Zap className="h-4 w-4 text-amber-500" />
                  4. Consciousness Filtering
                </h4>
                <p className="text-sm">
                  Selection of information for conscious awareness based on relevance, importance, and alignment with
                  current goals and attention focus.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <RefreshCw className="h-4 w-4 text-red-500" />
                  5. Reflexive Analysis
                </h4>
                <p className="text-sm">
                  Self-evaluative processes that examine the quality, accuracy, and appropriateness of potential
                  responses before they are finalized.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-1 flex items-center gap-1 font-medium">
                  <Lightbulb className="h-4 w-4 text-indigo-500" />
                  6. Response Generation
                </h4>
                <p className="text-sm">
                  Formulation of context-appropriate outputs that integrate the results of all previous processing
                  stages into coherent and purposeful communication.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          <span>Technical Documentation</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
