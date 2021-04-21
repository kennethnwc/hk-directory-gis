import { Text, TextProps } from "@chakra-ui/react";

export const ItemText: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text fontSize="sm" letterSpacing="wide" {...props}>
      {children}
    </Text>
  );
};
