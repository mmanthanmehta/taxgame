// Global Variables
let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 20;
const timeLimit = 60; // Time limit in seconds
let timerId;
let timeLeft;
let selectedQuestions; // Declare globally

// Quiz data (20 questions)
const quizData = [
    { question: "What is the basic exemption limit for individuals under 60 years of age in India for FY 2023-24?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹4 lakh"], correctAnswer: 0 },
    { question: "Under the new tax regime, what is the tax rate for an income between ₹5 lakh to ₹7.5 lakh?", options: ["5%", "10%", "15%", "20%"], correctAnswer: 1 },
    { question: "Which section allows for a deduction on investments such as PPF, ELSS, and LIC premiums?", options: ["Section 80D", "Section 80E", "Section 80C", "Section 24"], correctAnswer: 2 },
    { question: "What is the GST rate applicable to most goods and services in India?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "Which form is used to file Income Tax Returns by salaried individuals?", options: ["ITR-1", "ITR-2", "ITR-3", "ITR-4"], correctAnswer: 0 },
    { question: "What is the due date for filing Income Tax Returns for individuals?", options: ["15th March", "31st July", "30th September", "31st December"], correctAnswer: 1 },
    { question: "What is the maximum limit for claiming tax deduction on health insurance premiums under Section 80D?", options: ["₹25,000", "₹50,000", "₹1 lakh", "₹75,000"], correctAnswer: 1 },
    { question: "Which section allows for tax deductions on interest earned from savings accounts?", options: ["Section 80TTA", "Section 80C", "Section 80E", "Section 80G"], correctAnswer: 0 },
    { question: "What is the maximum tax rebate available under Section 87A for individuals with income less than ₹5 lakh?", options: ["₹5,000", "₹7,500", "₹10,000", "₹12,500"], correctAnswer: 3 },
    { question: "What is the GST rate for essential items like food grains in India?", options: ["0%", "5%", "12%", "18%"], correctAnswer: 0 },
    { question: "Which section provides deductions for the interest paid on loans for affordable housing?", options: ["Section 80E", "Section 80G", "Section 80EEA", "Section 24"], correctAnswer: 2 },
    { question: "What is the tax rate for long-term capital gains exceeding ₹1 lakh?", options: ["5%", "10%", "15%", "20%"], correctAnswer: 1 },
    { question: "Which section deals with donations to charitable institutions for tax deductions?", options: ["Section 80C", "Section 80E", "Section 80G", "Section 24"], correctAnswer: 2 },
    { question: "What is the maximum deduction limit under Section 24 for home loan interest on a self-occupied property?", options: ["₹1.5 lakh", "₹2 lakh", "₹2.5 lakh", "₹3 lakh"], correctAnswer: 1 },
    { question: "Which income is exempt from tax under Section 10(1)?", options: ["Rental income", "Agricultural income", "Salary", "Capital gains"], correctAnswer: 1 },
    { question: "What is the surcharge applicable for individuals with income exceeding ₹1 crore?", options: ["5%", "10%", "15%", "25%"], correctAnswer: 2 },
    { question: "What is the maximum limit for deductions under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "₹2.5 lakh"], correctAnswer: 1 },
    { question: "Under GST, what is the composition scheme turnover limit for service providers?", options: ["₹50 lakh", "₹75 lakh", "₹1 crore", "₹2 crore"], correctAnswer: 1 },
    { question: "What is the penalty for late filing of Income Tax Returns?", options: ["₹1,000", "₹5,000", "₹10,000", "₹50,000"], correctAnswer: 3 },
    { question: "Which of the following is a direct tax?", options: ["GST", "Income Tax", "Excise Duty", "Sales Tax"], correctAnswer: 1 },
    { question: "What is the current GST rate for luxury cars in India?", options: ["18%", "28%", "12%", "5%"], correctAnswer: 1 },
    { question: "Which section of the Income Tax Act deals with the taxation of gifts?", options: ["Section 56", "Section 80", "Section 80C", "Section 10"], correctAnswer: 0 },
    { question: "What is the due date for TDS payment?", options: ["7th of the following month", "15th of the following month", "30th of the following month", "31st of the month"], correctAnswer: 0 },
    { question: "Which section allows deductions for contributions to the National Pension System (NPS)?", options: ["Section 80C", "Section 80CCD", "Section 80D", "Section 80E"], correctAnswer: 1 },
    { question: "What is the maximum contribution limit for NPS under Section 80CCD(1B)?", options: ["₹50,000", "₹1 lakh", "₹2 lakh", "₹1.5 lakh"], correctAnswer: 0 },
    { question: "What is the maximum limit for tax deduction on interest paid on housing loans under Section 24?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "₹2.5 lakh"], correctAnswer: 1 },
    { question: "What is the definition of a resident individual for tax purposes?", options: ["Stays in India for 182 days", "Stays in India for 60 days", "Stays in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the tax rate for short-term capital gains on listed equity shares?", options: ["15%", "10%", "20%", "5%"], correctAnswer: 0 },
    { question: "Under the GST regime, what is the threshold limit for GST registration for service providers?", options: ["₹20 lakh", "₹10 lakh", "₹30 lakh", "₹50 lakh"], correctAnswer: 0 },
    { question: "Which section provides for a standard deduction for salaried individuals?", options: ["Section 80C", "Section 80D", "Section 16", "Section 24"], correctAnswer: 2 },
    { question: "What is the maximum amount deductible under Section 80E for education loans?", options: ["₹50,000", "₹1 lakh", "₹1.5 lakh", "No limit"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "₹5,000"], correctAnswer: 2 },
    { question: "What is the effective GST rate for the sale of gold?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "Which of the following is not a source of income for tax purposes?", options: ["Salary", "Capital Gains", "Gifts", "Lottery Winnings"], correctAnswer: 2 },
    { question: "What is the limit for claiming deduction under Section 80G for donations?", options: ["50%", "100%", "75%", "No limit"], correctAnswer: 1 },
    { question: "What is the tax rate for a company with a turnover of up to ₹400 crore under the new tax regime?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 0 },
    { question: "What is the maximum deduction available for interest on home loans under Section 80EEA?", options: ["₹1.5 lakh", "₹2 lakh", "₹2.5 lakh", "₹3 lakh"], correctAnswer: 0 },
    { question: "What is the limit of tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "₹2 lakh", "No limit"], correctAnswer: 3 },
    { question: "Which of the following is a benefit of filing income tax returns?", options: ["Loan eligibility", "Visa applications", "Proof of income", "All of the above"], correctAnswer: 3 },
    { question: "What is the threshold limit for a tax audit in India?", options: ["₹1 crore", "₹2 crore", "₹5 crore", "₹10 crore"], correctAnswer: 0 },
    { question: "What is the penalty for filing a defective return?", options: ["₹5,000", "₹10,000", "₹25,000", "No penalty"], correctAnswer: 1 },
    { question: "What is the GST rate for restaurant services?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the maximum limit for deductions on interest on education loans?", options: ["₹50,000", "₹1 lakh", "₹1.5 lakh", "No limit"], correctAnswer: 3 },
    { question: "Which form is used for filing GST returns?", options: ["GSTR-1", "GSTR-2", "GSTR-3", "All of the above"], correctAnswer: 3 },
    { question: "What is the due date for filing GST returns for monthly taxpayers?", options: ["10th of next month", "15th of next month", "20th of next month", "25th of next month"], correctAnswer: 0 },
    { question: "What is the penalty for non-payment of GST?", options: ["₹5,000", "₹10,000", "₹25,000", "Interest on dues"], correctAnswer: 3 },
    { question: "What is the threshold limit for the composition scheme under GST for service providers?", options: ["₹20 lakh", "₹50 lakh", "₹75 lakh", "₹1 crore"], correctAnswer: 1 },
    { question: "What is the tax treatment for dividend income above ₹10 lakh?", options: ["Tax-free", "10%", "20%", "30%"], correctAnswer: 1 },
    { question: "Which of the following is a type of indirect tax?", options: ["Income Tax", "Corporate Tax", "Excise Duty", "Capital Gains Tax"], correctAnswer: 2 },
    { question: "What is the limit for claiming a deduction for contributions to a pension fund under Section 80CCC?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 0 },
    { question: "What is the definition of a non-resident Indian (NRI) for tax purposes?", options: ["Stays in India for less than 182 days", "Stays in India for more than 182 days", "Stays in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the due date for filing TDS returns?", options: ["15th of the following month", "30th of the following month", "7th of the following month", "31st of the month"], correctAnswer: 2 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "Which of the following is exempt from GST?", options: ["Education", "Health services", "Food grains", "All of the above"], correctAnswer: 3 },
    { question: "What is the time limit for filing an appeal against an income tax order?", options: ["30 days", "60 days", "90 days", "120 days"], correctAnswer: 1 },
    { question: "What is the penalty for non-compliance with GST regulations?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the tax rate for foreign companies operating in India?", options: ["30%", "40%", "25%", "22%"], correctAnswer: 1 },
    { question: "Which section deals with tax treatment for income from business and profession?", options: ["Section 28", "Section 44AD", "Section 44AE", "All of the above"], correctAnswer: 3 },
    { question: "What is the penalty for filing a late return?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on income"], correctAnswer: 3 },
    { question: "Which tax is levied on the supply of goods and services?", options: ["Income Tax", "Sales Tax", "GST", "Excise Duty"], correctAnswer: 2 },
    { question: "What is the tax rate on short-term capital gains for equity shares?", options: ["10%", "15%", "20%", "30%"], correctAnswer: 1 },
    { question: "Which of the following is not an indirect tax?", options: ["GST", "Excise Duty", "Income Tax", "Customs Duty"], correctAnswer: 2 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum deduction limit under Section 80E for interest on education loans?", options: ["₹1 lakh", "₹1.5 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "Which of the following is a type of capital gain?", options: ["Short-term", "Long-term", "Both", "None"], correctAnswer: 2 },
    { question: "What is the current limit for tax-free interest from savings accounts?", options: ["₹10,000", "₹50,000", "₹2,500", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum amount deductible under Section 80GG for house rent?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 2 },
    { question: "Which tax is levied on the income of corporations?", options: ["Income Tax", "Corporate Tax", "Wealth Tax", "Capital Gains Tax"], correctAnswer: 1 },
    { question: "What is the threshold limit for e-filing of Income Tax Returns for individual taxpayers?", options: ["₹5 lakh", "₹10 lakh", "₹2.5 lakh", "₹3 lakh"], correctAnswer: 2 },
    { question: "What is the tax rate for income from other sources?", options: ["10%", "20%", "30%", "Applicable slab rates"], correctAnswer: 3 },
    { question: "Which section allows for deductions for medical expenses?", options: ["Section 80D", "Section 80E", "Section 80G", "Section 80C"], correctAnswer: 0 },
    { question: "What is the effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the income limit for availing the standard deduction?", options: ["No limit", "₹2.5 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the due date for filing the GST annual return?", options: ["31st July", "30th September", "31st December", "30th November"], correctAnswer: 2 },
    { question: "Which form is used for filing TDS returns?", options: ["Form 26AS", "Form 16", "Form 24Q", "Form 27EQ"], correctAnswer: 2 },
    { question: "What is the current rate of TDS on interest income?", options: ["10%", "20%", "30%", "No TDS on interest income"], correctAnswer: 0 },
    { question: "What is the threshold limit for claiming deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "Which of the following incomes is subject to tax under the head 'Capital Gains'?", options: ["Salary", "Business income", "Sale of property", "None of the above"], correctAnswer: 2 },
    { question: "What is the penalty for filing a delayed TDS return?", options: ["₹1,000", "₹10,000", "₹25,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the tax rate for the sale of residential property held for more than two years?", options: ["10%", "20%", "30%", "5%"], correctAnswer: 1 },
    { question: "Which of the following is a method of calculating capital gains?", options: ["FIFO", "LIFO", "Weighted Average", "All of the above"], correctAnswer: 3 },
    { question: "What is the penalty for not maintaining books of accounts?", options: ["₹10,000", "₹25,000", "₹50,000", "No penalty"], correctAnswer: 1 },
    { question: "What is the limit for claiming a deduction on donations made to political parties?", options: ["₹2,500", "₹5,000", "No limit", "₹1 lakh"], correctAnswer: 2 },
    { question: "Which section deals with the taxation of income from salary?", options: ["Section 15", "Section 16", "Section 17", "All of the above"], correctAnswer: 3 },
    { question: "What is the rate of tax on income from other sources?", options: ["10%", "20%", "30%", "Slab rates"], correctAnswer: 3 },
    { question: "Which of the following is not taxable under Income Tax?", options: ["Income from salary", "Capital gains", "Gift from relatives", "Income from property"], correctAnswer: 2 },
    { question: "What is the rate of interest on delayed payment of tax?", options: ["6%", "9%", "12%", "15%"], correctAnswer: 2 },
    { question: "Which of the following is a tax-free allowance?", options: ["House Rent Allowance", "Travel Allowance", "Daily Allowance", "All of the above"], correctAnswer: 3 },
    { question: "What is the current tax rate for cooperative societies?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 1 },
    { question: "What is the limit for claiming a deduction under Section 80CCG for Rajiv Gandhi Equity Saving Scheme?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the income tax rate for women below 60 years of age?", options: ["5%", "10%", "15%", "20%"], correctAnswer: 3 },
    { question: "What is the threshold limit for TDS on rental income?", options: ["₹1 lakh", "₹2.5 lakh", "₹3 lakh", "₹4 lakh"], correctAnswer: 0 },
    { question: "What is the current tax rate for individuals with income between ₹10 lakh and ₹12.5 lakh?", options: ["20%", "30%", "10%", "15%"], correctAnswer: 1 },
    { question: "What is the definition of 'capital asset' as per Income Tax Act?", options: ["Property of any kind", "Stock-in-trade", "Personal effects", "All of the above"], correctAnswer: 0 },
    { question: "What is the tax rate for foreign income?", options: ["10%", "20%", "30%", "As per slab rates"], correctAnswer: 3 },
    { question: "What is the threshold limit for income tax on NRIs?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the maximum amount of tax-free interest income from savings accounts for senior citizens?", options: ["₹50,000", "₹1 lakh", "No limit", "₹10,000"], correctAnswer: 0 },
    { question: "What is the current tax rate for companies with a turnover of up to ₹400 crore?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 2 },
    { question: "Which section allows deductions for interest on education loans?", options: ["Section 80E", "Section 80C", "Section 80D", "Section 80G"], correctAnswer: 0 },
    { question: "What is the current effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the limit for claiming deductions under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "Which section allows for tax deductions on donations to political parties?", options: ["Section 80G", "Section 80C", "Section 80E", "Section 24"], correctAnswer: 0 },
    { question: "What is the due date for GST registration?", options: ["15th of the following month", "31st of the following month", "Within 30 days of turnover", "As per the company law"], correctAnswer: 2 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the current GST rate for electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the definition of a resident Indian?", options: ["A person residing in India for 182 days", "A person residing in India for 60 days", "A person who has been in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "Which of the following is not a source of income?", options: ["Salary", "Gifts", "Business income", "Capital gains"], correctAnswer: 1 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the due date for filing income tax returns for individuals?", options: ["31st July", "31st December", "30th September", "15th March"], correctAnswer: 0 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the effective GST rate for the sale of precious metals?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "What is the maximum limit for tax-free interest from savings accounts for senior citizens?", options: ["₹50,000", "₹1 lakh", "No limit", "₹10,000"], correctAnswer: 0 },
    { question: "What is the penalty for late filing of income tax returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on income"], correctAnswer: 3 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the current rate of tax on long-term capital gains on listed shares?", options: ["10%", "15%", "20%", "No tax"], correctAnswer: 0 },
    { question: "What is the threshold limit for income tax on NRIs?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the limit for tax-free gifts received from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum deduction available for interest on home loans under Section 80EEA?", options: ["₹1.5 lakh", "₹2 lakh", "No limit", "₹2.5 lakh"], correctAnswer: 0 },
    { question: "What is the tax rate on income from other sources?", options: ["10%", "20%", "30%", "Applicable slab rates"], correctAnswer: 3 },
    { question: "What is the tax rate for a company with a turnover of up to ₹400 crore under the new tax regime?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 2 },
    { question: "What is the current effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "Which of the following is a type of indirect tax?", options: ["Income Tax", "Corporate Tax", "Excise Duty", "Wealth Tax"], correctAnswer: 2 },
    { question: "What is the due date for filing TDS returns?", options: ["15th of the following month", "30th of the following month", "7th of the following month", "31st of the month"], correctAnswer: 2 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "Which section deals with tax treatment for income from business and profession?", options: ["Section 28", "Section 44AD", "Section 44AE", "All of the above"], correctAnswer: 3 },
    { question: "What is the threshold limit for e-filing of Income Tax Returns for individual taxpayers?", options: ["₹5 lakh", "₹10 lakh", "₹2.5 lakh", "₹3 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the tax rate for foreign income?", options: ["10%", "20%", "30%", "As per slab rates"], correctAnswer: 3 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the current limit for tax-free interest from savings accounts?", options: ["₹10,000", "₹50,000", "₹2,500", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum amount deductible under Section 80GG for house rent?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 2 },
    { question: "Which tax is levied on the income of corporations?", options: ["Income Tax", "Corporate Tax", "Wealth Tax", "Capital Gains Tax"], correctAnswer: 1 },
    { question: "What is the current tax rate for cooperative societies?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 1 },
    { question: "What is the limit for claiming a deduction under Section 80CCG for Rajiv Gandhi Equity Saving Scheme?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the current rate of tax on long-term capital gains on listed shares?", options: ["10%", "15%", "20%", "No tax"], correctAnswer: 0 },
    { question: "What is the limit for claiming deductions under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the tax rate for income from capital gains?", options: ["10%", "20%", "30%", "As per slab rates"], correctAnswer: 3 },
    { question: "What is the penalty for late filing of income tax returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on income"], correctAnswer: 3 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the due date for filing income tax returns for individuals?", options: ["31st July", "31st December", "30th September", "15th March"], correctAnswer: 0 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the due date for filing GST returns for monthly taxpayers?", options: ["10th of next month", "15th of next month", "20th of next month", "25th of next month"], correctAnswer: 0 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the current GST rate for electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the definition of a resident Indian?", options: ["A person residing in India for 182 days", "A person residing in India for 60 days", "A person who has been in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "Which of the following is not a source of income?", options: ["Salary", "Gifts", "Business income", "Capital gains"], correctAnswer: 1 },
    { question: "What is the current effective GST rate for the sale of precious metals?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the threshold limit for claiming deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the penalty for filing a late return?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on income"], correctAnswer: 3 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "Which of the following is exempt from GST?", options: ["Education", "Health services", "Food grains", "All of the above"], correctAnswer: 3 },
    { question: "What is the effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the limit for claiming a deduction on donations made to political parties?", options: ["₹2,500", "₹5,000", "No limit", "₹1 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the definition of a non-resident Indian (NRI) for tax purposes?", options: ["Stays in India for less than 182 days", "Stays in India for more than 182 days", "Stays in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the current GST rate for the sale of electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the current GST rate for the sale of precious metals?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "What is the due date for filing GST returns for monthly taxpayers?", options: ["10th of next month", "15th of next month", "20th of next month", "25th of next month"], correctAnswer: 0 },
    { question: "What is the definition of a capital asset as per Income Tax Act?", options: ["Property of any kind", "Stock-in-trade", "Personal effects", "All of the above"], correctAnswer: 0 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the threshold limit for TDS on rental income?", options: ["₹1 lakh", "₹2.5 lakh", "₹3 lakh", "₹4 lakh"], correctAnswer: 0 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the current tax rate for cooperative societies?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 1 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the maximum deduction limit under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the current effective GST rate for the sale of precious metals?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "What is the definition of a non-resident Indian (NRI) for tax purposes?", options: ["Stays in India for less than 182 days", "Stays in India for more than 182 days", "Stays in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the penalty for late filing of income tax returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on income"], correctAnswer: 3 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the current limit for tax-free interest from savings accounts?", options: ["₹10,000", "₹50,000", "₹2,500", "No limit"], correctAnswer: 0 },
    { question: "What is the threshold limit for income tax on NRIs?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the tax rate for income from other sources?", options: ["10%", "20%", "30%", "Applicable slab rates"], correctAnswer: 3 },
    { question: "What is the maximum amount deductible under Section 80EEA for interest on home loans?", options: ["₹1.5 lakh", "₹2 lakh", "No limit", "₹2.5 lakh"], correctAnswer: 0 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the due date for filing income tax returns for individuals?", options: ["31st July", "31st December", "30th September", "15th March"], correctAnswer: 0 },
    { question: "What is the current tax rate for cooperative societies?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 1 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the current effective GST rate for the sale of precious metals?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the threshold limit for claiming a deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the definition of a non-resident Indian (NRI) for tax purposes?", options: ["Stays in India for less than 182 days", "Stays in India for more than 182 days", "Stays in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the penalty for late filing of income tax returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on income"], correctAnswer: 3 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the threshold limit for claiming a deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the limit for tax-free gifts received from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the definition of a capital asset as per Income Tax Act?", options: ["Property of any kind", "Stock-in-trade", "Personal effects", "All of the above"], correctAnswer: 0 },
    { question: "What is the current GST rate for electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the current effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the effective GST rate for the sale of precious metals?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the due date for filing income tax returns for individuals?", options: ["31st July", "31st December", "30th September", "15th March"], correctAnswer: 0 },
    { question: "What is the current tax rate for cooperative societies?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 1 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the definition of a resident Indian?", options: ["A person residing in India for 182 days", "A person residing in India for 60 days", "A person who has been in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the definition of a non-resident Indian (NRI) for tax purposes?", options: ["Stays in India for less than 182 days", "Stays in India for more than 182 days", "Stays in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the current GST rate for electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the maximum deduction limit under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the current effective GST rate for the sale of precious metals?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the threshold limit for claiming a deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the current effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the definition of a resident Indian?", options: ["A person residing in India for 182 days", "A person residing in India for 60 days", "A person who has been in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the definition of a capital asset as per Income Tax Act?", options: ["Property of any kind", "Stock-in-trade", "Personal effects", "All of the above"], correctAnswer: 0 },
    { question: "What is the current limit for tax-free interest from savings accounts?", options: ["₹10,000", "₹50,000", "₹2,500", "No limit"], correctAnswer: 0 },
    { question: "What is the current effective GST rate for the sale of electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the maximum deduction limit under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the threshold limit for TDS on rental income?", options: ["₹1 lakh", "₹2.5 lakh", "₹3 lakh", "₹4 lakh"], correctAnswer: 0 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the current tax rate for cooperative societies?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 1 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the threshold limit for income tax on NRIs?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the definition of a non-resident Indian (NRI) for tax purposes?", options: ["Stays in India for less than 182 days", "Stays in India for more than 182 days", "Stays in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the definition of a capital asset as per Income Tax Act?", options: ["Property of any kind", "Stock-in-trade", "Personal effects", "All of the above"], correctAnswer: 0 },
    { question: "What is the current GST rate for electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the threshold limit for claiming a deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the limit for tax-free gifts received from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the threshold limit for claiming a deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the maximum deduction limit under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the definition of a capital asset as per Income Tax Act?", options: ["Property of any kind", "Stock-in-trade", "Personal effects", "All of the above"], correctAnswer: 0 },
    { question: "What is the definition of a resident Indian?", options: ["A person residing in India for 182 days", "A person residing in India for 60 days", "A person who has been in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the current tax rate for cooperative societies?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 1 },
    { question: "What is the maximum deduction limit under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the penalty for late filing of income tax returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on income"], correctAnswer: 3 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the threshold limit for claiming a deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the current effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the definition of a non-resident Indian (NRI) for tax purposes?", options: ["Stays in India for less than 182 days", "Stays in India for more than 182 days", "Stays in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the threshold limit for claiming a deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the maximum deduction limit under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the current tax rate for cooperative societies?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 1 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the definition of a non-resident Indian (NRI) for tax purposes?", options: ["Stays in India for less than 182 days", "Stays in India for more than 182 days", "Stays in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the penalty for late filing of income tax returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on income"], correctAnswer: 3 },
    { question: "What is the definition of a resident Indian?", options: ["A person residing in India for 182 days", "A person residing in India for 60 days", "A person who has been in India for 120 days", "None of the above"], correctAnswer: 0 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the threshold limit for income tax on NRIs?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the maximum amount deductible under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the maximum deduction limit under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the maximum amount deductible under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the current effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the current effective GST rate for the sale of electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for late filing of GST returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on delay"], correctAnswer: 3 },
    { question: "What is the threshold limit for income tax on NRIs?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the threshold limit for claiming a deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the current effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the current effective GST rate for the sale of electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the current effective GST rate for the sale of precious metals?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the threshold limit for income tax on NRIs?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the maximum deduction limit under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the current effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum amount deductible under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the penalty for late filing of income tax returns?", options: ["₹1,000", "₹5,000", "₹10,000", "Varies based on income"], correctAnswer: 3 },
    { question: "What is the threshold limit for claiming a deduction under Section 80G?", options: ["₹2,500", "₹5,000", "No limit", "Depends on the organization"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the limit for tax-free gifts received from relatives?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the maximum deduction limit under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the current tax rate for cooperative societies?", options: ["25%", "30%", "22%", "15%"], correctAnswer: 1 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the effective GST rate for hotel accommodation?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the current effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the penalty for not filing a GST return?", options: ["₹5,000", "₹10,000", "₹25,000", "Varies as per case"], correctAnswer: 3 },
    { question: "What is the current effective GST rate for the sale of electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the maximum deduction limit under Section 80C?", options: ["₹1 lakh", "₹1.5 lakh", "₹2 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the definition of a capital asset as per Income Tax Act?", options: ["Property of any kind", "Stock-in-trade", "Personal effects", "All of the above"], correctAnswer: 0 },
    { question: "What is the current effective GST rate for telecom services?", options: ["12%", "18%", "28%", "5%"], correctAnswer: 1 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the threshold limit for income tax on NRIs?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 },
    { question: "What is the current effective GST rate for the sale of electric vehicles?", options: ["5%", "12%", "18%", "28%"], correctAnswer: 0 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the maximum amount deductible under Section 80D for health insurance premiums?", options: ["₹25,000", "₹50,000", "₹1 lakh", "No limit"], correctAnswer: 1 },
    { question: "What is the maximum deduction limit under Section 80E for interest on education loans?", options: ["₹50,000", "₹1 lakh", "No limit", "₹2 lakh"], correctAnswer: 2 },
    { question: "What is the penalty for tax evasion?", options: ["₹5,000", "₹10,000", "₹25,000", "As per law"], correctAnswer: 3 },
    { question: "What is the income limit for availing a tax rebate under Section 87A?", options: ["₹3 lakh", "₹4 lakh", "₹5 lakh", "₹6 lakh"], correctAnswer: 2 },
    { question: "What is the current effective GST rate for the sale of precious metals?", options: ["0%", "1%", "3%", "5%"], correctAnswer: 2 },
    { question: "What is the penalty for failing to link PAN with Aadhaar?", options: ["₹500", "₹1,000", "₹10,000", "No penalty"], correctAnswer: 2 },
    { question: "What is the threshold limit for income tax on NRIs?", options: ["₹2.5 lakh", "₹3 lakh", "₹5 lakh", "₹10 lakh"], correctAnswer: 0 },
    { question: "What is the limit for tax-free gifts from friends?", options: ["₹10,000", "₹25,000", "₹50,000", "No limit"], correctAnswer: 0 }
]

// Shuffle the quiz data function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Select random questions from quizData
function selectRandomQuestions(data, numberOfQuestions) {
    shuffleArray(data); // Shuffle the array
    return data.slice(0, numberOfQuestions); // Take the first 'numberOfQuestions' elements
}

// Start Game Function (updated)
function startGame() {
    // Hide the start screen and show the game container
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
    score = 0; // Reset score
    currentQuestionIndex = 0;
    timeLeft = timeLimit; // Set time left to the limit
    selectedQuestions = selectRandomQuestions(quizData, totalQuestions); // Select random questions
    document.getElementById('result-screen').classList.add('hidden');
    createTimerDisplay(); // Create timer display
    startTimer(); // Start the timer
    showNextQuestion(selectedQuestions); // Pass selectedQuestions
}

// Create Timer Display Function
function createTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    
    if (timerDisplay) {
        timerDisplay.style.display = 'block'; // Ensure it's visible
        timerDisplay.innerText = `Time Left: ${timeLeft}`; // Initialize the display
    } else {
        console.error("Timer display element not found.");
    }
}

// Timer Function
function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timerDisplay').innerText = `Time Left: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            showResult(); // Show result when time is up
        }
    }, 1000);
}
// Wrap text function
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

// Show Next Question Function (updated)
function showNextQuestion(selectedQuestions) {
    if (currentQuestionIndex < selectedQuestions.length) {
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        const questionText = currentQuestion.question;
        const options = currentQuestion.options;

        // Set the question text in the canvas
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#16423C';
        ctx.font = '24px Montserrat';
        ctx.fillText(questionText, 20, 50);

        // Set maxWidth and lineHeight for text wrapping
        const maxWidth = canvas.width - 40; // Leave some padding
        const lineHeight = 30;
        const x = 20; // Starting x position
        const y = 50; // Starting y position
        wrapText(ctx, questionText, x, y, maxWidth, lineHeight);
        // Set the options text in the buttons
        document.getElementById('option1').innerText = options[0];
        document.getElementById('option2').innerText = options[1];
        document.getElementById('option3').innerText = options[2];
        document.getElementById('option4').innerText = options[3];
    } else {
        showResult(); // If all questions are answered, show the result screen
    }
}


// Answer Question Function
function answerQuestion(selectedOption) {
    const correctSound = document.getElementById('correctSound');
    const wrongSound = document.getElementById('wrongSound');
    if (currentQuestionIndex < selectedQuestions.length) { // Use selectedQuestions
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        
        // Play sound and update score based on the answer
        if (selectedOption === currentQuestion.correctAnswer) {
            correctSound.play(); // Play the correct sound
            score += 10; // Add 10 points for the correct answer
        } else {
            wrongSound.play(); // Play the wrong sound
            score -= 10; // Deduct 10 points for the incorrect answer
        }
        
        // Update the score display
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`;

        currentQuestionIndex++;

        // Show the next question or results if all questions are answered
        if (currentQuestionIndex < selectedQuestions.length) { // Use selectedQuestions
            showNextQuestion(selectedQuestions); // Pass selectedQuestions
        } else {
            showResult(); // Show result screen if all questions are answered
        }
    }
}

// Show Result Function
function showResult() {
    clearInterval(timerId); // Stop the timer
    document.getElementById('timerDisplay').style.display = 'none'; // Remove timer display
    document.getElementById('game-container').style.display = 'none'; // Hide game container
    document.getElementById('result-screen').style.display= 'flex'; // Show result screen

    // Play the game over sound
    const gameOverSound = document.getElementById('gameOverSound');
    gameOverSound.play(); // Play the game over sound

    // Update the score display on the result screen
    document.getElementById('finalScore').innerText = score; // Ensure this element exists
}

function restartGame() {
    score = 0; // Reset score
    currentQuestionIndex = 0; // Reset question index
    timeLeft = 60; // Reset timer

    const scoreDisplay = document.getElementById('scoreDisplay');
    const timerDisplay = document.getElementById('timerDisplay');

    // Check if the elements exist
    if (scoreDisplay && timerDisplay) {
        scoreDisplay.innerText = `Score: ${score}`; // Reset score display
        timerDisplay.innerText = `Time Left: ${timeLeft}`; // Reset timer display
    } else {
        console.error("Display elements not found."); // Log an error if elements are not found
        return; // Exit if elements are not found
    }

    clearInterval(timerId); // Clear any existing timer

    // Show game elements
    document.getElementById('timerDisplay').style.display = 'block'; // Make timer visible
    document.getElementById('game-container').style.display = 'block'; // Show game container
    document.getElementById('result-screen').style.display= 'none'; // Show result screen

    startGame(); // Start the game again
}

function startBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Add a listener for the first user interaction (e.g., click)
    document.addEventListener('click', function playMusic() {
        backgroundMusic.play().catch((error) => {
            console.log('Music could not play: ', error);
        });

        // Remove the event listener once the music starts
        document.removeEventListener('click', playMusic);
    });
}

// Start the game on page load
window.onload = function() {
    startBackgroundMusic();
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.muted = true; // Initially mute it to allow autoplay
    backgroundMusic.play(); // Start playing

    document.body.addEventListener('click', function() {
        backgroundMusic.muted = false; // Unmute when the user clicks anywhere on the page
    });

    // Show the start screen on page load
    document.getElementById('start-screen').style.display = 'flex'; // Display start screen
    document.getElementById('game-container').style.display = 'none'; // Hide game container
};






var crs = document.querySelector(".cursor")
var blur = document.querySelector(".cursor-blur")
document.addEventListener("mousemove",function(dets){
    crs.style.left = dets.x+"px"
    crs.style.top = dets.y+"px"
    blur.style.left = dets.x-200+"px"
    blur.style.top = dets.y-200+"px"
})

var h4all = document.querySelectorAll(".option-btn");
h4all.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    crs.style.scale = 3;
    crs.style.border = "1px solid #4fb180";
    crs.style.backgroundColor = "transparent";
  });
  elem.addEventListener("mouseleave", function () {
    crs.style.scale = 1;
    crs.style.border = "0px solid #95C11E";
    crs.style.backgroundColor = "#95C11E";
  });
});

