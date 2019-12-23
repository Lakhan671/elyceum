import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class CalendarNavigationModel implements FuseNavigationModelInterface
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
                'title'   : 'calendar Type',
                'translate': 'NAV.HOME',
                
                'url':'/calendar/type',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Time table',
                'title'   : 'Calendar',
                'translate': 'NAV.time',
                
                'url':'/calendar/event',
                'icon':'history',
                'type'    : 'item',
                'children': [ 
                ]
            }    
        ];
    }
}
