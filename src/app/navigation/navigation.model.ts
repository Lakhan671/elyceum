import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : 'Home',
                'translate': 'NAV.HOME',
                'url':'/home',
                'icon':'home',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Dashboard',
                'title'   : 'Dashboard',
                'translate': 'NAV.HOME',
                
                'url':'/dashboard',
                'icon':'dashboard',
                'type'    : 'item',
                'children': [ 
                ]
            } , {
                'id'      : 'group',
                'title'   : 'Groups',
                'translate': 'NAV.group',
                
                'url':'/group',
                'icon':'group_work',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Event',
                'title'   : 'Subject',
                'translate': 'NAV.Event',
                
                'url':'/subject',
                'icon':'event',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'student',
                'title'   : 'Student',
                'translate': 'NAV.student',
                
                'url':'/student',
                'icon':'account_box',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'news',
                'title'   : 'News',
                'translate': 'NAV.news',
                
                'url':'/news',
                'icon':'assignment',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Calendar',
                'title'   : 'Calendar',
                'translate': 'NAV.Calendar',
                
                'url':'/calendar',
                'icon':'date_range',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Academics',
                'title'   : 'Academics',
                'translate': 'NAV.Academics',
                
                'url':'/Academics',
                'icon':'subtitles',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'collabration',
                'title'   : 'Collabration',
                'translate': 'NAV.collabration',
                
                'url':'/collabration',
                'icon':'event_available',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Setting',
                'title'   : 'Setting',
                'translate': 'NAV.Setting',
                
                'url':'/setting',
                'icon':'settings',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Report',
                'title'   : 'Report', 
                'translate': 'NAV.Report',
                
                'url':'/dash',
                'icon':'reports',
                'type'    : 'item',
                'children': [ 
                ]
            }
        ];
    }
}
