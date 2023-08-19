let video, img, gs, obInf, text = false;
const { start } = require("repl");
const comandText = require("./const")
const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
require("dotenv").config()
const bot = new Telegraf(process.env.BOT_TOKEN);
const idImg = process.env.ID;
const idVideo = process.env.ID_VIDEO;
const idGs = process.env.ID_GS;
const idTEXT = process.env.ID_TEXT;
const idglob = process.env.ID_GLOBAL;
bot.start(async (ctx) => {
    text = false;
    gs = false;
    obInf = false;
    video = false;
    img = false;
    await ctx.reply('Ку!Хотите отправить анонимно информацию про ХНУРЕ?тогда вам сюда)))) ');
    await ctx.replyWithHTML('<b>Что именно вы хотите отправить?</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Изображение', "but_1"), Markup.button.callback('Видео', "but_2"), Markup.button.callback('Текст', "but_3")],
            [Markup.button.callback('Голосовое сообщение', "but_4")],
            [Markup.button.callback('Несколько видов информации', "but_5")]
        ]
    ))
});
// bot.help((ctx) => ctx.reply(comandText.keycomand));
bot.help((ctx) => ctx.reply('Привет!Этот бот был создан для анонимной передачи информации о ХНУРЕ,запускай бот и делись своими историями))(/start)'));

bot.on('sticker', (ctx) => {
    ctx.reply('Отличный стикер,но это не настолько важная информация');
});
bot.on('text', (ctx) => {
    if (obInf === true) {
        const userMes = ctx.message.text;
        bot.telegram.sendMessage(idglob, userMes);
        ctx.reply('Ваше текстовое сообщение успешно отправлено');
    }
    else if (text === false) {
        ctx.reply('Ваше текстовок сообщение не отправлено,по-скольку вы не нажали на необходмую кнопку,перезапустите бот,что бы начать с начала (/start)');
    }
    else {
        const userMes = ctx.message.text;
        bot.telegram.sendMessage(idTEXT, userMes);
        ctx.reply('Ваше текстовое сообщение успешно отправлено');
    }
});
bot.on('photo', async (ctx) => {
    if (obInf === true) {
        const caption = ctx.message.caption;
        const fileId = ctx.message.photo[0].file_id;
        await bot.telegram.sendPhoto(idglob, fileId ,{caption});
        ctx.reply('Ваше изображение отправлено успешно.');
    }
    else if (img === false) {
        ctx.reply('Ваше изображение не отправлено,по-скольку вы не нажали на необходмую кнопку,перезапустите бот,что бы начать с начала (/start)');
    } else {
        const caption = ctx.message.caption;
        const fileId = ctx.message.photo[0].file_id;
        await bot.telegram.sendPhoto(idImg, fileId,{caption});
        ctx.reply('Ваше изображение отправлено успешно.');
    }
});
bot.on('video', async (ctx) => {
    if (obInf === true) {
        const caption = ctx.message.caption;
        const fileId = ctx.message.video.file_id;
        bot.telegram.sendVideo(idglob, fileId,{caption});
        ctx.reply('Ваше видео успешно отправлено');
    }
    else if (video === false) {
        ctx.reply('Ваше видео не отправлено,по-скольку вы не нажали на необходмую кнопку,перезапустите бот,что бы начать с начала (/start)');
    }
    else {
        const caption = ctx.message.caption;
        const fileId = ctx.message.video.file_id;
        bot.telegram.sendVideo(idVideo, fileId,{caption});
        ctx.reply('Ваше видео успешно отправлено');
    }
})
bot.on('voice', async (ctx) => {
    if (obInf === true) {
        const fileId = ctx.message.voice.file_id;
        await bot.telegram.sendVoice(idglob, fileId);
        ctx.reply('Ваше голосовое сообщение успешно отправлено');
    }
    else if (gs === false) {
        ctx.reply('Ваше голосовое сообщение не отправлено,по-скольку вы не нажали на необходмую кнопку,перезапустите бот,что бы начать с начала (/start)');
    }
    else {
        const fileId = ctx.message.voice.file_id;
        await bot.telegram.sendVoice(idGs, fileId);
        ctx.reply('Ваше голосовое сообщение успешно отправлено');
    }
});
bot.action('but_1', async (ctx) => {
    text =false;
    gs =false;
    video = false;
    obInf = false;
    try {
        await ctx.answerCbQuery();
        ctx.reply('Отправьте ваше изображение');
        img = true;
    } catch (e) {
        console.log(e)
    }
})
bot.action('but_3', async (ctx) => {
    gs =false;
    video = false;
    obInf = false;
    img = false;
    try {
        await ctx.answerCbQuery();
        ctx.reply('Отправьте ваше текстовое сообщение');
        text = true;
    } catch (e) {
        console.log(e)
    }
})
bot.action('but_2', async (ctx) => {
    text =false;
    gs =false;
    obInf = false;
    img = false;
    try {
        await ctx.answerCbQuery();
        video = true
        ctx.reply('Отправьте ваше видео');
    } catch (e) {
        console.log(e)
    }
})
bot.action('but_4', async (ctx) => {
    text =false;
    video = false;
    obInf = false;
    img = false;
    try {
        await ctx.answerCbQuery();
        gs = true
        ctx.reply('Отправьте ваше голосовое сообщение');
    } catch (e) {
        console.log(e)
    }
});
bot.action('but_5', async (ctx) => {
    text =false;
    gs =false;
    video = false;
    img = false;
    obInf = true
    try {
        await ctx.answerCbQuery();
        ctx.reply('Отправьте ваши соощения');
    } catch (e) {
        console.log(e)
    }
})
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));