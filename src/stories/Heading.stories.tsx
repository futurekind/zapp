import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Heading from 'components/typography/Heading';

const Seperator = () => (
    <React.Fragment>
        <br />
        <br />
        <hr />
        <br />
        <br />
    </React.Fragment>
);

storiesOf('Typography / Heading', module)
    .add('default', () => <Heading>Lorem Ipsum Dolor Sit</Heading>)
    .add('with size', () => {
        return (
            <div>
                <Heading size={1}>Lorem Ipsum Dolor Sit</Heading>
                <Seperator />
                <Heading size={2}>Lorem Ipsum Dolor Sit</Heading>
            </div>
        );
    })
    .add('with color', () => {
        return (
            <div>
                <Heading textColor={'green'}>Lorem Ipsum Dolor Sit</Heading>
                <Heading textColor={'hotpink'}>Lorem Ipsum Dolor Sit</Heading>
            </div>
        );
    })
    .add('render as', () => {
        return (
            <div>
                <Heading as="h1">Lorem Ipsum Dolor Sit</Heading>
                <Seperator />
                <Heading as="h2">Lorem Ipsum Dolor Sit</Heading>
                <Seperator />
                <Heading as="h3">Lorem Ipsum Dolor Sit</Heading>
                <Seperator />
                <Heading as="h4">Lorem Ipsum Dolor Sit</Heading>
                <Seperator />
                <Heading as="h5">Lorem Ipsum Dolor Sit</Heading>
                <Seperator />
                <Heading as="h6">Lorem Ipsum Dolor Sit</Heading>
                <Seperator />
                <Heading as="span">Lorem Ipsum Dolor Sit</Heading>
                <Seperator />
                <Heading as="div">Lorem Ipsum Dolor Sit</Heading>
            </div>
        );
    });
