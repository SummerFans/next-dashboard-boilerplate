// HeroIcon.tsx
import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';
import { classNames } from '@/utils/common';


export const DynamicIcon = (props: DynamicIconProps): JSX.Element => {
    const { icon, className, type = 'outline' } = props;

    const { ...icons } = type === 'outline' ? OutlineIcons : SolidIcons;

    // @ts-ignore
    const Icon: JSX.Element = icons[icon];

    const c = classNames(className||'','h-6 w-6');

    return (
        // @ts-ignore
        <Icon className={c} />
    );
};