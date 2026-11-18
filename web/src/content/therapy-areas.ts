import type { TherapyArea } from './types'

export const therapyAreas: TherapyArea[] = [
  { name: "Cardiovascular", conditions: "Hypertension, Surgery, Diabetes", keywords: ["cardiovascular", "hypertension", "surgery", "diabetes", "heart", "cardiology"] },
  { name: "Dermatology", conditions: "Psoriasis, Eczema, Actinic Keratosis, Fungal Nail & Skin Infections", keywords: ["dermatology", "psoriasis", "eczema", "actinic", "keratosis", "fungal", "nail", "skin", "infections"] },
  { name: "Endocrinology", conditions: "Interventional, Acromegaly, GHD (growth hormone deficiency), Hyperhidrosis", keywords: ["endocrinology", "interventional", "acromegaly", "growth", "hormone", "deficiency", "ghd", "hyperhidrosis", "hormones"] },
  { name: "Haematology", conditions: "Beta Thalassemia, Haemophilia, Stem Cell Mobilisation, ALCL, AML, APML, CLL, CML, DLBCL, FL, HL, MM", keywords: ["haematology", "hematology", "blood", "beta", "thalassemia", "haemophilia", "hemophilia", "stem", "cell", "mobilisation", "alcl", "anaplastic", "large", "lymphoma", "aml", "acute", "myeloid", "leukaemia", "leukemia", "apml", "promyelocytic", "cll", "chronic", "lymphocytic", "cml", "dlbcl", "diffuse", "b-cell", "b", "fl", "follicular", "hl", "hodgkin", "disease", "mm", "multiple", "myeloma", "lymphomas", "non-hodgkin", "nhl", "cancer"] },
  { name: "Hepatic", conditions: "Hepatitis B, Hepatitis C", keywords: ["hepatic", "hepatitis", "b", "c", "liver"] },
  { name: "Immunology", conditions: "Crohn's & UC (ulcerative colitis), HLH, Lupus, Psoriatic Arthritis, Rheumatoid Arthritis", keywords: ["immunology", "crohn's", "uc", "ulcerative", "colitis", "hlh", "haemophagocytic", "lymphohistiocytosis", "hemophagocytic", "lupus", "psoriatic", "arthritis", "rheumatoid"] },
  { name: "Infectious disease", conditions: "Anti-infectives, Anti-fungals, HIV", keywords: ["infectious", "disease", "anti-infectives", "anti-fungals", "hiv"] },
  { name: "Medical devices", conditions: "Surgery & Wound Care, Biosurgery, Fibrin Sealant, Haemostatic Matrix", keywords: ["medical", "devices", "surgery", "wound", "care", "biosurgery", "fibrin", "sealant", "haemostatic", "matrix"] },
  { name: "Men's health", conditions: "Erectile Dysfunction, HRT, LUTS, OAB", keywords: ["men's", "health", "erectile", "dysfunction", "hrt", "luts", "oab"] },
  { name: "Metabolic disorders", conditions: "Gaucher Disease, Gout, Hyperlipidaemia", keywords: ["metabolic", "disorders", "gaucher", "disease", "gout", "hyperlipidaemia"] },
  { name: "Neurology", conditions: "Addiction, ADHD, Alzheimer's, Chronic Migraine, Epilepsy, MND (motor neurone disease), Multiple Sclerosis, Parkinson's, Post-Stroke Spasticity, Schizophrenia", keywords: ["neurology", "addiction", "adhd", "attention", "deficit", "hyperactivity", "disorder", "alzheimer's", "chronic", "migraine", "epilepsy", "mnd", "motor", "neurone", "disease", "neuron", "multiple", "sclerosis", "parkinson's", "post-stroke", "spasticity", "schizophrenia", "brain"] },
  { name: "Oncology", conditions: "Brain, Breast, Prostate, GIST (gastrointestinal stromal tumour), Lung, Pancreatic", keywords: ["oncology", "brain", "breast", "prostate", "gist", "gastrointestinal", "stromal", "tumour", "tumor", "lung", "pancreatic", "lymphoma", "lymphomas", "cancer"] },
  { name: "Ophthalmology", conditions: "Macular Degeneration, Vernal Keratoconjunctivitis, Uveitis", keywords: ["ophthalmology", "macular", "degeneration", "vernal", "keratoconjunctivitis", "uveitis"] },
  { name: "Palliative care", conditions: "BTCP, Pain, Opioids", keywords: ["palliative", "care", "btcp", "pain", "opioids"] },
  { name: "Renal", conditions: "CKD, ESA, Hyponatraemia, PKD", keywords: ["renal", "ckd", "esa", "hyponatraemia", "pkd", "kidney"] },
  { name: "Respiratory", conditions: "Asthma, COPD, Cystic Fibrosis", keywords: ["respiratory", "asthma", "copd", "cystic", "fibrosis", "lungs"] },
  { name: "Transplantation", conditions: "BMT, Heart, Liver, Lung, Pancreas, Renal", keywords: ["transplantation", "bmt", "heart", "liver", "lung", "pancreas", "renal"] },
  { name: "Women's health", conditions: "Contraception, HRT, OAB, VVA", keywords: ["women's", "health", "contraception", "hrt", "oab", "vva"] },
]
