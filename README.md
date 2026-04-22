# HealthyWhooo 

AI-powered ingredient scanner for transparent and informed food choices.

# Presentation:
https://canva.link/1pxsesdh60qiel0

## Overview

HealthyWhooo is a mobile-first web application that helps users understand food ingredient lists.  
It scans or processes ingredient text, highlights items using a traffic-light system, and provides simple explanations.

## Problem

Food labels are difficult to interpret due to:
- technical ingredient names and additives
- long and complex lists
- lack of time during shopping

This leads to confusion and low confidence in purchase decisions.

## Solution

The app provides:
- ingredient scanning (OCR or manual input)
- ingredient parsing with preserved order
- traffic-light classification:
  - green (low concern)
  - yellow (context-dependent)
  - red (recommended to limit)
- simple explanations for each ingredient
- human, dog, and cat modes

## Data Sources

The ingredient database is based on trusted public sources:
- European Commission – Food Additives Database
- European Food Safety Authority (EFSA)
- U.S. Food and Drug Administration (FDA)
- FEDIAF (European Pet Food Industry Federation)
- EU Catalogue of Feed Materials (Regulation (EU) No 68/2013)

## Data Structure

The system combines two datasets:

- `ingredients_master.csv`  
  used for matching, aliases, and metadata

- `ingredient_profiles.csv`  
  used for explanations and species-specific risk labels

Both are linked by `ingredient_key`.

## Tech Stack

- React / Next.js (Lovable)
- Tesseract.js (OCR)
- CSV-based database
- GitHub

## MVP Scope

Included:
- ingredient input (OCR + manual)
- classification system
- explanation view
- multi-species mode

Not included:
- nutrition tracking
- recommendations
- user accounts
- production backend

## Data Science Component

Goal: classify ingredients into risk categories.

Approach:
- baseline (rule-based)
- TF-IDF + Logistic Regression
- TF-IDF + Naive Bayes

## Disclaimer

This application provides informational content only and does not offer medical advice.

## Status

Early-stage MVP developed as a capstone project.
