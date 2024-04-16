const discord = require('discord.js-selfbot-v13');
const client = new discord.Client({ intents: new discord.Intents(32767) });
const { Sunucu, Token, URL_RAVGAR } = require('./System.json');

if (!Token) throw new TypeError("Discord Kullanıcı Tokeni Ayarlanmamış!"); // Hata Veriyor İse Ayarlanmamış,Token Yanlış Yada Rate Limit Yemiş Olabilir
if (!Sunucu) throw new TypeError("Sunucu İD Ayarlanmamış!"); 
if (!URL_RAVGAR) throw new TypeError("Sunucu Url'si Ayarlanmamış!");

if (URL_RAVGAR.includes("discord.gg/") || URL_RAVGAR.includes(".gg/") || URL_RAVGAR.includes("/")) {
    throw new TypeError("URL_RAVGAR, 'discord.gg/' İçermeli");
}
client.login(Token);
client.on('ready', () => {
    console.clear();
    console.log("Sniper Url Yakalayıcı Aktif Durumda!");
    const kontrol = async () => {
        const guild = client.guilds.cache.get(Sunucu);
        if (!guild) throw new TypeError("Sunucu Bulunamadı!");
        try {
            const lale = await guild.fetch();
            if (lale.vanityURLCode === URL_RAVGAR) {
                console.log(`${URL_RAVGAR} Başarıyla Sunucuya Alınmıştır!`);
                clearInterval(kontrols); 
                process.exit(1);
            }
            await guild.setVanityCode(URL_RAVGAR);
            console.log("URL Sunucuda ", URL_RAVGAR);
        } catch (error) {
            console.log(`${URL_RAVGAR} Dolu Yada Geçersiz!`);
        }
    };                                                 
    const kontrols = setInterval(kontrol, 0.01 * 1000); // kontrol zamanı değiştirilebilir örn: 1 dakika
});
