import Sidebar from "../components/SideBar";
import AiModal from "../components/AiModal";
import { useGenerateRecipe } from "../hooks/useGenerateRecipe";
import { useGenerateSubstitutions } from "../hooks/useGenerateSubstitutions";
import { useRecipes } from "../hooks/useRecipes";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import styles from "../styles/AIAssistant.module.css";

export default function AIAssistant() {
  const recipeQuery = useGenerateRecipe();
  const { data: recipes } = useRecipes();

  const [openRecipeModal, setOpenRecipeModal] = useState(false);

  const [openSubModal, setOpenSubModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const substitutionQuery = useGenerateSubstitutions(selectedRecipeId);

  async function generateRecipe() {
    const result = await recipeQuery.refetch();
    if (result.data) setOpenRecipeModal(true);
  }

  async function generateSubs() {
    if (!selectedRecipeId) return;

    const result = await substitutionQuery.refetch();
    if (result.data) setOpenSubModal(true);
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

        </div>

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
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>

          <button className={styles.subBtn} onClick={generateSubs}>
            {substitutionQuery.isFetching ? "Generating..." : "Generate Substitutions"}
          </button>

          <div className={styles.markdown}>
            {substitutionQuery.data && <ReactMarkdown>{substitutionQuery.data}</ReactMarkdown>}
          </div>
        </AiModal>

   
        <AiModal isOpen={openRecipeModal} onClose={() => setOpenRecipeModal(false)}>
          <h2>Generated Recipe</h2>
          {recipeQuery.data && (
            <div className={styles.markdown}>
              <ReactMarkdown>{recipeQuery.data}</ReactMarkdown>
            </div>
          )}
        </AiModal>

      </div>
    </div>
  );
}
