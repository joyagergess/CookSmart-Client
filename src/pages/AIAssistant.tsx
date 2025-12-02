import Sidebar from "../components/SideBar";
import AiModal from "../components/AiModal";
import { useGenerateRecipe } from "../hooks/useGenerateRecipe";
import { useGenerateSubstitutions } from "../hooks/useGenerateSubstitutions";
import { useWeeklySummary } from "../hooks/useWeeklySummary";
import { useRecipeNutrition } from "../hooks/useRecipeNutrition";
import { useRecipes } from "../hooks/useRecipes";

import ReactMarkdown from "react-markdown";
import { useState } from "react";
import styles from "../styles/AIAssistant.module.css";

export default function AIAssistant() {

  const { data: recipes } = useRecipes();

  const recipeQuery = useGenerateRecipe();
  const [openRecipeModal, setOpenRecipeModal] = useState(false);

  async function generateRecipe() {
    const result = await recipeQuery.refetch();
    if (result.data) setOpenRecipeModal(true);
  }

  const [openSubModal, setOpenSubModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const substitutionQuery = useGenerateSubstitutions(selectedRecipeId);

  async function generateSubs() {
    if (!selectedRecipeId) return;

    const result = await substitutionQuery.refetch();
    if (result.data) setOpenSubModal(true);
  }

  const weeklySummaryQuery = useWeeklySummary();
  const [openWeeklyModal, setOpenWeeklyModal] = useState(false);

  async function generateWeeklySummary() {
    const result = await weeklySummaryQuery.refetch();
    if (result.data) setOpenWeeklyModal(true);
  }


  const [openNutritionModal, setOpenNutritionModal] = useState(false);
  const [selectedNutritionRecipeId, setSelectedNutritionRecipeId] = useState<number | null>(null);

  const nutritionQuery = useRecipeNutrition(selectedNutritionRecipeId);

  async function generateNutrition() {
    if (!selectedNutritionRecipeId) return;

    const result = await nutritionQuery.refetch();
    if (result.data) setOpenNutritionModal(true);
  }

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.page}>
        <h1 className={styles.title}>AI Assistant</h1>
        <p className={styles.subtitle}>Let CookSmart help you decide faster and waste less.</p>

        <div className={styles.grid}>

    
          <div className={styles.card}>
            <h3>Cook from my pantry</h3>
            <p>Get recipe ideas using only what you already have at home</p>

            <button onClick={generateRecipe}>
              {recipeQuery.isFetching ? "Generating..." : "Generate recipes"}
            </button>
          </div>

          <div className={styles.card}>
            <h3>Smart substitutions</h3>
            <p>Missing an ingredient?<br />Get instant alternatives</p>

            <button onClick={() => setOpenSubModal(true)}>
              Generate missing ingredients
            </button>
          </div>

        
          <div className={styles.card}>
            <h3>Weekly summary</h3>
            <p>See how you performed this week:<br />spending, waste & plannings</p>

            <button onClick={generateWeeklySummary}>
              {weeklySummaryQuery.isFetching ? "Generating..." : "Generate summary"}
            </button>
          </div>

          <div className={styles.card}>
            <h3>Recipe nutrition</h3>
            <p>Get calories, macros and nutrition<br/>for any recipe</p>

            <button onClick={() => setOpenNutritionModal(true)}>
              Generate nutrition
            </button>
          </div>

        </div>

        <AiModal isOpen={openRecipeModal} onClose={() => setOpenRecipeModal(false)}>
          <h2>Generated Recipe</h2>

          {recipeQuery.data && (
            <div className={styles.markdown}>
              <ReactMarkdown>{recipeQuery.data}</ReactMarkdown>
            </div>
          )}
        </AiModal>


        <AiModal isOpen={openSubModal} onClose={() => setOpenSubModal(false)}>
          <h2>Smart Substitutions</h2>

          <label>Select a recipe:</label>
          <select
            className={styles.dropdown}
            value={selectedRecipeId ?? ""}
            onChange={(e) => setSelectedRecipeId(Number(e.target.value))}
          >
            <option value="">-- Choose a recipe --</option>
            {recipes?.map((r: any) => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>

          <button className={styles.subBtn} onClick={generateSubs}>
            {substitutionQuery.isFetching ? "Generating..." : "Generate Substitutions"}
          </button>

          <div className={styles.markdown}>
            {substitutionQuery.data && (
              <ReactMarkdown>{substitutionQuery.data}</ReactMarkdown>
            )}
          </div>
        </AiModal>


        <AiModal isOpen={openWeeklyModal} onClose={() => setOpenWeeklyModal(false)}>
          <h2>Weekly Summary</h2>

          {weeklySummaryQuery.isLoading && <p>Loading...</p>}

          {weeklySummaryQuery.data && (
            <div className={styles.markdown}>
              <ReactMarkdown>{weeklySummaryQuery.data}</ReactMarkdown>
            </div>
          )}
        </AiModal>

  
        <AiModal isOpen={openNutritionModal} onClose={() => setOpenNutritionModal(false)}>
          <h2>Recipe Nutrition</h2>

          <label>Select a recipe:</label>
          <select
            className={styles.dropdown}
            value={selectedNutritionRecipeId ?? ""}
            onChange={(e) => setSelectedNutritionRecipeId(Number(e.target.value))}
          >
            <option value="">-- Choose a recipe --</option>
            {recipes?.map((r: any) => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>

          <button className={styles.subBtn} onClick={generateNutrition}>
            {nutritionQuery.isFetching ? "Generating..." : "Generate Nutrition"}
          </button>

         {nutritionQuery.data && (() => {
         const data = JSON.parse(nutritionQuery.data);
       
         return (
           <div className={styles.nutritionBox}>
             
             <h3>Nutrition Summary</h3>
             <p><strong>Total Calories:</strong> {data.total_calories} kcal</p>
             <p><strong>Protein:</strong> {data.total_protein} g</p>
             <p><strong>Carbs:</strong> {data.total_carbs} g</p>
             <p><strong>Fat:</strong> {data.total_fat} g</p>
       
             <h3 style={{ marginTop: "1rem" }}>Per Ingredient</h3>
             {data.per_ingredient.map((item: any) => (
               <div key={item.name} className={styles.ingredientItem}>
                 <p><strong>{item.name}</strong></p>
                 <p>
                   {item.calories} kcal — {item.protein}g protein,{" "}
                   {item.carbs}g carbs, {item.fat}g fat
                 </p>
               </div>
             ))}
       
           </div>
         );
          })()}

        </AiModal>

      </div>
    </div>
  );
}
