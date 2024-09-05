interface IconProps {
  type: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; 
  className?: string;
  style?: React.CSSProperties;
  theme?: string;
  [x: string]: any;
}

const Icon: React.FC<IconProps> = ({
  type,
  theme,
  onClick,
  className = "",
  style,
  ...props
}) => {
  if (theme === undefined) theme = "black";

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      onClick={onClick}
      style={{ cursor: "pointer", color: `${theme}`, ...style }}
      {...props}
    >
      {type}
    </span>
  );
};

export default Icon;
