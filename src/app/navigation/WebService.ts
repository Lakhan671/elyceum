 export class WebserModel  
{
    public Sevice: any;

    constructor()
    {
        this.Sevice =  
            { 
                BASE_URL: '/elyceum/',
                CREATE_USER: 'user/signup',
                USER_LOGIN: 'user/login',
                ADD_USER : 'user/add',
                GET_USER: 'user/get',
                GET_USER_TYPE: 'user/get/user/type',
                GET_CHAT_DATA: 'chat/msg/get',
                GET_COLLEGE_DETAIL: 'college/get',
                TOKKEN_KEY : 'token',
                GET_COLLEGE_UPDATE: 'college/update',
                DEP_LIST_GET: 'dep/list/get',
                DEP_CERATE: 'dep/save',
                DEP_GET: 'dep/get',
                DEP_UPDATE: 'dep/update',
                COURSE_GET: 'depc/gets',
                COURSE_SAVE: 'depc/save',
                COURSE_UPDATE: 'depc/update',
                COURSE_DETAIL: 'depc/get',
                BRANCH_LIST: 'branch/gets',
                BRANCH_CREATE: 'branch/save',
                BRANCH_UPDATE: 'branch/update',
                BRANCH_DETAIL: 'branch/get',
                ROOM_TYPE_SAVE : 'room/roomtype/save',
                ROOM_TYPE_UPDATE:'room/roomtype/update',
                ROOM_TYPE_GETS:'room/roomtype/gets',
                SESSiON_SAVE : 'student/session/save',
                SESSiON_UPDATE:'student/session/update',
                SESSiON_GETS:'student/session/gets',
                SEMISTER_SAVE:'branch/semester/save',
                SEMISTER_GETS:'branch/semester/gets',
                SEMISTER_UPDATE:'branch/semester/update',
                ROOM_SAVE :'room/save',
                ROOM_GETS :'room/gets',
                ROOM_UPDATE:'room/update',
                SECTION_SAVE:'branch/section/save',
                SECTION_ADD_STUDENT:'student/section/add',
                SECTION_GET_STUDENT:'student/section/student/get',
                SECTION_UPDATE:'branch/section/update',
                SECTION_GETS:'branch/section/gets',
                SECTION_GET:'branch/section/get',
                STUDENT_GETS:'student/gets',
                STUDENT_SAVE:'student/save',
                PERMOTION_TYPE_SAVE:'student/permotion/type/save',
                PERMOTION_TYPE_GETS:'student/permotion/type/get',
                PERMOTION_TYPE_UPDATE:'student/permotion/type/update',
                PERMOTION_SAVE:'student/permotion/save',
                PERMOTION_UPDATE:'student/permotion/update',
                CALENDER_TYPE:'calender/type/save',
                CALENDAR_TYPE_GETS:'calender/type/gets',
                CALENDER_TYPE_UPDATE:'calender/type/update',
                CALENDER:'calender/save',
                CALENDAR_GETS:'calender/get',
                CALENDER_UPDATE:'calender/update',
                TEACHER_SAVE:'teacher/save',
                TEACHER_UPDATE:'teacher/update',
                TEACHER_GETS:'teacher/gets',
                CATEGORY_SAVE:'subject/category/create',
                CATEGORY_GETS:'subject/category/get',
                NEWS_SAVE:'news/save',
                NEWS_UPDATE:'news/update',
                LIKE_NEWS:'news/like',
                NEWS_CMNT:'news/comnt',
                NEWS_GETS:'news/get',
                SUBJECT_SAVE:'subject/subject/create',
                SUBJECT_UPDATE:'subject/subject/update',
                SUBJECT_GETS:'subject/subject/get',
                SUBJECT_NOTES_SAVE:'subject/notes/create',
                SUBJECT_NOTES_GET:'subject/notes/get',
                SUBJECT_NOTES_DELETES:'subject/notes/delete',
                SUBJECT_NOTES_UPDATE:'subject/notes/create',
                ADD_SUBJECT_TO_SECTION:'subject//section/add',
                GET_SUBJECT_TEACHER:'subject/members/get',

                UNIT_GET:'subject/unit/get',
                LESSON_CREATE:'subject/lession/create',
                LESSON_GET:'subject/lession/list/get',
                LESSION_STATUS_POST:'subject/lession/status/post',
                LESSION_DETAIL_GET:'subject/lession/details/get',

                
                USER_SERACH:'user/search/user',
                CHAT_FRIEND_LIST:'chat/get/friend/list',
                CHAT_SEND_FRIEND_REQUEST:'chat/send/friend/request',
                CHAT_APPROVED_REQUEST:'chat/approved/friend/request',
                CHAT_UNAPPROVED_LIST:'chat/unapproved/friend/request',
                CHAT_MSG_GET:'chat/msg/get',
                CHAT_MSG_SEND:'chat/msg/send',
                GROUP_CREATE:'group/create',
                GROUP_GET:'group/get',
                GROUP_UPDATE:'group/update',
                GROUP_MEMBER_GET:'group/get/member',
                GROUP_MEMBER_DELETE:'group/delete/member',
                GROUP_MEMBER_ADD:'group/add/member',
                GROUP_MSG_POST:'group/msg/post',
                GROUP_MSG_SHARE:'group/msg/share',
                GROUP_MSG_GET:'group/msg/get',
                GROUP_REPLY_SEND:'group/post/comment/reply/send',
                GROUP_REPLY_GET:'group/reply/get',
                GROUP_POST_ADD_LIKE:'group/add/post/like',
                GROUP_UPDATE_POST_LIKE:'group/update/post/like',
                GROUP_GET_POST_LIKE:'group/get/post/like',
                GROUP_ADD_POST_COMMENT_LIKE:'group/add/post/comment/like',
                GROUP_UPDATE_POST_COMMENT_LIKE:'group/update/post/comment/like',
                GROUP_GET_POST_COMMENT_LIKE:'group/get/post/comment/like',
                GROUP_GET_POST_COMMENT_SEND:'group/post/comment/send',
                GROUP_GET_POST_COMMENT_GET:'group/post/comment/get',
                GROUP_GET_POST_COMMENT_UPDATE: 'group/post/comment/update',
                POST_SEND:'post/msg/send',
                POST_GET:'post/msg/get',
                POST_SHARE:'post/msg/share',
                POST_LIKE:'post//likeUnlike',
                POST_HIDE_DELETE:'post/msg/deleteHide',
                POST_UPDATE:'',
                POST_CMT_SEND :'post/cmnt/send',
                POST_CMT_GET :'post/cmnt/get',
                POST_CMT_UPDATE :'post/cmnt/update',
                POST_CMT_REPLY_SEND:'post/cmnt/reply/send',
                POST_CMT_REPLY_GET:'post/cmnt/reply/get',
                POST_CMT_REPLY_UPDATE:'post/cmnt/reply/update',
                DAY_LIST:'lectureRoutine/get/days',
                LECTURE_ROUTINE_SAVE:'lectureRoutine/add',
                LECTURE_ROUTINE_UPDATE:'lectureRoutine/update',
                LECTURE_ROUTINE_GET_:'lectureRoutine/get',
                STUDENT_ATTENDENCE_SAVE:'student/attendence/save',
                STUDENT_ATTENDENCE_GET : 'student/attendence/get',
                FEE_TYPE_SAVE : 'fee//type/add',
                FEE_TYPE_GET : 'fee/type/gets',
                FEE_TYPE_UPDATE : 'fee//type/update',
                FEE_SAVE : 'fee/add',
                FEE_GET : 'fee/get',
                FEE_UPDATE : 'fee/update',
                ASSIGNMENT_ADD : 'assignment/add',
                ASSIGNMENT_UPDATE : 'assignment/update',
                ASSIGNMENT_GET : 'assignment/get',
                ASSIGNMENT_QUESTION_ADD : 'assignment/question/add',
                ASSIGNMENT_QUESTION_GET : 'assignment/question/get',
                ASSIGNMENT_QUESTION_UPDATE : 'assignment/question/update',
                ASSIGNMENT_QUESTION_STAR_ADD : 'assignment/star/submit',
                ASSIGNMENT_QUESTION_STAR_UPDATE: 'assignment/update/star',
                ASSIGNMENT_QUESTION_STAR_GET: 'assignment/star/get',
                STUDENT_PERMOTION_TYPE_GET :'student/permotion/type/get',
                STUDENT_PERMOTION_TYPE_SAVE :'student/permotion/type/save',
                STUDENT_PERMOTION_TYPE_UPDATE :'student/permotion/type/update',

                STUDENT_PERMOTIO_GET :'student/permotion/get',
                STUDENT_PERMOTION_SAVE :'student/permotion/save',
                STUDENT_PERMOTION_UPDATE :'student/permotion/update',
                DASHBOARD_COURSE_DEPT_COUNT_GET :'dashBoard/cd/get',
                DASHBOARD_STUDENT_COUNT_GET :'dashBoard/ns/get',
                LEAVE_GET:'leave/get',
                LEAVE_ADD:'leave/add',
                LEAVE_UPDATE:'leave/update',
                LEAVE_APPROVE:'leave/approve',
                STUDENT_LEAVE_WEEKLY:'dashBoard/student/present',
                WEB_API : 'https://api.darksky.net/forecast/93c441cc4fd3941e49eef5b982f53827/',
                //leaves
                GET_LEAVE_TYPE:'',
                UPDATE_LEAVE_TYPE:'',
                ADD_LEAVE_TYPE:'',
            }
        }
    }