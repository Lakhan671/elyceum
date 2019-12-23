import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class SubjectDetailNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : '',
                'translate': 'NAV.HOME',
                'url':'/subject',
                'icon':'keyboard_backspace',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Calendar Type',
                'title'   : 'Subject Detail',
                'translate': 'NAV.HOME',
                
                'url':'/subject/Detail',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Calendar Type',
                'title'   : 'Notes',
                'translate': 'NAV.HOME',
                
                'url':'/subject/Detail/notes',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Calendar Type',
                'title'   : 'Teacher',
                'translate': 'NAV.HOME',
                
                'url':'/subject/Detail/Unit',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            } , {
                'id'      : 'Calendar Type',
                'title'   : 'Unit Lession',
                'translate': 'NAV.HOME',
                
                'url':'/subject/Detail/Unit/lession',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Calendar Type',
                'title'   : 'Unit Assignment',
                'translate': 'NAV.HOME',
                
                'url':'/subject/Detail/Unit/assignment',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }
        ];
    }
}
