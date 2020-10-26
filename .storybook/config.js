import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import requireContext from 'require-context.macro';

addDecorator(withKnobs);
addDecorator(withA11y);

const req = requireContext('../src/components', true, /\.stories\.tsx$/);

configure(req, module);
