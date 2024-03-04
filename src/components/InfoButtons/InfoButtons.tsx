import React from 'react';
import block from 'bem-cn-lite';
import {Button, Icon} from '@gravity-ui/uikit';
import {CopyTransparent, ListUl} from '@gravity-ui/icons';

import './InfoButtons.scss';

const b = block('info-buttons');

export const InfoButtons: React.FC = () => {
    return (
        <div className={b()}>
            <div className={b('block')}>
                <div className={b('title')}>About Gravity UI</div>
                <div className={b('buttons')}>
                    <div className={b('button')}>
                        <Button
                            size="l"
                            view="outlined"
                            href="https://gravity-ui.com/components/uikit"
                            target="_blank"
                        >
                            <Icon data={CopyTransparent} />
                            Components
                        </Button>
                    </div>
                    <div className={b('button')}>
                        <Button size="l" href="https://gravity-ui.com/libraries" target="_blank">
                            <Icon data={ListUl} />
                            Libraries
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
