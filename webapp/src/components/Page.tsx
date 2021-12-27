import { FC } from 'react';
import {
    EuiHeader,
    EuiHeaderSection,
    EuiHeaderSectionItem,
    EuiHeaderSectionItemButton,
    EuiAvatar,
    EuiPageTemplate,
    EuiHeaderLogo,
} from '@elastic/eui';
import { MeQuery } from 'generated/graphql';
import Feeds from './Feeds';

const Page: FC<{ me: MeQuery['me']; pageTitle?: string }> = ({
    me,
    pageTitle,
    children,
}) => {
    return (
        <>
            <EuiHeader position="fixed">
                <EuiHeaderSection>
                    <EuiHeaderSectionItem>
                        <EuiHeaderLogo>Zapp</EuiHeaderLogo>
                    </EuiHeaderSectionItem>
                </EuiHeaderSection>
                <EuiHeaderSection>
                    <EuiHeaderSectionItem>
                        <EuiHeaderSectionItemButton>
                            <EuiAvatar
                                name={`${me.firstname} ${me.lastname}`}
                            />
                        </EuiHeaderSectionItemButton>
                    </EuiHeaderSectionItem>
                </EuiHeaderSection>
            </EuiHeader>

            <EuiPageTemplate
                template="centeredContent"
                pageContentProps={{ paddingSize: 'none' }}
                pageHeader={
                    pageTitle
                        ? {
                              pageTitle: <h1>{pageTitle}</h1>,
                          }
                        : undefined
                }
                pageSideBar={<Feeds feeds={me.feed} />}
            >
                {children}
            </EuiPageTemplate>
        </>
    );
};

export default Page;
