import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ExpandableDetail } from "@/components/expandable-detail"
import { SourceAttribution } from "@/components/source-attribution"
import { InteractiveCompetitor } from "@/components/interactive-competitor"

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

export function CompetitiveLandscape() {
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
          {competitorData.map((competitor, index) => (
            <InteractiveCompetitor key={index} competitor={competitor} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="deals" className="space-y-4">
        <div className="space-y-4">
          {deals.map((deal, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{deal.acquirer}</CardTitle>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{deal.value}</p>
                    <p className="text-sm text-slate-600">{deal.date}</p>
                  </div>
                </div>
                <CardDescription>
                  {deal.asset} • {deal.indication}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Stage at Acquisition:</span>
                    <p className="font-medium">{deal.stage}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Strategic Rationale:</span>
                    <p className="font-medium">{deal.rationale}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Market Commentary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700">
              Recent M&A activity suggests strong appetite for EGFR-targeting assets, with premium valuations for
              differentiated mechanisms. Combination potential and resistance coverage driving strategic interest.
              Average deal multiples: 8-12x peak sales for Phase II+ assets.
            </p>
          </CardContent>
        </Card>
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
                    <span className="text-sm font-bold text-orange-600">35%</span>
                    <ExpandableDetail
                      title="Pipeline Crowding Analysis"
                      value="35"
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
                <Progress value={35} className="h-2" />
                <p className="text-xs text-slate-600 mt-1">Moderate crowding - manageable competition</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Strategic Fit Rank</span>
                  <span className="text-sm font-bold text-green-600">78%</span>
                </div>
                <Progress value={78} className="h-2" />
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
                <div>
                  <h4 className="font-semibold text-sm text-slate-600 mb-2">Emerging Modalities</h4>
                  <ul className="text-sm space-y-1">
                    <li>• CAR-T therapies</li>
                    <li>• Protein degraders</li>
                    <li>• ADCs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-600 mb-2">Biosimilar Timeline</h4>
                  <p className="text-sm">First biosimilars expected 2029-2031 for current SOC</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-600 mb-2">Regulatory Headwinds</h4>
                  <p className="text-sm">Increasing safety requirements, combination trial complexity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
