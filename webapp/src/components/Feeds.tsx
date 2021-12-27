import {
    EuiText,
    EuiSpacer,
    EuiButton,
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiForm,
} from '@elastic/eui';
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

    return (
        <>
            {feeds.length === 0 && (
                <EuiText size="s">Noch keine Feeds vorhanden</EuiText>
            )}
            <EuiSpacer />
            <EuiButton
                size="s"
                color="accent"
                onClick={() => setShowModal(true)}
            >
                Feed hinzufügen
            </EuiButton>

            {showModal && (
                <EuiModal onClose={() => setShowModal(false)}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>
                            <h3>Feed anlegen</h3>
                        </EuiModalHeaderTitle>
                    </EuiModalHeader>
                    <EuiModalBody>
                        <EuiForm component="form"></EuiForm>
                    </EuiModalBody>
                </EuiModal>
            )}
        </>
    );
};

export default Feeds;
