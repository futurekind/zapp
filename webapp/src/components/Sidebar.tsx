import { CollectionOutline, StarOutline } from 'heroicons-react';
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
    <span className="bg-slate-600 text-[10px] py-0 px-2 rounded-md shadow-black shadow-sm">
        {children}
    </span>
);

const Sidebar: FC<any> = () => {
    const { page } = useParams();
    const navigate = useNavigate();

    return (
        <aside className="hidden lg:block h-screen bg-slate-900 w-72 pt-[72px] overflow-scroll">
            <ul>
                <Item
                    icon={<CollectionOutline className="w-4" />}
                    isActive={page === 'all'}
                    onClick={() => navigate('/all')}
                    aside={<Chip>0</Chip>}
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
        </aside>
    );
};

export default Sidebar;
