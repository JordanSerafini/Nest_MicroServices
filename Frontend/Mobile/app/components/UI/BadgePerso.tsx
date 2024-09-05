import * as React from 'react';
import { Badge } from 'react-native-paper';

interface BadgePersoProps {
    size?: number;
    css?: string;
    text: string;
    }

const BadgePerso = ({size = 20, css = "", text="" }: BadgePersoProps) => (
  <Badge className={css} size={size}>{text}</Badge>
);

export default BadgePerso;