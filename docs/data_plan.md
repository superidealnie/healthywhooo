# HealthyWhooo Data Plan

## Goal
Build a free ingredient knowledge base for products sold in Germany.

## Primary Sources
- Open Food Facts (human food, Germany)
- Open Pet Food Facts (dog and cat food)
- EU Food Additives reference for validation

## App Data Needs
For each ingredient:
- ingredient_name
- aliases
- species_mode
- risk_label
- what_is_it
- why_used
- health_impact
- fun_fact
- source

## Strategy
1. Start with a manually curated ingredient master table
2. Enrich it using Open Food Facts product data from Germany
3. Add pet-specific ingredients from Open Pet Food Facts
4. Build OCR only after the ingredient knowledge base is usable
