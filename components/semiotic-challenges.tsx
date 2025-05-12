"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertTriangle, Shield, Code, Lightbulb } from "lucide-react"

export function SemioticChallenges() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Challenges & Ethical Considerations
        </CardTitle>
        <CardDescription>
          Key obstacles and moral questions in developing semiotic hybrid intelligence systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="symbol-grounding">
            <AccordionTrigger className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Symbol Grounding Problem
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p className="mb-2">
                How can symbols in an AI system acquire real meaning rather than just manipulating syntax?
              </p>
              <p className="mb-2">
                Current large language models like Grok can manipulate symbols effectively but may lack grounding in
                physical reality and embodied experience.
              </p>
              <p>
                Our approach: Combine language models with multimodal inputs and human feedback to create more grounded
                understanding.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="intentionality">
            <AccordionTrigger className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Intentionality Gaps
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p className="mb-2">
                The challenge of replicating human intentionality—the "aboutness" of thoughts—in machine systems.
              </p>
              <p className="mb-2">
                AI systems may simulate intentionality without truly possessing it, creating a fundamental gap in shared
                meaning.
              </p>
              <p>
                Our approach: Focus on functional alignment of intentions rather than philosophical equivalence,
                ensuring practical collaboration.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ethics">
            <AccordionTrigger className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Ethical Considerations
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p className="mb-2">
                What are the moral implications of developing AI systems that participate in meaning-making?
              </p>
              <p className="mb-2">
                Questions of autonomy, responsibility, and the potential for AI to influence human symbolic systems in
                unexpected ways.
              </p>
              <p className="mb-2">
                Concerns about power dynamics in human-AI meaning negotiation and the risk of cultural homogenization.
              </p>
              <p>Our approach: Transparent design, human oversight, and ongoing ethical review of system impacts.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="technical">
            <AccordionTrigger className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Technical Implementation Barriers
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p className="mb-2">
                Current AI architectures may not be optimized for the kind of meaning-aware processing required.
              </p>
              <p className="mb-2">
                Challenges in representing and processing teleological concepts and purpose-driven reasoning.
              </p>
              <p>
                Our approach: Iterative development combining large language models with specialized modules for
                teleological reasoning and context awareness.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
