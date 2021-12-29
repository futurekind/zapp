import { FC } from 'react';
import { Menu } from 'heroicons-react';

const PageHeader: FC<any> = () => {
    return (
        <header className="flex p-4 bg-slate-800 shadow-md fixed w-screen top-0 left-0 items-center justify-between">
            <div>
                <Menu className="cursor-pointer hover:text-slate-200 lg:hidden" />
            </div>
            <div className="text-center text-xl uppercase shadow-sm">
                Zappscription
            </div>
            <div>
                <span className="bg-lime-700 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    FT
                </span>
            </div>
        </header>
    );
};

export default PageHeader;
