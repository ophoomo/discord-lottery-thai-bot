import { Bot } from "https://deno.land/x/discordeno@18.0.1/bot.ts";
import {
  ApplicationCommandOptionTypes,
  CreateApplicationCommand,
  Interaction,
  InteractionCallbackData,
  InteractionResponse,
  InteractionResponseTypes,
  sendInteractionResponse,
upsertGlobalApplicationCommands,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

const all_command: Array<CreateApplicationCommand> = [
  {
    name: "show",
    description: "แสดงผลลัพท์หวยงวดนี้",
  },
  {
    name: "check",
    description: "ตรวจหวย",
    options: [
      {
        name: "หมายเลข",
        description: "หมายเลขหวยที่จะตรวย",
        type: ApplicationCommandOptionTypes.Number,
        required: true,
        maxLength: 6,
        minLength: 6,
      },
    ],
  },
  {
    name: "source",
    description: "source code",
  },
];

export const NewCommand = (_bot: Bot) => {
  upsertGlobalApplicationCommands(_bot, all_command);
};

export const CommandControl = async (_bot: Bot, _inte: Interaction) => {
  switch (_inte.data?.name) {
    case "show":
      await command_show(_bot, _inte);
      break;
    case "check":
      await command_check(_bot, _inte);
      break;
    case "source":
      await command_source(_bot, _inte);
      break;
  }
};

const command_show = (_bot: Bot, _inte: Interaction) => {
  const option = {
    type: InteractionResponseTypes.ChannelMessageWithSource,
    data: {
      content: "hello",
    } as InteractionCallbackData,
  } as InteractionResponse;
  sendInteractionResponse(_bot, _inte.id, _inte.token, option);
};

const command_check = (_bot: Bot, _inte: Interaction) => {
  const data = _inte.data;
  if (data == undefined) return;
  if (data.options == undefined || data.options.length == 0) return;
  const lottery_number = data.options[0].value;
  const option = {
    type: InteractionResponseTypes.ChannelMessageWithSource,
    data: {
      content: lottery_number,
    } as InteractionCallbackData,
  } as InteractionResponse;
  sendInteractionResponse(_bot, _inte.id, _inte.token, option);
};

const command_source = (_bot: Bot, _inte: Interaction) => {
  const option = {
    type: InteractionResponseTypes.ChannelMessageWithSource,
    data: {
      content: "https://github.com/ophoomo/discord-lottery-thai-bot",
    } as InteractionCallbackData,
  } as InteractionResponse;
  sendInteractionResponse(_bot, _inte.id, _inte.token, option);
};
