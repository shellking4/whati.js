# whati.js
Whatsapp automation

Sometimes when it doesn't work follow this simple steps:

- Look for a directory called .wwebjs_auth  
- Delete the directory (We need to do that since the auth token that is stored in there for later access to whatsapp may expire causing the whole script not to work)
- Relaunch the script node index.js then authenticate with your phone whatsapp.
- Stop the script and make it run in background using pm2 pm2 start index.js
