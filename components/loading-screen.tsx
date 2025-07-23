"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MicroscopeIcon as Molecule, Database, BarChart3, Target, TrendingUp, Zap } from "lucide-react"

interface LoadingScreenProps {
  onComplete: () => void
}

const loadingSteps = [
  { icon: Database, text: "Gathering competitive intelligence...", duration: 1000 },
  { icon: BarChart3, text: "Analyzing market dynamics...", duration: 800 },
  { icon: Target, text: "Assessing regulatory pathways...", duration: 900 },
  { icon: TrendingUp, text: "Modeling financial projections...", duration: 700 },
  { icon: Zap, text: "Calculating strategic fit scores...", duration: 600 },
  { icon: Molecule, text: "Finalizing analysis...", duration: 500 },
]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let totalDuration = 0
    let currentDuration = 0

    // Calculate total duration
    loadingSteps.forEach((step) => {
      totalDuration += step.duration
    })

    const runSteps = async () => {
      for (let i = 0; i < loadingSteps.length; i++) {
        setCurrentStep(i)

        // Animate progress for current step
        const stepDuration = loadingSteps[i].duration
        const startProgress = (currentDuration / totalDuration) * 100
        const endProgress = ((currentDuration + stepDuration) / totalDuration) * 100

        const animateProgress = () => {
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const stepProgress = Math.min(elapsed / stepDuration, 1)
            const currentProgress = startProgress + (endProgress - startProgress) * stepProgress

            setProgress(currentProgress)

            if (stepProgress < 1) {
              requestAnimationFrame(animate)
            }
          }
          animate()
        }

        animateProgress()
        await new Promise((resolve) => setTimeout(resolve, stepDuration))
        currentDuration += stepDuration
      }

      // Complete
      setTimeout(() => {
        onComplete()
      }, 300)
    }

    runSteps()
  }, [onComplete])

  const CurrentIcon = loadingSteps[currentStep]?.icon || Molecule

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8 text-center space-y-6">
          {/* Animated Icon */}
          <div className="relative">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
              <CurrentIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="absolute inset-0 w-16 h-16 mx-auto border-2 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Generating Analysis</h2>
            <p className="text-sm text-slate-600">Processing market intelligence and competitive data</p>
          </div>

          {/* Current Step */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">
              {loadingSteps[currentStep]?.text || "Preparing analysis..."}
            </p>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-slate-500">{Math.round(progress)}% complete</p>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2">
            {loadingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? "bg-blue-600" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
