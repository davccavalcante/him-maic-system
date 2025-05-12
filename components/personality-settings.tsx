"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Save, RefreshCw } from "lucide-react"

export function PersonalitySettings() {
  const [personalitySettings, setPersonalitySettings] = useState({
    communicationStyle: "balanced",
    detailLevel: 50,
    creativity: 60,
    formality: 40,
    empathy: 70,
    technicalDepth: 65,
    humorLevel: 30,
    responseSpeed: "balanced",
    learnFromInteractions: true,
    adaptToFeedback: true,
    explainReasoning: true,
    personalTone: "",
  })

  const handleSliderChange = (name: string, value: number[]) => {
    setPersonalitySettings({
      ...personalitySettings,
      [name]: value[0],
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setPersonalitySettings({
      ...personalitySettings,
      [name]: checked,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setPersonalitySettings({
      ...personalitySettings,
      [name]: value,
    })
  }

  const handleInputChange = (name: string, value: string) => {
    setPersonalitySettings({
      ...personalitySettings,
      [name]: value,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personality Settings</CardTitle>
        <CardDescription>
          Customize how the AI component of the hybrid intelligence system interacts with you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="communication">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="communication" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="communicationStyle">Communication Style</Label>
                <Select
                  value={personalitySettings.communicationStyle}
                  onValueChange={(value) => handleSelectChange("communicationStyle", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="analytical">Analytical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailLevel">Detail Level</Label>
              <Slider
                id="detailLevel"
                min={0}
                max={100}
                step={1}
                value={[personalitySettings.detailLevel]}
                onValueChange={(value) => handleSliderChange("detailLevel", value)}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Brief</span>
                <span>Comprehensive</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creativity">Creativity</Label>
              <Slider
                id="creativity"
                min={0}
                max={100}
                step={1}
                value={[personalitySettings.creativity]}
                onValueChange={(value) => handleSliderChange("creativity", value)}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Factual</span>
                <span>Creative</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="formality">Formality</Label>
              <Slider
                id="formality"
                min={0}
                max={100}
                step={1}
                value={[personalitySettings.formality]}
                onValueChange={(value) => handleSliderChange("formality", value)}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Casual</span>
                <span>Formal</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-4 pt-4">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <Label htmlFor="learnFromInteractions">Learn From Interactions</Label>
                <p className="text-sm text-gray-500">Allow the system to learn from our conversations</p>
              </div>
              <Switch
                id="learnFromInteractions"
                checked={personalitySettings.learnFromInteractions}
                onCheckedChange={(checked) => handleSwitchChange("learnFromInteractions", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-y-2">
              <div>
                <Label htmlFor="adaptToFeedback">Adapt To Feedback</Label>
                <p className="text-sm text-gray-500">Adjust responses based on your feedback</p>
              </div>
              <Switch
                id="adaptToFeedback"
                checked={personalitySettings.adaptToFeedback}
                onCheckedChange={(checked) => handleSwitchChange("adaptToFeedback", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-y-2">
              <div>
                <Label htmlFor="explainReasoning">Explain Reasoning</Label>
                <p className="text-sm text-gray-500">Show the AI's thought process in responses</p>
              </div>
              <Switch
                id="explainReasoning"
                checked={personalitySettings.explainReasoning}
                onCheckedChange={(checked) => handleSwitchChange("explainReasoning", checked)}
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="personalTone">Personal Tone Description</Label>
              <Input
                id="personalTone"
                placeholder="Describe your preferred tone (e.g., 'like a helpful colleague')"
                value={personalitySettings.personalTone}
                onChange={(e) => handleInputChange("personalTone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responseSpeed">Response Speed Preference</Label>
              <Select
                value={personalitySettings.responseSpeed}
                onValueChange={(value) => handleSelectChange("responseSpeed", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Quick (may be less thorough)</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="thorough">Thorough (may be slower)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technicalDepth">Technical Depth</Label>
              <Slider
                id="technicalDepth"
                min={0}
                max={100}
                step={1}
                value={[personalitySettings.technicalDepth]}
                onValueChange={(value) => handleSliderChange("technicalDepth", value)}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Simplified</span>
                <span>Technical</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Reset to Default
        </Button>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  )
}
