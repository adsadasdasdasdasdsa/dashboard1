const {  Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
//الرجاء عدم المس
var _0xaa2a=["\x2E\x2F\x64\x62","\x72\x65\x61\x64\x79","\x2E\x2F\x64\x61\x73\x68\x62\x6F\x61\x72\x64\x2F\x61\x70\x70\x2E\x6A\x73","\x75\x73\x65\x72\x6E\x61\x6D\x65","\x75\x73\x65\x72","\x6C\x6F\x67","\x50\x4C\x41\x59\x49\x4E\x47","\x66\x6F\x72\x20\x41\x68\x6D\x61\x64\x4D\x69","\x73\x65\x74\x41\x63\x74\x69\x76\x69\x74\x79","\x6F\x6E\x63\x65"];const db=require(_0xaa2a[0]);client[_0xaa2a[9]](_0xaa2a[1],()=>{const _0xda12x2=_0xaa2a[2];require(_0xda12x2)(client);console[_0xaa2a[5]](client[_0xaa2a[4]][_0xaa2a[3]]);client[_0xaa2a[4]][_0xaa2a[8]]({type:_0xaa2a[6],name:_0xaa2a[7]})})

//هذا مثال على الاوامر كيف تتطبق 
//setLang
client.on("messageCreate", message => {
    let prefix = db.get(`guild_${message.guild.id}`).prefix;
    let lang = db.get(`guild_${message.guild.id}`).lang;

if(message.content.startsWith(prefix + "user")){
switch (lang) {
    case "en": {
let user = message.mentions.users.first();
if(!user) {
    let embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setTitle(`info ${message.author.username}`)
    .addFields(
        {
            name:"createdAt", value:`${message.author.createdAt.toDateString()}`, inline:true
        }, 
        {
            name:'joinAt', value:`${message.member.joinedAt.toDateString()}`
        }
    )
    message.reply({embeds:[embed]})
}
    }
    break;
    case "ar": {
        let user = message.mentions.users.first();
        if(!user) {
            let embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`معلومات ${message.author.username}`)
            .addFields(
                {
                    name:"انشئ حسابه في", value:`${message.author.createdAt.toDateString()}`, inline:true
                }, 
                {
                    name:'انضم الى الخادم في', value:`${message.member.joinedAt.toDateString()}`
                }
            )
            message.reply({embeds:[embed]})
        }
    }
}


}
})








client.login('MTExNzEyMTI1MzEyMDE1OTc4Ng.G5vn4m.q5344gF605OFoyVL0V718hGon6kvS_B-nDSnKQ') /// your token here
//for AhmadMi