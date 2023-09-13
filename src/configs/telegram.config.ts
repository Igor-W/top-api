import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = async (
  configService: ConfigService,
): Promise<ITelegramOptions> => {
  console.log(configService.get('BOT_TOKEN'));
  const token = configService.get('BOT_TOKEN');
  if (!token) throw new Error('Telegram token is not defined');
  return {
    chatId: configService.get('CHAT_ID') ?? '',
    token,
  };
};
