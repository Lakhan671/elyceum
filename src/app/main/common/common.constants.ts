import { NotifierOptions } from 'angular-notifier';
export class CommonConstants {
    public static DELETE_POST: string = 'are you sure to delete your post?'
    public static HIDE_POST: string = 'are you sure to hide your post?'
    public static DELETE_POST_HEADER_MSG: string = 'Delete Post';
    public static HIDE_POST_HEADER_MSG: string = 'Hide Post';
    public static DELETE: string = 'delete';
    public static HIDE: string = 'hide';
    //notification
    public static  DEFAULT:string='default';
    public static  INFO:string='info';
    public static  SUCCESS:string='success';
    public static  WARNING:string='warning';
    public static  ERROR:string='error';
    //date format
    public static YYY_MM_DD_HH_MM_SS='yyyy-MM-dd HH:MM:SS';
    public static customNotifierOptions: NotifierOptions = {
        position: {
            horizontal: {
                position: 'right',
                distance: 12
            },
            vertical: {
                position: 'bottom',
                distance: 12,
                gap: 10
            }
        },
        theme: 'material',
        behaviour: {
            autoHide: 5000,
            onClick: 'hide',
            onMouseover: 'pauseAutoHide',
            showDismissButton: true,
            stacking: 5
        },
        animations: {
            enabled: true,
            show: {
                preset: 'slide',
                speed: 300,
                easing: 'ease'
            },
            hide: {
                preset: 'fade',
                speed: 300,
                easing: 'ease',
                offset: 50
            },
            shift: {
                speed: 300,
                easing: 'ease'
            },
            overlap: 150
        }
    };

   

}