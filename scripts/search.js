// load initial games
document.addEventListener("DOMContentLoaded", () => {
    
    getDataResponse();
          
  });
  
  // get the response
  async function getDataResponse(){
      try{
          const dataResponse = await getApiResponse("fast");
          seeData(dataResponse);
      }catch(error){
          console.error(error);
      }
  }
  // fetch the api
  async function getApiResponse(word){
      try{
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
          if(!response.ok){
             console.log("Error bitch");
          }
          
          return await response.json();
  
      }catch(error){
          console.error(error);
      }
  }
  
  function seeData(data){
      console.log(data);
  }