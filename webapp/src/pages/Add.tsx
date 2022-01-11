import { FC, useState } from 'react';
import { ProtectedPage, withProtection } from 'utils/withProtection';
import Page from 'components/Page';

const AddFeedPage: FC<ProtectedPage> = ({ me }) => {
    const [value, setValue] = useState('');
    return (
        <Page me={me}>
            <div className="bg-red-500 min-h-full">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                />
                <button disabled={value === ''}>Add Feed</button>
            </div>
        </Page>
    );
};

export default withProtection(AddFeedPage);
