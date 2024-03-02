import { sendReply } from "enmity/api/clyde";
import { REST } from "enmity/modules/common";
import { Command, ApplicationCommandOptionType, ApplicationCommandType, ApplicationCommandInputType } from "enmity/api/commands";

const webhookinfo: Command = {
    id: "webhookinfo",
    name: "webhookinfo",
    displayName: "webhookinfo",

    description: "Gets information on who created the webhook and extra details.",
    displayDescription: "Gets information on who created the webhook and extra details.",

    type: ApplicationCommandType.Chat,
    inputType: ApplicationCommandInputType.BuiltInText,

    options: [{
        name: "webhookurl",
        displayName: "url",
        description: "Input the url of the webhook you are trying to retrieve info from.",
        displayDescription: "Input the url of the webhook you are trying to retrieve info from.",
        type: ApplicationCommandOptionType.String,
        required: true
    }],

    execute: async function (args, message) {
        const webhookUrl = args[args.findIndex(i => i.name === "webhookurl")].value;

        try {
            const res = await REST.get(webhookUrl);
            console.log("[WebhookManager] Webhook GET response: " + JSON.stringify(res));
            return sendReply(message?.channel.id ?? "0", `
            Information properly recieved. \n
            Original Webhook Name: ` + res.name + `\n
            Webhook ID: ` + res.id + `\n 
            Webhook Channel ID: ` + res.channel_id + `\n
            Webhook Guild ID:` + res.guild_id + `\n
            Original Webhook Image URL: https://cdn.discordapp.com/avatars/` + res.id + `/` + res.avatar + `.png` + `\n
            Webhook Type: ` + res.type + `\n
            Webhook Creator's User ID: Failed to fetch. \n`);
        }
        catch (error)
        {
            console.log("[WebhookManager] Webhook GET failed: " + error);
            return sendReply(message?.channel.id ?? "0", "There was an error getting information the webhook. Check the console for further information.");
        }
    }
}
export { webhookinfo }