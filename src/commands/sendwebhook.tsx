import { sendReply } from "enmity/api/clyde";
import { REST } from "enmity/modules/common";
import { Command, ApplicationCommandOptionType, ApplicationCommandType, ApplicationCommandInputType } from "enmity/api/commands";

// todo: give this a better name.
const sendwebhook: Command = {
    id: "sendwebhook",
    name: "sendwebhook",
    displayName: "sendwebhook",

    description: "Sends a message to a specified webhook.",
    displayDescription: "Sends a message to a specified webhook.",

    type: ApplicationCommandType.Chat,
    inputType: ApplicationCommandInputType.BuiltInText,

    options: [{
        name: "webhookurl",
        displayName: "url",
        description: "Input the url of the webhook you are trying to send a message to.",
        displayDescription: "Input the url of the webhook you are trying to send a message to.",
        type: ApplicationCommandOptionType.String,
        required: true
    }],

    execute: async function (args, message) {
        const webhookUrl = args[args.findIndex(i => i.name === "webhookurl")].value;

        try {
            const res = await REST.delete(webhookUrl);
            console.log("[WebhookManager] Webhook deletion response: " + JSON.stringify(res));
            if (res.ok == true) {
                return sendReply(message?.channel.id ?? "0", "Webhook deleted successfully.");
            }
            else {
                console.log("[WebhookManager] Webhook deletion failed, output: " + res.status);
                return sendReply(message?.channel.id ?? "0", "There was an error deleting the webhook. Check the console for more info.");
            }
        }
        catch
        {
            console.log("[WebhookManager] Webhook deletion failed.");
            return sendReply(message?.channel.id ?? "0", "There was an error deleting the webhook.");
        }
    }
}
export { sendwebhook }