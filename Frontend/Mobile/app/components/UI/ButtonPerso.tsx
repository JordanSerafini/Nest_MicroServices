import * as React from 'react';
import { Button } from 'react-native-paper';

interface ButtonPersoProps {
icon: string;
mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal" | undefined
css?: string;
text: string;
onPress?: () => void;
}

const ButtonPerso = ({ icon, mode, css, text, onPress }: ButtonPersoProps ) => (
  <Button className={css} icon={icon} mode={mode} onPress={onPress}>
    {text}
  </Button>
);

export default ButtonPerso;