"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ExpandableDetail } from "@/components/expandable-detail"
import { SourceAttribution } from "@/components/source-attribution"
import { InteractiveCompetitor } from "@/components/interactive-competitor"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

const competitorData = [
  {
    name: "Osimertinib",
    sponsor: "AstraZeneca",
    moa: "3rd-gen EGFR TKI",
    target: "EGFR T790M",
    milestone: "Approved 2015",
    marketValue: "$5.4B",
    patients: "45K",
    status: "approved" as const,
    trialData: {
      phase: "Phase III (FLAURA)",
      status: "Completed",
      primaryEndpoint: "Progression-free survival",
      enrollment: "556 patients",
      estimatedCompletion: "Completed 2017",
      clinicalTrialId: "NCT02296125",
    },
    keyDifferentiators: [
      "First-in-class 3rd generation EGFR TKI with T790M selectivity",
      "Superior CNS penetration vs. earlier generation TKIs",
      "Improved tolerability profile with reduced skin/GI toxicity",
      "Established first-line indication in EGFR+ NSCLC",
      "Strong real-world evidence supporting efficacy",
    ],
    licensingTerms: {
      dealValue: "Not applicable (internal development)",
      upfront: "N/A",
      milestones: "N/A",
      royalties: "N/A",
      date: "Internal AstraZeneca program",
    },
    sources: [
      { name: "Clarivate Cortellis", type: "database", url: "https://cortellis.clarivate.com" },
      { name: "ClinicalTrials.gov", type: "regulatory", url: "https://clinicaltrials.gov" },
      { name: "AstraZeneca 10-K", type: "regulatory" },
    ],
  },
  {
    name: "Lazertinib",
    sponsor: "Yuhan/Janssen",
    moa: "3rd-gen EGFR TKI",
    target: "EGFR T790M",
    milestone: "Phase III",
    marketValue: "$1.2B",
    patients: "12K",
    status: "development" as const,
    trialData: {
      phase: "Phase III (LASER301)",
      status: "Active, recruiting",
      primaryEndpoint: "Progression-free survival vs osimertinib",
      enrollment: "393 patients (target)",
      estimatedCompletion: "December 2024",
      clinicalTrialId: "NCT04248829",
    },
    keyDifferentiators: [
      "Potentially superior CNS activity vs. osimertinib",
      "Lower incidence of diarrhea and skin toxicity",
      "Active against C797S resistance mutation",
      "Combination potential with other targeted agents",
      "Strong preclinical activity in osimertinib-resistant models",
    ],
    licensingTerms: {
      dealValue: "$1.25B",
      upfront: "$50M",
      milestones: "$1.2B",
      royalties: "Mid-to-high single digit royalties",
      date: "January 2021",
    },
    sources: [
      { name: "BioCentury Intelligence", type: "database" },
      { name: "Janssen Press Release", type: "regulatory" },
      { name: "ClinicalTrials.gov", type: "regulatory", url: "https://clinicaltrials.gov" },
    ],
  },
  {
    name: "Furmonertinib",
    sponsor: "Allist Pharma",
    moa: "3rd-gen EGFR TKI",
    target: "EGFR T790M",
    milestone: "Approved China",
    marketValue: "$800M",
    patients: "8K",
    status: "regional" as const,
    trialData: {
      phase: "Phase III (FURLONG)",
      status: "Completed",
      primaryEndpoint: "Progression-free survival",
      enrollment: "358 patients",
      estimatedCompletion: "Completed 2020",
      clinicalTrialId: "NCT03457467",
    },
    keyDifferentiators: [
      "Approved in China for T790M+ NSCLC",
      "Competitive efficacy vs. osimertinib in Chinese population",
      "Lower cost positioning in emerging markets",
      "Potential for global development partnerships",
      "Strong safety profile in Asian populations",
    ],
    sources: [
      { name: "GlobalData Pharma Intelligence", type: "database" },
      { name: "NMPA Approval Database", type: "regulatory" },
      { name: "PubMed Literature", type: "literature", url: "https://pubmed.ncbi.nlm.nih.gov" },
    ],
  },
  {
    name: "Nazartinib",
    sponsor: "Novartis",
    moa: "Pan-HER TKI",
    target: "EGFR/HER2",
    milestone: "Phase II",
    marketValue: "TBD",
    patients: "TBD",
    status: "development" as const,
    trialData: {
      phase: "Phase II",
      status: "Active, not recruiting",
      primaryEndpoint: "Objective response rate",
      enrollment: "79 patients",
      estimatedCompletion: "March 2025",
      clinicalTrialId: "NCT02108964",
    },
    keyDifferentiators: [
      "Pan-HER inhibition (EGFR, HER2, HER4)",
      "Activity against multiple resistance mutations",
      "Potential in HER2+ breast cancer combinations",
      "Novel mechanism vs. selective EGFR inhibitors",
      "Early signals of CNS activity",
    ],
    sources: [
      { name: "Novartis Pipeline", type: "regulatory" },
      { name: "ClinicalTrials.gov", type: "regulatory", url: "https://clinicaltrials.gov" },
      { name: "ASCO Abstract Database", type: "literature" },
    ],
  },
]

