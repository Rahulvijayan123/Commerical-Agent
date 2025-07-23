import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, ComposedChart } from "recharts"
import { ExpandableDetail } from "@/components/expandable-detail"
import { SourceAttribution } from "@/components/source-attribution"

const marketData = [
  { year: "2024", marketSize: 1506, cagr: 8.2, penetration: 12 },
  { year: "2025", marketSize: 1680, cagr: 8.8, penetration: 15 },
  { year: "2026", marketSize: 1890, cagr: 9.2, penetration: 18 },
  { year: "2027", marketSize: 2140, cagr: 9.8, penetration: 22 },
  { year: "2028", marketSize: 2420, cagr: 10.2, penetration: 25 },
  { year: "2029", marketSize: 2680, cagr: 10.8, penetration: 27 },
  { year: "2030", marketSize: 2910, cagr: 11.2, penetration: 27 },
]

const chartConfig = {
  marketSize: {
    label: "Market Size ($M)",
    color: "hsl(var(--chart-1))",
  },
  cagr: {
    label: "CAGR (%)",
    color: "hsl(var(--chart-2))",
  },
  penetration: {
    label: "Penetration (%)",
    color: "hsl(var(--chart-3))",
  },
}

const marketSizeSources = [
  {
    name: "EvaluatePharma",
    type: "database" as const,
    url: "https://www.evaluate.com",
    description: "Market sizing and competitive intelligence",
    lastUpdated: "Dec 2024",
  },
  {
    name: "IQVIA Market Research",
    type: "database" as const,
    description: "Patient population and treatment patterns",
    lastUpdated: "Nov 2024",
  },
  {
    name: "Internal Analysis",
    type: "manual" as const,
    description: "Company-specific market assumptions and pricing strategy",
  },
  {
    name: "AI Market Model",
    type: "ai-generated" as const,
    description: "Machine learning-based market projections using comparable asset analysis",
  },
]

export function MarketSize() {
  return (
    <div className="space-y-6">
      {/* Header Metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">Market Size Index</CardTitle>
                <ExpandableDetail
                  title="Market Size Index"
                  value="78"
                  unit="%"
                  assumptions={[
                    "Peak market penetration of 27% based on comparable TKI launches",
                    "Annual pricing of $100K aligned with current SOC",
                    "Patient population growth of 3-5% annually",
                    "Treatment duration of 18 months median",
                  ]}
                  formula="Index = (Peak Sales Potential × Market Access × Competitive Position) / 100"
                  sources={marketSizeSources}
                  aiDerivation="Generated using fuzzy matching against 15 comparable EGFR TKI launches, weighted by indication overlap and competitive landscape similarity"
                />
              </div>
              <CardDescription>Overall market attractiveness score</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">78%</div>
              <Badge variant="secondary">High Potential</Badge>
              <div className="mt-2">
                <SourceAttribution sectionTitle="Market Size & Growth" sources={marketSizeSources} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-bold text-blue-600">$2.51B</p>
                <ExpandableDetail
                  title="Peak Sales Estimate"
                  value="2.51"
                  unit="B USD"
                  assumptions={[
                    "Peak market share of 27% in year 4-5",
                    "Blended global pricing of $156K annually",
                    "Patient population of 26K at peak",
                    "Treatment persistence rate of 85%",
                  ]}
                  formula="Peak Sales = Patient Population × Market Share × Annual Price × Persistence Rate"
                  sources={marketSizeSources.slice(0, 2)}
                />
              </div>
              <p className="text-sm text-slate-600">Peak Sales Estimate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">$1.506B</p>
              <p className="text-sm text-slate-600">Current Market Size</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">8-12%</p>
              <p className="text-sm text-slate-600">CAGR</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">27%</p>
              <p className="text-sm text-slate-600">Peak Share</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Market Growth Projection</CardTitle>
            <CardDescription>Market size and penetration trends 2024-2030</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar yAxisId="left" dataKey="marketSize" fill="var(--color-marketSize)" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="penetration"
                    stroke="var(--color-penetration)"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Key Assumptions */}
        <Card>
          <CardHeader>
            <CardTitle>Key Market Assumptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pricing (Annual)</span>
                <span className="text-sm font-bold">$100K/patient</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Peak Penetration</span>
                <span className="text-sm font-bold">27%</span>
              </div>
              <Progress value={27} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Unmet Need Index</span>
                <span className="text-sm font-bold">8.5/10</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="pt-4 space-y-3">
              <div>
                <h4 className="font-semibold text-sm text-slate-600 mb-1">Patient Population</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>US:</span>
                    <span className="font-medium">12,500 patients</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EU5:</span>
                    <span className="font-medium">8,200 patients</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other:</span>
                    <span className="font-medium">5,300 patients</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Drivers */}
      <Card>
        <CardHeader>
          <CardTitle>Market Growth Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-sm text-slate-600 mb-3">Positive Drivers</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Increasing EGFR testing rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Earlier diagnosis and treatment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Expanding treatment guidelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Improved patient outcomes</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-slate-600 mb-3">Risk Factors</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Competitive pressure on pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Biosimilar entry timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Regulatory approval delays</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Market access challenges</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-slate-600 mb-3">Key Uncertainties</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Combination therapy adoption</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Emerging resistance patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Healthcare policy changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Novel modality disruption</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
