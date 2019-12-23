import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class GroupNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : '',
                'translate': 'NAV.HOME',
                'url':'/group',
                'icon':'keyboard_backspace',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Calendar Type',
                'title'   : 'Group Member',
                'translate': 'NAV.HOME',
                
                'url':'/group/member',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Time table',
                'title'   : 'Group Post',
                'translate': 'NAV.time',
                
                'url':'/group/Post',
                'icon':'history',
                'type'    : 'item',
                'children': [ 
                ]
            }    
        ];
    }
}
