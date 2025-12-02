import Sidebar from "../components/SideBar";
import { useGenerateRecipe } from "../hooks/useGenerateRecipe";
import { useState } from "react";
import styles from "../styles/AIAssistant.module.css";
import AiModal from "../components/AiModal";
import ReactMarkdown from "react-markdown";


export default function AIAssistant() {
  const recipeQuery = useGenerateRecipe();
  const [openModal, setOpenModal] = useState(false);

  async function generateRecipe() {
    const result = await recipeQuery.refetch();
    if (result.data) setOpenModal(true);
  }

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.page}>
        <h1 className={styles.title}>AI Assistant</h1>
        <p className={styles.subtitle}>
          Let CookSmart help you decide faster and waste less.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Cook from my pantry</h3>
            <p>Get recipe ideas using only what you already have at home</p>

            <button onClick={generateRecipe}>
              {recipeQuery.isFetching ? "Generating..." : "Generate recipes"}
            </button>
          </div>
        </div>

     
        <AiModal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <h2>Generated Recipe</h2>
      
        {recipeQuery.isLoading && <p>Loading...</p>}
      
        {recipeQuery.data && (
          <div className={styles.markdown}>
            <ReactMarkdown>
              {recipeQuery.data}
            </ReactMarkdown>
          </div>
        )}
       </AiModal>
      
            </div>
        </div>
          );
        }
