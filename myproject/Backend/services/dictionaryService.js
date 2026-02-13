const fetchWordFromAPI = async (word) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
  
      if (!response.ok) {
        throw new Error("Word not found");
      }
  
      const data = await response.json();
  
      return data[0];
    } catch (error) {
      throw new Error("Word not found");
    }
  };
  
  module.exports = { fetchWordFromAPI };
  