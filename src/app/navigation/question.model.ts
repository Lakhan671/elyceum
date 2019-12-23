import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class QuestionNavigationModel implements FuseNavigationModelInterface {
    public model: any[];

    constructor() {
        this.model = [
            {
                id      : 'HOME',
                title   : '',
                translate: 'NAV.HOME',
                url: '/subject/Detail/Unit/assignment',
                icon: 'keyboard_backspace',
                type    : 'item',
                children: [
                ]
            },  {
                id      : 'Calendar Type',
                title   : 'Assignment Question',
                translate: 'NAV.HOME',

                url: '/subject/Detail/Unit/assignment/question',
                icon: 'view_compact',
                type    : 'item',
                children: [
                ]
            } ,  {
                id      : 'Calendar Type',
                title   : 'Assignment Attachment',
                translate: 'NAV.HOME',

                url: '/subject/Detail/Unit/assignment/question/attachment',
                icon: 'view_compact',
                type: 'item',
                children: [
                ]
            }
        ];
    }
}
