// Test script to demonstrate UI changes
console.log('Setting up test data for UI changes...');

// Set user inputs for testing
const testUserInputs = {
  target: "HER2",
  indication: "HER2-Positive Breast Cancer", 
  modality: "ADC",
  geography: "US",
  developmentPhase: "Phase 2"
};

localStorage.setItem('userInputs', JSON.stringify(testUserInputs));

// Set some test perplexity data
const testPerplexityData = {
  dealActivity: [
    {
      acquirer: "Roche",
      asset: "TGF-β inhibitor",
      indication: "NSCLC combination",
      rationale: "Combo potential with PD-L1",
      date: "Q2 2024",
      value: "$1.8B",
      stage: "Phase II"
    },
    {
      acquirer: "Merck", 
      asset: "KRAS G12C inhibitor",
      indication: "NSCLC",
      rationale: "Resistance mechanism coverage",
      date: "Q1 2024",
      value: "$2.1B",
      stage: "Phase III"
    }
  ],
  pipelineAnalysis: {
    crowdingPercent: "35%",
    strategicFitRank: "78%",
    competitiveThreats: ["Emerging Modalities", "Biosimilar Timeline", "Regulatory Headwinds"]
  },
  dealCommentary: "Strong deal activity in the EGFR space with multiple strategic acquisitions focused on combination therapies and resistance mechanisms."
};

localStorage.setItem('perplexityResult', JSON.stringify(testPerplexityData));

console.log('Test data set! Refresh the page to see the UI changes.');
console.log('You should now see:');
console.log('1. User inputs displayed under the title');
console.log('2. Deal activity with collapsible "More Details" buttons');
console.log('3. Extended Pipeline Details section with blurred content'); 