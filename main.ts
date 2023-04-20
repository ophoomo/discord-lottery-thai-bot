import { CommandControl, NewCommand } from "./command.ts";
import { Intents, createBot, startBot } from "./mod.ts";

const bot = createBot({
  token: Deno.env.get("DISCORD_TOKEN") || "",
  intents: Intents.MessageContent | Intents.GuildMessages,
});

bot.events.ready = (_bot) => {
      NewCommand(_bot);
      console.log("Successfully connected to gateway");
}

bot.events.interactionCreate = async (_bot, _inte) => {
  if (_inte.data) {
    await CommandControl(_bot, _inte);
  }
}

await startBot(bot);
