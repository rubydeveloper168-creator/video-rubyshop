import { Button, ButtonProps } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Props extends ButtonProps {
  message?: string;
}

const ButtonNoEmail = ({ message = 'Email sending disabled in this environment.', onClick, ...props }: Props) => {
  const { toast } = useToast();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast({ title: 'Email unavailable', description: message });
    onClick?.(event);
  };

  return <Button {...props} onClick={handleClick} />;
};

export default ButtonNoEmail;
