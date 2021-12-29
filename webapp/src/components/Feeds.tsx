import { useFormik } from 'formik';
import { MeQuery, FeedCreateInput } from 'generated/graphql';
import { FC, useState } from 'react';

const Feeds: FC<{ feeds: MeQuery['me']['feed'] }> = ({ feeds }) => {
    const [showModal, setShowModal] = useState(false);

    const { values, errors, handleChange, handleSubmit } =
        useFormik<FeedCreateInput>({
            initialValues: {
                name: '',
                url: '',
            },
            onSubmit: console.log,
        });

    return <h1>Feeds</h1>;
};

export default Feeds;
