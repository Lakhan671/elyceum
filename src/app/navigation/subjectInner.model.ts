import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class SubjectNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : '',
                'translate': 'NAV.HOME',
                'url':'/home',
                'icon':'keyboard_backspace',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Calendar Type',
                'title'   : 'Subject Detail',
                'translate': 'NAV.HOME',
                
                'url':'/subject',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Member',
                'title'   : 'Member',
                'translate': 'NAV.HOME',
                
                'url':'/subject',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            } ,  {
                'id'      : 'Calendar Type',
                'title'   : 'Unit',
                'translate': 'NAV.HOME',
                
                'url':'/subject',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Calendar Type',
                'title'   : 'Notes',
                'translate': 'NAV.HOME',
                
                'url':'/subject',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }
        ];
    }
}
