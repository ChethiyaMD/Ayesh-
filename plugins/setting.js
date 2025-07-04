const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, fetchJson } = require('../lib/functions')
const { sizeFormatter } = require('human-readable')
const { GDriveDl } = require('../lib/gdrive.js')



// video

cmd({ 
    pattern: "video1", 
    alias: ["yt","mp4"], 
    react: "🎥", 
    desc: "Download Youtube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://api.bwmxmd.online/api/download/ytmp4?apikey=ibraah-help&url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }
        
        let ytmsg = `╭━━━〔 *𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃* 〕━━━┈⊷
┇๏ *Title* -  ${yts.title}
┇๏ *Duration* - ${yts.timestamp}
┇๏ *Views* -  ${yts.views}
┇๏ *Author* -  ${yts.author.name}
┇๏ *Link* -  ${yts.url}
╰────────────────┈⊷

> 𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃 🥷🇱🇰`;

        // Send video details
        await conn.sendMessage(from, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });
        
        // Send video file
        await conn.sendMessage(from, { video: { url: data.result.download_url }, mimetype: "video/mp4" }, { quoted: mek });
        
        // Send document file (optional)
        await conn.sendMessage(from, { 
            document: { url: data.result.download_url }, 
            mimetype: "video/mp4", 
            fileName: `${data.result.title}.mp4`, 
            caption: `> *${yts.title}*\n> 𝐏𝐎𝐖𝐄𝐑𝐃 𝘽𝙔 𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃 🥷🇱🇰`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});  
    
// play

cmd({ 
    pattern: "mp3", 
    alias: ["ytdl1", "song3"], 
    react: "🎥", 
    desc: "Download Youtube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }
        
        let ytmsg = `╭━━━〔 *𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃* 〕━━━┈⊷
┇๏ *Title* -  ${yts.title}
┇๏ *Duration* - ${yts.timestamp}
┇๏ *Views* -  ${yts.views}
┇๏ *Author* -  ${yts.author.name}
┇๏ *Link* -  ${yts.url}
╰────────────────┈⊷

> 𝐏𝐎𝐖𝐄𝐑𝐃 𝘽𝙔 𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃 🥷🇱🇰`;

        
        await conn.sendMessage(from, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });
        
        
        await conn.sendMessage(from, { audio: { url: data.result.download_url }, mimetype: "audio/mpeg" }, { quoted: mek });
        
        
        await conn.sendMessage(from, { 
            document: { url: data.result.download_url }, 
            mimetype: "audio/mpeg", 
            fileName: `${yts.title}.mp3`, 
            caption: `> *${yts.title}*\n> 𝐏𝐎𝐖𝐄𝐑𝐃 𝘽𝙔 𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃 🥷🇱🇰`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});


cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "settings the bot",
    category: "owner",
    react: "⚙",
    filename: __filename


},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        let desc = `* *𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒......⚙️*


*╭══════════════════════○*
*┣━ (01) 𝐖𝐎𝐑𝐊 𝐌𝐎𝐃𝐄....*
> *1.1  Public Work__🫂*
> *1.2  Private Work__❗*
> *1.3  Group Only__👥*
> *1.4  Inbox Only__👤*
*╭══════════════════════○*
*┣━ (02) 𝐀𝐔𝐓𝐎 𝐕𝐎𝐈𝐂𝐄.....*
> *2.1 Auto Voice __true 🗝️*
> *2.2 Auto Voice_ false 🔐*
*╭══════════════════════○*
*┣━ (03) 𝐀𝐔𝐓𝐎 𝐒𝐓𝐀𝐓𝐔𝐒 𝐒𝐄𝐄𝐍.....*
> *3.1 Auto Read Status __true 🗝️*
> *3.2 Auto Read Status_ false 🔐*
*╭══════════════════════○*
*┣━ (04) 𝐀𝐔𝐓𝐎 𝐒𝐓𝐈𝐂𝐊𝐄𝐑....*
> *4.1 Auto sticker __true 🗝️*
> *4.2 Auto sticker_ false 🔐*
*╭══════════════════════○*
*┣━ (05) 𝐀𝐔𝐓𝐎 𝐑𝐄𝐏𝐋𝐘.....*
> *5.1 Auto reply __true 🗝️*
> *5.2 Auto reply_ false 🔐*
*╭══════════════════════○*
*┣━ (06) 𝐁𝐎𝐓 𝐎𝐍𝐋𝐈𝐍𝐄 / 𝐎𝐅𝐅𝐋𝐈𝐍𝐄....*
> *6.1 Online __true 🗝️*
> *6.2 Online_ false 🔐*
*╭══════════════════════○*
*┣━ (07) 𝐌𝐒𝐆 𝐑𝐄𝐀𝐃....*
> *7.1 Read Msg __true 🗝️*
> *7.2 Read Msg_ false 🔐*
*╭══════════════════════○*
*┣━  (08) 𝐌𝐒𝐆 𝐑𝐄𝐒𝐂𝐓....*
> *8.1 Auto React __true 🗝️*
> *8.2 Auto React _ false 🔐*
*╭══════════════════════○*
*┣━ (09) 𝐀𝐍𝐓𝐈 𝐋𝐈𝐍𝐊.....*
> *9.1 Anti Link__true 🗝️*
> *9.2 Anti Link _ false 🔐*
> *9.3 Anti Link + Remove ⛔*
*╭══════════════════════○*
*┣━ (10) 𝐀𝐔𝐓𝐎 𝐒𝐓𝐀𝐓𝐔𝐒 𝐑𝐄𝐀𝐂𝐓 & 𝐑𝐄𝐏𝐋𝐘.....*
> *10. 1 Status React__true 🗝️*
> *10. 2 Status React _ false 🔐*
> *10. 3 Status Reply__true 🗝️*
> *10. 4 Status Reply _ false 🔐*
*╭══════════════════════○*
*┣━ (11) 𝐀𝐈 𝐌𝐎𝐃𝐄.....*
> *11.1 Auto Ai __true 🗝️*
> *11.2 Auto Ai _ false 🔐*

╭══════════════════════○
𝐀ᴜᴛᴏ 𝐒ᴛᴀᴛᴜꜱ 𝐑ᴘʟ එක වෙනස් කරන්න මෙහෙම කරන්න.....👇
 
.update 𝐀ᴜᴛᴏ_𝐒ᴛᴀᴛᴜꜱ_𝐌ꜱɢ: ඔයාට ඕන 𝐌ᴀɢ එක දාන්න......¿
╰══════════════════════○


🔢 𝐑ᴇᴘʟʏ 𝐁ᴇʟᴏᴡ 𝐓ʜɪꜱ 𝐍ᴜᴍʙᴇʀ 𝐂ʜᴀɴɢᴇ 𝐓ᴏ 𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃 𝐁𝐎𝐓 𝐂𝐇𝐀𝐍𝐆𝐄 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒.....🍃❍

> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃......🥷🇱🇰`;

        const vv = await conn.sendMessage(from, { image: { url: "https://files.catbox.moe/tmc315.jpg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".update MODE:public" );
                        break;
                    case '1.2':               
                        reply(".update MODE:private");
                        break;
                    case '1.3':               
                          reply(".update MODE:group");
                      break;
                    case '1.4':     
                        reply(".update MODE:inbox");
                      break;
                    case '2.1':     
                        reply(".update AUTO_VOICE:true");
                        break;
                    case '2.2':     
                        reply(".update AUTO_VOICE:false");
                    break;
                    case '3.1':    
                        reply(".update AUTO_READ_STATUS:true");
                    break;
                    case '3.2':    
                        reply(".update AUTO_READ_STATUS:false");
                    break;                    
                    case '4.1':    
                        reply(".update AUTO_STICKER:true");
                    break;
                    case '4.2':    
                        reply(".update AUTO_STICKER:false");
                    break;                                        
                    case '5.1':    
                        reply(".update AUTO_REPLY:true");
                    break;
                    case '5.2':    
                        reply(".update AUTO_REPLY:false");
                    break;                        
                    case '6.1':    
                        reply(".update ALLWAYS_OFFLINE:true");
                    break; 
                    case '6.2':    
                        reply(".update ALLWAYS_OFFLINE:false");
                    break;                       
                    case '7.1':    
                        reply(".update READ_MESSAGE:true");
                    break;
                    case '7.2':    
                        reply(".update READ_MESSAGE:false");
                    break;
                    case '8.1':    
                        reply(".update AUTO_REACT:true");
                    break;
                    case '8.2':    
                        reply(".update AUTO_REACT:false");
                    break;
                    case '9.1':    
                        reply(".update ANTI_LINK:true");
                    break;
                    case '9.2':   
                        reply(".update ANTI_LINK:false");
                    break;
                    case '9.3':    
                        reply(".update ANTI_LINK:false");
                    break;
                    case '10.1':
                        reply(".update AUTO_REACT_STATUS:true");
                    break;
                    case '10.2':
                        reply(".update AUTO_REACT_STATUS:fales");
                    break;
                    case '10.3':
                        reply(".update AUTO_STATUS_REPLY:true");
                    break;
                    case '10.4':
                        reply(".update AUTO_STATUS_REPLY:fales");
                    break;
                    case '11.1':
                        reply(".update AUTO_AI: true");
                    break;
                     case '11.2':
                        reply(".update AUTO_AI: fales");
                    break;

                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
