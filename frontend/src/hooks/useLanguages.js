import { useState, useEffect } from "react"; 
import {add_language, delete_language} from  "../api/languages";

export default function useLanguages(initialLanguages, portfolioID, setLanguage, refresh){

      const [languages, setLanguages] = useState([]);
    
      // Reset languages and index whenever initialLanguages changes
      useEffect(() => {
        setLanguages(initialLanguages);
      }, [initialLanguages]);
    
    
      // Handles calling the add language API endpoint
      const addToLanguagesList = async (language) => {
        try {
    
          console.log(language)
            //construct request body 
          const languageData = {
            ...language,
            portfolio_id: portfolioID,
          };
    
          // call the add language API endpoint and passes the new language data
          await add_language(languageData);
          refresh();
    
          setLanguage({
            language_name: "",
            proficiency_level: 1,
          });
    
        } catch (error) {
          console.error(error.response?.data || error.message);
        }
      };
    
       // handle calling the delete language API endpoint
      const handleDeleteLanguage = async (languageID) => {
        try {
           // call delete language API endpoint and pass the language id
          await delete_language(languageID);
          refresh();
        } catch (error) {
          console.error(error.response?.data || error.message);
        }
      };


    return {languages, addToLanguagesList, handleDeleteLanguage}
}