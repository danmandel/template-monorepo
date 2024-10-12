import Image from 'next/image';
import { useTheme } from 'next-themes';

export const ThemedImage = () => {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case 'light':
      src = '/light.png';
      break;
    case 'dark':
      src = '/dark.png';
      break;
    default:
      src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      break;
  }

  return <Image src={src} width={400} height={400} alt='logo' />;
};
