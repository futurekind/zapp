import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Wrapper from 'components/base/Wrapper';

const ExampleContent = () => (
    <div
        style={{
            backgroundColor: 'lightblue',
            padding: 50,
            textAlign: 'center',
        }}
    >
        Content
    </div>
);

storiesOf('Base / Wrapper', module)
    .add('default', () => (
        <Wrapper>
            <ExampleContent />
        </Wrapper>
    ))
    .add('addWhitespace', () => (
        <Wrapper addWhitespace>
            <ExampleContent />
        </Wrapper>
    ));
