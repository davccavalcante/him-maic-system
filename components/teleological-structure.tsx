"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, ChevronRight, ChevronDown, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Goal {
  id: string
  title: string
  description: string
  children?: Goal[]
  expanded?: boolean
}

interface TeleologicalStructureProps {
  rootGoal: Goal
}

export function TeleologicalStructure({ rootGoal }: TeleologicalStructureProps) {
  const [expandedGoals, setExpandedGoals] = useState<Record<string, boolean>>({
    [rootGoal.id]: true,
  })

  const toggleGoal = (id: string) => {
    setExpandedGoals((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const renderGoal = (goal: Goal, level = 0) => {
    const isExpanded = expandedGoals[goal.id]
    const hasChildren = goal.children && goal.children.length > 0

    return (
      <div key={goal.id} className="mb-2">
        <div
          className={`
            flex items-start gap-2 rounded-lg border p-3
            ${level === 0 ? "bg-indigo-50 border-indigo-100" : "bg-white border-gray-200"}
          `}
          style={{ marginLeft: `${level * 20}px` }}
        >
          <div className="mt-1">
            <Target
              className={`h-5 w-5 ${
                level === 0
                  ? "text-indigo-500"
                  : level === 1
                    ? "text-purple-500"
                    : level === 2
                      ? "text-blue-500"
                      : "text-green-500"
              }`}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{goal.title}</h3>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                        <Info className="h-3 w-3 text-gray-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">{goal.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {hasChildren && (
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleGoal(goal.id)}>
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">{goal.description}</p>
          </div>
        </div>

        {hasChildren && isExpanded && goal.children?.map((child) => renderGoal(child, level + 1))}
      </div>
    )
  }

  return (
    <Card className="w-full border-0 shadow-md">
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="flex items-center gap-2 text-sm font-medium">
            <Target className="h-4 w-4 text-indigo-500" />
            Estrutura Teleológica (Propósitos e Motivações)
          </h3>
        </div>

        <div className="space-y-2">{renderGoal(rootGoal)}</div>
      </CardContent>
    </Card>
  )
}
