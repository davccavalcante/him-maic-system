"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, MessageSquare, Settings, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"
import { PersonalitySettings } from "@/components/personality-settings"
import { CollaborativeWorkspace } from "@/components/collaborative-workspace"

export function HybridIntelligenceInterface() {
  const [activeTab, setActiveTab] = useState("chat")
  const [userFeedback, setUserFeedback] = useState<{ [key: string]: number }>({})
  const [systemLearning, setSystemLearning] = useState<string[]>([
    "Learning user communication style...",
    "Adapting to problem-solving approach...",
    "Calibrating response detail level...",
  ])

  // Simulate system learning over time
  useEffect(() => {
    const timer = setTimeout(() => {
      if (systemLearning.length < 5) {
        setSystemLearning([...systemLearning, "Incorporating feedback patterns..."])
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [systemLearning])

  return (
    <div className="w-full">
      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Dialogue</span>
          </TabsTrigger>
          <TabsTrigger value="collaborate" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Collaborate</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Personalize</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-4">
          <ChatInterface />
        </TabsContent>

        <TabsContent value="collaborate" className="mt-4">
          <CollaborativeWorkspace />
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <PersonalitySettings />
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            System Adaptation
          </CardTitle>
          <CardDescription>The system is learning from your interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {systemLearning.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50">
                  Active
                </Badge>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-3">
          <Button variant="outline" size="sm" onClick={() => setSystemLearning([])}>
            Reset Learning
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
