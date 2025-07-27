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

const deals = [
  {
    acquirer: "Roche",
    asset: "TGF-β inhibitor",
    indication: "NSCLC combination",
    rationale: "Combo potential with PD-L1",
    date: "Q2 2024",
    value: "$1.8B",
    stage: "Phase II",
  },
  {
    acquirer: "Merck",
    asset: "KRAS G12C inhibitor",
    indication: "NSCLC",
    rationale: "Resistance mechanism coverage",
    date: "Q1 2024",
    value: "$2.1B",
    stage: "Phase III",
  },
  {
    acquirer: "Bristol Myers",
    asset: "EGFR degrader",
    indication: "EGFR+ tumors",
    rationale: "Next-gen EGFR targeting",
    date: "Q4 2023",
    value: "$950M",
    stage: "Phase I",
  },
  {
    acquirer: "Pfizer",
    asset: "CDK4/6 inhibitor",
    indication: "NSCLC combination",
    rationale: "Cell cycle targeting",
    date: "Q3 2023",
    value: "$1.3B",
    stage: "Phase II",
  },
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
        <div className="space-y-6">
          {(dealActivity && dealActivity.length > 0 ? dealActivity : deals).map((deal, index) => (
            <Card key={index} className="p-4 border shadow-sm">
              <CardHeader className="pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg text-blue-700">{deal.acquirer || deal.buyerAcquirer}</CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    {deal.region && `${deal.region} • `}
                    {deal.dealType && `${deal.dealType} • `}
                    {deal.developmentStage && deal.developmentStage}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 text-lg">{deal.value ?? deal.price ?? deal.dealPrice}</p>
                  <p className="text-sm text-slate-600">{deal.date ?? deal.status ?? deal.dealDate}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-sm">
                  <span className="font-semibold">Asset:</span> {deal.asset || deal.assetName} {deal.indication ? `• ${deal.indication}` : ''}
                </div>
                <div className="mb-2 text-sm">
                  <span className="font-semibold">Stage:</span> {deal.stage || deal.developmentStage}
                </div>
                <div className="mb-2 text-sm">
                  <span className="font-semibold">Rationale:</span> {deal.rationale}
                </div>
                {deal.publicCommentary && (
                  <div className="mb-2 text-sm text-blue-800 bg-blue-50 rounded p-2">
                    <span className="font-semibold">Commentary:</span> {deal.publicCommentary}
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
          ))}
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

          {/* Extended Pipeline Details */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Extended Pipeline Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preclinical Candidates */}
                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Preclinical Candidates</h4>
                  <div className="blur-sm text-muted-foreground">
                    <div className="space-y-2">
                      <p className="text-sm">• EGFR-TKI-001 (Lead optimization)</p>
                      <p className="text-sm">• EGFR-Degrader-002 (IND-enabling)</p>
                      <p className="text-sm">• EGFR-BiTE-003 (Preclinical validation)</p>
                      <p className="text-sm">• EGFR-ADC-004 (Conjugate optimization)</p>
                      <p className="text-sm">• EGFR-ProTAC-005 (Target validation)</p>
                    </div>
                  </div>
                </div>

                {/* Clinical Programs */}
                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Clinical Programs</h4>
                  <div className="blur-sm text-muted-foreground">
                    <div className="space-y-2">
                      <p className="text-sm">• Phase I: EGFR-TKI-006 (NCT04567823)</p>
                      <p className="text-sm">• Phase II: EGFR-Degrader-007 (NCT04567824)</p>
                      <p className="text-sm">• Phase III: EGFR-BiTE-008 (NCT04567825)</p>
                      <p className="text-sm">• Phase I/II: EGFR-ADC-009 (NCT04567826)</p>
                      <p className="text-sm">• Phase II: EGFR-ProTAC-010 (NCT04567827)</p>
                    </div>
                  </div>
                </div>

                {/* Geographic Expansion */}
                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Geographic Expansion</h4>
                  <div className="blur-sm text-muted-foreground">
                    <p className="text-sm">
                      Strategic expansion into emerging markets with high EGFR mutation prevalence. 
                      Regulatory submissions planned for China, Japan, and South Korea. 
                      Local manufacturing partnerships established in India and Brazil. 
                      Market access strategies developed for ASEAN markets.
                    </p>
                  </div>
                </div>

                {/* Mechanism of Action Mapping */}
                <div>
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Mechanism of Action Mapping</h4>
                  <div className="blur-sm text-muted-foreground">
                    <p className="text-sm">
                      Comprehensive analysis of EGFR signaling pathways and resistance mechanisms. 
                      Identification of novel combination targets and synthetic lethality opportunities. 
                      Biomarker development for patient stratification and response prediction. 
                      Real-world evidence analysis for mechanism validation.
                    </p>
                  </div>
                </div>

                {/* Combination Trials */}
                <div className="md:col-span-2">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Combination Trials</h4>
                  <div className="blur-sm text-muted-foreground">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">EGFR + PD-L1 Combinations</p>
                        <p className="text-sm">• Phase I/II: EGFR-TKI + Pembrolizumab (NCT04567828)</p>
                        <p className="text-sm">• Phase II: EGFR-Degrader + Atezolizumab (NCT04567829)</p>
                        <p className="text-sm">• Phase III: EGFR-BiTE + Durvalumab (NCT04567830)</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">EGFR + Chemotherapy</p>
                        <p className="text-sm">• Phase II: EGFR-TKI + Cisplatin (NCT04567831)</p>
                        <p className="text-sm">• Phase I: EGFR-Degrader + Carboplatin (NCT04567832)</p>
                        <p className="text-sm">• Phase II: EGFR-BiTE + Pemetrexed (NCT04567833)</p>
                      </div>
                    </div>
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
