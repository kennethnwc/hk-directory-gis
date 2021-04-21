import { Button, ButtonProps } from "@chakra-ui/react";
export const MyButton = ({ ...props }: ButtonProps) => (
  <Button fontSize="sm" {...props} />
);
