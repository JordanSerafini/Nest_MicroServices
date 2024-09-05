interface BadgesProps {
    title: string;
    color: string;
    css?: string;
    }

    function Badges({ title, color, css }: BadgesProps) {
      return (
        <span className={`text-center inline-block text-xs py-1 w-full rounded-full text-white ${color} ${css}`}>
          {title}
        </span>
      );
    }

export default Badges