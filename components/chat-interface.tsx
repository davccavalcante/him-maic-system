"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, User, Bot, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react"
import { useChat } from "ai/react"

type MessageFeedback = {
  [messageId: string]: "positive" | "negative" | null
}

export function ChatInterface() {
  const [thinking, setThinking] = useState(false)
  const [feedback, setFeedback] = useState<MessageFeedback>({})

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    onResponse: () => {
      setThinking(false)
    },
  })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setThinking(true)
    handleSubmit(e)
  }

  const giveFeedback = (messageId: string, type: "positive" | "negative") => {
    setFeedback((prev) => ({
      ...prev,
      [messageId]: prev[messageId] === type ? null : type,
    }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Dialogue Interface</span>
          <Badge variant="outline" className="ml-2">
            Using Grok-3
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-gray-500">
            <div>
              <p>Start a conversation with the hybrid intelligence system.</p>
              <p className="text-sm mt-2">The system will learn from your interactions and feedback.</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`
                flex max-w-[80%] items-start gap-2 rounded-lg p-3
                ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}
              `}
              >
                <div
                  className={`
                  flex h-6 w-6 items-center justify-center rounded-full
                  ${message.role === "user" ? "bg-blue-600" : "bg-gray-200"}
                `}
                >
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div>
                  <div className="text-sm">{message.content}</div>
                  {message.role === "assistant" && (
                    <div className="mt-2 flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-5 w-5 rounded-full ${feedback[message.id] === "positive" ? "bg-green-100" : ""}`}
                        onClick={() => giveFeedback(message.id, "positive")}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-5 w-5 rounded-full ${feedback[message.id] === "negative" ? "bg-red-100" : ""}`}
                        onClick={() => giveFeedback(message.id, "negative")}
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {thinking && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] items-center gap-2 rounded-lg bg-gray-100 p-3 text-black">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Thinking</span>
                <RefreshCw className="h-3 w-3 animate-spin" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
          <Textarea
            placeholder="Type your message..."
            className="min-h-10 flex-1 resize-none"
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
