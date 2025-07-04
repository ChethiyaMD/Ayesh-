const l = console.log
const config = require('../settings')
const { cmd, commands } = require('../lib/command')
cmd({
    pattern: "alive",
    alias: "bot",
    react: "🍂",
    desc: "Check if Gojo bot is online.",
    category: "main",
    filename: __filename
}, async (gojo, mek, m, {
    from, reply
}) => {
    try {
        // Send image + caption
        await gojo.sendMessage(from, {
            image: { url: "https://files.catbox.moe/gvgncw.jpg" },
            caption: `🍃 𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃 𝐀𝐋𝐈𝐕𝐄 🍃\n\nSystem Status: ONLINE ✅\nBot Power Level: ∞\n\nCreated & 𝐀𝐒𝐇𝐈𝐘𝐀-𝐌𝐃\n\nType .menu to explore commands!`
        }, { quoted: mek });

        // Send voice message (PTT style)
        await gojo.sendMessage(from, {
            audio: {
                url: "https://files.catbox.moe/kllut3.mp3"
            },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("Error in .alive command:\n" + e);
    }
});
