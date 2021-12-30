import { MeQuery } from 'generated/graphql';
import {
    CollectionOutline,
    LightningBolt,
    Menu,
    Plus,
    Search,
    StarOutline,
} from 'heroicons-react';
import React, { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Item: FC<{
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    icon?: React.ReactElement;
    isActive?: boolean;
    aside?: React.ReactElement;
}> = ({ onClick, children, icon, isActive, aside }) => (
    <li
        onClick={onClick}
        className={`cursor-pointer hover:text-slate-300 text-sm flex items-center gap-x-4 p-4 transition-colors ${
            isActive ? 'bg-slate-700' : ''
        }`}
    >
        {icon} <span className="grow">{children}</span>
        {aside}
    </li>
);

const Chip: FC = ({ children }) => (
    <span className="bg-slate-900 text-[10px] py-0 px-2 rounded-md shadow-black shadow-sm">
        {children}
    </span>
);

const Sidebar: FC<{ me: MeQuery['me'] }> = ({ me }) => {
    const { page } = useParams();
    const navigate = useNavigate();

    return (
        <aside className="h-screen w-80 flex fixed left-0 top-0">
            <div className="w-14 bg-slate-900 flex flex-col items-center py-4 gap-y-4">
                <LightningBolt className="text-purple-700 w-12 h-12" />
                <div className="grow" />

                <button className="hover:text-slate-300">
                    <Plus className="w-12 h-12" />
                </button>

                <button className="hover:text-slate-300">
                    <Search className="w-6 h-6" />
                </button>
            </div>

            <div className="grow py-4 bg-slate-800 h-full overflow-scroll">
                <div className="text-xl uppercase shadow-sm mb-12 mt-3 px-4">
                    Zappscription
                </div>
                <ul>
                    <Item
                        icon={<CollectionOutline className="w-4" />}
                        isActive={page === 'all'}
                        onClick={() => navigate('/all')}
                        aside={<Chip>{me._count.feed}</Chip>}
                    >
                        All Feeds
                    </Item>
                    <Item
                        icon={<StarOutline className="w-4" />}
                        isActive={page === 'starred'}
                        onClick={() => navigate('/starred')}
                        aside={<Chip>167</Chip>}
                    >
                        Starred Articles
                    </Item>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
