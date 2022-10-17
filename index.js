const { Client, LocalAuth} = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

const getGroupId = async () => {
    const tesGroupName = 'Test de message groupe'
    const prodGroupName = 'Gate Ekpe'
    const chats = await client.getChats()

    const groups = chats
        .filter(chat => chat.isGroup && chat.name == prodGroupName)
        .map(chat => {
            return {
                id: chat.id._serialized, 
                name: chat.name 
            }
        })
    return groups[0].id
}


client.initialize();


client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', async () => {
    console.log('READY');
    let groupId = await getGroupId()

    let timerId = setInterval(() => {
        client.sendMessage(
            `${groupId}`,
            `Mes salutations à vous chers collaborateurs à Ekpè.
            Nous osons espérer que tout se passe bien 
            Situation des Gates svp...
            `
        )
    }, 60000*60)
});

// client.on('message', async msg => {
//     let groupId = await getGroupId();
//     if (msg.from === groupId) {
//         client.sendMessage(
//             msg.from,
//             "Nous vous remercions de votre retour. Nous vous reviendrons promptement"
//         )
//     }
// });

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});