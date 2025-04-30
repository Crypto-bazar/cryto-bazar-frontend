import { Share2, Copy, Twitter, Send } from 'lucide-react';
import { FC } from 'react';
import { Button } from 'shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'shared/ui/popover/popover';

const SharePopover: FC = () => {
  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
  };

  const openShare = (platform: 'twitter' | 'telegram') => {
    const encoded = encodeURIComponent(currentUrl);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encoded}`,
      telegram: `https://t.me/share/url?url=${encoded}`,
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='transition-transform duration-150 active:scale-95'>
          <Share2 className='mr-2 h-4 w-4' />
          Поделиться
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-52 space-y-2'>
        <Button
          variant='ghost'
          className='w-full justify-start transition-transform duration-150 active:scale-95'
          onClick={copyToClipboard}
        >
          <Copy className='mr-2 h-4 w-4' /> Скопировать
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start transition-transform duration-150 active:scale-95'
          onClick={() => openShare('twitter')}
        >
          <Twitter className='mr-2 h-4 w-4' /> X
        </Button>
        <Button
          variant='ghost'
          className='w-full justify-start transition-transform duration-150 active:scale-95'
          onClick={() => openShare('telegram')}
        >
          <Send className='mr-2 h-4 w-4' /> Telegram
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export { SharePopover };
