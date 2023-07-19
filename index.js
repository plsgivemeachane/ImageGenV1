const CharacterAI = require('./cai/index.js');
const characterAI = new CharacterAI();
const express = require("express")
const app = express()
const cors = require("cors")
let chat;

function compress(string) {
  string = unescape(encodeURIComponent(string));
  var newString = '',
    char, nextChar, combinedCharCode;
  for (var i = 0; i < string.length; i += 2) {
    char = string.charCodeAt(i);

    if ((i + 1) < string.length) {

      
      nextChar = string.charCodeAt(i + 1) - 31;

      
      combinedCharCode = char + "" + nextChar.toLocaleString('en', {
        minimumIntegerDigits: 2
      });

      newString += String.fromCharCode(parseInt(combinedCharCode, 10));

    } else {

     
      newString += string.charAt(i);
    }
  }
  return btoa(unescape(encodeURIComponent(newString)));
}

async function init(){
  await characterAI.authenticateWithToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJpc3MiOiJodHRwczovL2NoYXJhY3Rlci1haS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDQ1NTAwMTUwNDU2ODIwNTM3ODgiLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMC5jaGFyYWN0ZXIuYWkvIiwiaHR0cHM6Ly9jaGFyYWN0ZXItYWkudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4OTcxOTQ1NSwiZXhwIjoxNjkyMzExNDU1LCJhenAiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.cHCYZTVpfl-w0_azhR1ZUHxMDaRPKPIhUPK9yGo9qrzK0qxonyLqBhrx3Ua3H815bUT-L-eo1pyar5LPn9GHyJ7qszPKpPQdPR5F3QViU9wYgU40Iznd5ttY-7ZgVz-zA5cdF6yV6j-LlzVoEWImYkB51271sBmwWCAuen-NlaazuK801bSE32l2jORV0ZVV04w3hmlLgsKs9hNZp0vQCgJQWYYIYWyaANQM7dduRgKKsD0EMDzpew5wQKza2Nm5Rej0g4Ucz9y-ju-cB8cQWQ7z3Zjl30-Ytigoi1xdGp0WzftFNwxlidCb-gx9_ozGlFzVZsIid3YsjzL5iCslaw")
  console.log("Worked")
  const characterId = "bQBlcCVVjfTAzv8OWK30dw7Tj-TNtKC_Rh0Z46Dx6fY" // Discord moderator
  chat = await characterAI.createOrContinueChat(characterId);
}

async function bruh(prompt){
  const response = await chat.generateImage(prompt, true)
  console.log(response)
  return response
}

app.use(cors({
  origin:"https://imagegenv1.lequan3.repl.co"
}))

app.get("/", (req, res) => {
  res.send("Ok")
})

app.get("/prompt/:pr",async (req, res) => {
  const url = await bruh(req.params.pr)
  res.send(compress(url))
})

app.listen(3000, () => {
  console.log("Worked in 3000")
  init()
})