import { FC } from 'react';
import { LightningBolt, Menu } from 'heroicons-react';

const getBgColor = (str: string) => {
    const colors = [
        'bg-yellow-700',
        'bg-green-700',
        'bg-teal-700',
        'bg-sky-700',
        'bg-purple-700',
        'bg-rose-700',
    ];
    const index =
        (str.charCodeAt(0) + (str.charCodeAt(1) || 0)) % colors.length;

    return colors[index];
};

const PageHeader: FC<{ avatarInitials?: string }> = ({ avatarInitials }) => {
    return (
        <header className="flex p-4 bg-slate-900 shadow-md fixed w-screen top-0 left-0 items-center justify-between">
            <div className="flex items-center gap-x-2">
                <Menu className="cursor-pointer hover:text-slate-200 lg:hidden" />
                <LightningBolt className="text-purple-700" />
                <div className="text-center text-xl uppercase shadow-sm">
                    Zappscription
                </div>
            </div>

            <div>
                {avatarInitials && (
                    <span
                        className={`${getBgColor(
                            avatarInitials
                        )} text-white rounded-full w-10 h-10 flex items-center justify-center`}
                    >
                        {avatarInitials}
                    </span>
                )}
            </div>
        </header>
    );
};

export default PageHeader;
