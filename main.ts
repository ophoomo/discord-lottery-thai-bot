import "https://deno.land/x/dotenv/load.ts";
import {
  createBot,
  Intents,
  startBot,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { CommandControl, NewCommand } from "./command.ts";

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
