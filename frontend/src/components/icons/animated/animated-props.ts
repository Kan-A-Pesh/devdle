export interface AnimatedIconProps {
    className?: string;
    startRef?: React.MutableRefObject<() => void>;
}

export type AnimatedIcon = (props: AnimatedIconProps) => JSX.Element;