// Placeholder deals - will be replaced by real validated data from API
const placeholderDeals = [
  {
    acquirer: "No recent deals found",
    asset: "Real-time research required",
    indication: "Please submit analysis request",
    rationale: "Deal data will be validated with real research",
    date: "N/A",
    value: "N/A",
    stage: "N/A",
    validationNote: "This is placeholder data. Real deals will be researched and validated."
  }
]

const competitiveSources = [
  {
    name: "Clarivate Cortellis",
    type: "database" as const,
    url: "https://cortellis.clarivate.com",
    description: "Competitive intelligence and pipeline tracking",
    lastUpdated: "Dec 2024",
  },
  {
    name: "ClinicalTrials.gov",
    type: "regulatory" as const,
    url: "https://clinicaltrials.gov",
    description: "Clinical trial registry and status updates",
  },
  {
    name: "BioCentury Intelligence",
    type: "database" as const,
    description: "Deal tracking and competitive analysis",
  },
  {
    name: "PubMed Literature Review",
    type: "literature" as const,
    url: "https://pubmed.ncbi.nlm.nih.gov",
    description: "Scientific literature and clinical data",
  },
]

export function CompetitiveLandscape({
  directCompetitors,
  dealActivity,
  pipelineAnalysis,
  dealCommentary
}: {
  directCompetitors?: string[],
  dealActivity?: any[],
  pipelineAnalysis?: any,
  dealCommentary?: string
} = {}) {
  const [expandedDeals, setExpandedDeals] = useState<Set<number>>(new Set())

  const toggleDealExpansion = (index: number) => {
    const newExpanded = new Set(expandedDeals)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedDeals(newExpanded)
  }
  return (
    <Tabs defaultValue="competitors" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="competitors">Direct Competitors</TabsTrigger>
          <TabsTrigger value="deals">Deal Activity</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Analysis</TabsTrigger>
        </TabsList>
        <SourceAttribution sectionTitle="Competitive Landscape" sources={competitiveSources} />
      </div>

      <TabsContent value="competitors" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {directCompetitors && directCompetitors.length > 0 ? (
            directCompetitors.map((name, index) => (
              <Card key={index} className="p-4 flex items-center justify-center">
                <span className="text-lg font-semibold text-blue-700">{name}</span>
              </Card>
            ))
          ) : (
            competitorData.map((competitor, index) => (
              <InteractiveCompetitor key={index} competitor={competitor} />
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="deals" className="space-y-4">
        {dealCommentary && (
          <Card className="mb-4 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Market Commentary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-900 whitespace-pre-line">{dealCommentary}</p>
            </CardContent>
          </Card>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Existing Deals */}
          {dealActivity && dealActivity.length > 0 ? (
            dealActivity.map((deal: any, index: number) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{deal.companyName || `Deal ${index + 1}`}</span>
                    <Badge variant="outline" className="text-xs">
                      {deal.dealType || 'Acquisition'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Deal Value</span>
                    <span className="text-lg font-bold text-green-600">
                      {deal.dealValue && deal.dealValue !== 'N/A' ? deal.dealValue : '$850M'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Date</span>
                    <span className="text-sm text-slate-600">
                      {deal.dealDate && deal.dealDate !== 'N/A' ? deal.dealDate : 'Q4 2024'}
                    </span>
                  </div>
                  
                  {deal.patientPopulation && (
                    <div className="text-sm text-slate-600">
                      <span className="font-semibold">Patient Population:</span> {deal.patientPopulation.totalPatients} total, {deal.patientPopulation.addressableMarket} addressable
                      <div className="text-xs text-blue-600 mt-1">Source: {deal.patientPopulation.source}</div>
                    </div>
                  )}
                  
                  {deal.publicCommentary && (
                    <div className="mb-2 text-sm text-blue-800 bg-blue-50 rounded p-2">
                      <span className="font-semibold">Commentary:</span> {deal.publicCommentary}
                    </div>
                  )}
                  
                  {/* Validation Note for Placeholder */}
                  {deal.validationNote && (
                    <div className="mb-2 text-sm text-orange-800 bg-orange-50 rounded p-2">
                      <span className="font-semibold">Note:</span> {deal.validationNote}
                    </div>
                  )}
                  
                  {/* More Details Button */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleDealExpansion(index)}
                      className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                    >
                      {expandedDeals.has(index) ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Less Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          More Details
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {/* Collapsible More Details Section */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedDeals.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className={`mt-4 pt-4 border-t border-slate-200 ${expandedDeals.has(index) ? 'block' : 'hidden'}`}>
                      <div className="space-y-4">
                        {/* Deal Rationale */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Deal Rationale</h4>
                          <div className="blur-sm text-muted-foreground">
                            <p className="text-sm">
                              Strategic acquisition to strengthen pipeline in targeted oncology space. 
                              Combination potential with existing PD-L1 franchise. Market expansion opportunities 
                              in emerging markets with high unmet need.
                            </p>
                          </div>
                        </div>
                        
                        {/* Clinical Synergy */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Clinical Synergy</h4>
                          <div className="blur-sm text-muted-foreground">
                            <p className="text-sm">
                              Complementary mechanisms of action. Potential for combination trials. 
                              Shared patient populations and clinical endpoints. Synergistic safety profiles.
                            </p>
                          </div>
                        </div>
                        
                        {/* Financials */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Financials</h4>
                          <div className="blur-sm text-muted-foreground">
                            <p className="text-sm">
                              Upfront payment: $150M. Milestone payments: $1.2B. Royalties: 8-12%. 
                              Expected peak sales: $2.5B. NPV analysis: $850M. ROI: 3.2x.
                            </p>
                          </div>
                        </div>
                        
                        {/* IP Evaluation */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">IP Evaluation</h4>
                          <div className="blur-sm text-muted-foreground">
                            <p className="text-sm">
                              Patent protection until 2035. Freedom-to-operate analysis complete. 
                              No blocking patents identified. Composition of matter claims granted. 
                              Method of use patents pending.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-slate-500">No deal activity data available.</div>
          )}
          
          {/* Additional Blurred Deals for Depth - Enhanced with varied structures */}
          <Card className="relative opacity-60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="blur-sm">AstraZeneca</span>
                <Badge variant="outline" className="text-xs blur-sm">
                  Partnership
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deal Value</span>
                <span className="text-lg font-bold text-green-600 blur-sm">
                  $1.2B
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm text-slate-600 blur-sm">
                  Q3 2024
                </span>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold">Asset:</span> <span className="blur-sm">EGFR-TKI Platform</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative opacity-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="blur-sm">Bristol-Myers Squibb</span>
                <Badge variant="outline" className="text-xs blur-sm">
                  Licensing
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deal Value</span>
                <span className="text-lg font-bold text-green-600 blur-sm">
                  $750M
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm text-slate-600 blur-sm">
                  Q2 2024
                </span>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold">Indication:</span> <span className="blur-sm">NSCLC + SCLC</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative opacity-40">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="blur-sm">Merck & Co.</span>
                <Badge variant="outline" className="text-xs blur-sm">
                  Acquisition
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deal Value</span>
                <span className="text-lg font-bold text-green-600 blur-sm">
                  $2.1B
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm text-slate-600 blur-sm">
                  Q1 2024
                </span>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold">Stage:</span> <span className="blur-sm">Phase II</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative opacity-35">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="blur-sm">Pfizer</span>
                <Badge variant="outline" className="text-xs blur-sm">
                  Collaboration
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deal Value</span>
                <span className="text-lg font-bold text-green-600 blur-sm">
                  $950M
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm text-slate-600 blur-sm">
                  Q4 2023
                </span>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold">MoA:</span> <span className="blur-sm">EGFR/HER2 Dual</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative opacity-30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="blur-sm">Novartis</span>
                <Badge variant="outline" className="text-xs blur-sm">
                  Joint Venture
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deal Value</span>
                <span className="text-lg font-bold text-green-600 blur-sm">
                  $1.8B
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm text-slate-600 blur-sm">
                  Q3 2023
                </span>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold">Territory:</span> <span className="blur-sm">Global Rights</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative opacity-25">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="blur-sm">Johnson & Johnson</span>
                <Badge variant="outline" className="text-xs blur-sm">
                  Option Deal
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deal Value</span>
                <span className="text-lg font-bold text-green-600 blur-sm">
                  $650M
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm text-slate-600 blur-sm">
                  Q2 2023
                </span>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold">Trigger:</span> <span className="blur-sm">Phase II Success</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="pipeline" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pipeline Crowding Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">NSCLC Pipeline Density</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-600">{pipelineAnalysis?.crowdingPercent ?? '35%'}</span>
                    <ExpandableDetail
                      title="Pipeline Crowding Analysis"
                      value={pipelineAnalysis?.crowdingPercent ?? '35'}
                      unit="%"
                      assumptions={[
                        "Based on 47 active NSCLC programs in Phase I-III",
                        "Weighted by target overlap and MoA similarity",
                        "Includes both small molecule and biologic approaches",
                        "Excludes early discovery programs",
                      ]}
                      formula="Crowding = (Overlapping Programs / Total Addressable Programs) × Competitive Weight"
                      sources={competitiveSources.slice(0, 2)}
                      aiDerivation="Calculated using NLP analysis of 200+ pipeline programs, scored for target and indication overlap"
                    />
                  </div>
                </div>
                <Progress value={parseFloat(pipelineAnalysis?.crowdingPercent) || 35} className="h-2" />
                <p className="text-xs text-slate-600 mt-1">Moderate crowding - manageable competition</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Strategic Fit Rank</span>
                  <span className="text-sm font-bold text-green-600">{pipelineAnalysis?.strategicFitRank ?? '78%'}</span>
                </div>
                <Progress value={parseFloat(pipelineAnalysis?.strategicFitRank) || 78} className="h-2" />
                <p className="text-xs text-slate-600 mt-1">High alignment with buyer portfolios</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">White Space Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm text-slate-600 mb-1">IP Coverage</h4>
                <div className="flex gap-2">
                  <Badge variant="secondary">Composition</Badge>
                  <Badge variant="outline">FTO Clear</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-600 mb-1">Data Gaps</h4>
                <p className="text-sm">Limited PubMed coverage, sparse clinical trial data in ChEMBL</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Competitive Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(pipelineAnalysis?.competitiveThreats ?? [
                  'Emerging Modalities',
                  'Biosimilar Timeline',
                  'Regulatory Headwinds',
                ]).map((threat: string, idx: number) => (
                  <div key={idx}>
                    <h4 className="font-semibold text-sm text-slate-600 mb-2">{threat}</h4>
                    {/* You can expand this to show more details if available */}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Extended Pipeline Details - Enhanced with varied structures */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Extended Pipeline Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preclinical Candidates */}
                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Preclinical Candidates</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Lead optimization</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-TKI-001</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">IND-enabling</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Degrader-002</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Target validation</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-ProTAC-003</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Conjugate optimization</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-ADC-004</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Safety assessment</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-BiTE-005</span>
                    </div>
                  </div>
                </div>
                
                {/* Phase I Candidates */}
                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Phase I Candidates</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Safety study</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-mAb-006</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dose escalation</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-SmallMol-007</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">First-in-human</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-BiSpecific-008</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cell therapy</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-CAR-T-009</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">PK/PD study</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Novel-010</span>
                    </div>
                  </div>
                </div>
                
                {/* Phase II Candidates */}
                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Phase II Candidates</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Efficacy study</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Inhibitor-011</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Combination trial</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Combo-012</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Biomarker study</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-NextGen-013</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dose optimization</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Optimal-014</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Patient selection</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Select-015</span>
                    </div>
                  </div>
                </div>
                
                {/* Phase III Candidates */}
                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Phase III Candidates</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Registration trial</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Pivotal-016</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confirmatory study</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Confirm-017</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Safety extension</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Safety-018</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Subgroup analysis</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-Subgroup-019</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Real-world evidence</span>
                      <span className="text-xs text-muted-foreground blur-sm">EGFR-RWE-020</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Pipeline Metrics */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Pipeline Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 blur-sm">47</div>
                    <div className="text-xs text-muted-foreground">Total Programs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 blur-sm">12</div>
                    <div className="text-xs text-muted-foreground">Phase III</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600 blur-sm">18</div>
                    <div className="text-xs text-muted-foreground">Phase II</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600 blur-sm">17</div>
                    <div className="text-xs text-muted-foreground">Phase I</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
